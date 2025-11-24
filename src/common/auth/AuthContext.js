import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { SESSION_KEY } from "@/lib/cartClient";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "";
const ACCESS_TOKEN_KEY = "kickclean-access-token";
const LOGOUT_FLAG_KEY = "kickclean-logout-flag";
const REFRESH_MARGIN_MS = 60_000; // refresh 1 minute before expiry
const MIN_REFRESH_DELAY_MS = 5_000;

const decodeJwtExp = (token) => {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    const json =
      typeof window === "undefined"
        ? Buffer.from(payload, "base64").toString("utf-8")
        : atob(payload);
    const parsed = JSON.parse(json);
    return parsed?.exp || null;
  } catch {
    return null;
  }
};

const noop = async () => ({ success: false });

const AuthContext = createContext({
  user: null,
  accessToken: null,
  loading: true,
  login: noop,
  register: noop,
  logout: async () => {},
  refreshAccess: async () => null,
  setUser: () => {},
  setAccessToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimerRef = useRef(null);

  const persistToken = useCallback((token) => {
    setAccessToken(token || null);
    if (typeof window === "undefined") return;
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.removeItem(LOGOUT_FLAG_KEY);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }, []);

  const clearSessionId = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(SESSION_KEY);
      document.cookie = "sessionId=; path=/; max-age=0";
    } catch {
      // ignore clear errors
    }
  }, []);

  const fetchMe = useCallback(
    async (token) => {
      if (!token) throw new Error("Token tidak ditemukan");
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Tidak dapat mengambil profil");
      }
      setUser(data.user);
      return data.user;
    },
    []
  );

  const refreshAccess = useCallback(async () => {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Gagal refresh token");
    }
    persistToken(data.accessToken);
    return data.accessToken;
  }, [persistToken]);

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  const scheduleRefresh = useCallback(
    (token) => {
      clearRefreshTimer();
      if (!token) return;

      const exp = decodeJwtExp(token);
      if (!exp) return;

      const now = Date.now();
      const msUntilExpiry = exp * 1000 - now;
      if (msUntilExpiry <= 0) {
        // Already expired, try to refresh immediately.
        refreshAccess()
          .then((newToken) => fetchMe(newToken))
          .catch(() => {
            persistToken(null);
            setUser(null);
          });
        return;
      }

      const delay = Math.max(MIN_REFRESH_DELAY_MS, msUntilExpiry - REFRESH_MARGIN_MS);
      refreshTimerRef.current = setTimeout(async () => {
        try {
          const newToken = await refreshAccess();
          await fetchMe(newToken);
        } catch (err) {
          if (process.env.NODE_ENV !== "production") {
            console.warn("Auto refresh failed", err);
          }
          persistToken(null);
          setUser(null);
        }
      }, delay);
    },
    [clearRefreshTimer, fetchMe, persistToken, refreshAccess]
  );

  useEffect(() => {
    let active = true;
    const bootstrap = async () => {
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const stored = localStorage.getItem(ACCESS_TOKEN_KEY);
      const loggedOut = localStorage.getItem(LOGOUT_FLAG_KEY);

      try {
        if (stored) {
          try {
            await fetchMe(stored);
            persistToken(stored);
            return;
          } catch (err) {
            // Stored token invalid, try refresh flow next
          }
        }

        if (loggedOut) {
          persistToken(null);
          setUser(null);
          return;
        }

        const newToken = await refreshAccess();
        await fetchMe(newToken);
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Auth init failed", error);
        }
        persistToken(null);
        setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    bootstrap();
    return () => {
      active = false;
    };
  }, [fetchMe, persistToken, refreshAccess]);

  useEffect(() => {
    scheduleRefresh(accessToken);
    return () => clearRefreshTimer();
  }, [accessToken, clearRefreshTimer, scheduleRefresh]);

  const login = useCallback(
    async (email, password) => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.message || "Gagal login");
        }
        persistToken(data.accessToken);
        setUser(data.user);
        return { success: true, user: data.user };
      } catch (error) {
        return {
          success: false,
          message: error.message || "Gagal login",
        };
      }
    },
    [persistToken]
  );

  const register = useCallback(
    async (payload) => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.message || "Gagal registrasi");
        }
        persistToken(data.accessToken);
        setUser(data.user);
        return { success: true, user: data.user };
      } catch (error) {
        return {
          success: false,
          message: error.message || "Gagal registrasi",
        };
      }
    },
    [persistToken]
  );

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Logout failed", error);
      }
    } finally {
      persistToken(null);
      setUser(null);
      clearSessionId();
      clearRefreshTimer();
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(LOGOUT_FLAG_KEY, "1");
        } catch {
          // ignore storage errors
        }
      }
    }
  }, [clearSessionId, persistToken]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      loading,
      login,
      register,
      logout,
      refreshAccess,
      setUser,
      setAccessToken: persistToken,
    }),
    [user, accessToken, loading, login, register, logout, refreshAccess, persistToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
