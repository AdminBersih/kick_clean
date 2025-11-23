import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "";
const ACCESS_TOKEN_KEY = "kickclean-access-token";

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

  const persistToken = useCallback((token) => {
    setAccessToken(token || null);
    if (typeof window === "undefined") return;
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
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

  useEffect(() => {
    let active = true;
    const bootstrap = async () => {
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const stored = localStorage.getItem(ACCESS_TOKEN_KEY);

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
    }
  }, [persistToken]);

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
