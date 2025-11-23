const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "";
const SESSION_KEY = "kickclean-session-id";

const isBrowser = typeof window !== "undefined";
const isObjectId = (value) => typeof value === "string" && /^[a-fA-F0-9]{24}$/.test(value);

export const getOrCreateSessionId = () => {
    if (!isBrowser) return null;
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
        sid = crypto.randomUUID().replace(/-/g, "");
        localStorage.setItem(SESSION_KEY, sid);
    }
    try {
        document.cookie = `sessionId=${sid}; path=/; max-age=${60 * 60 * 24 * 30}`;
    } catch (err) {
        // ignore cookie write errors
    }
    return sid;
};

const authHeader = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

export async function addToCart({ serviceId, quantity = 1, sessionId, token }) {
    if (!serviceId || !isObjectId(serviceId)) {
        throw new Error("serviceId tidak valid, pastikan memilih layanan dari server.");
    }
    const sid = sessionId || getOrCreateSessionId();
    // debug log for tracing cart add
    console.info("[cart] add", { serviceId, quantity, sid, authed: !!token });
    const res = await fetch(`${API_BASE}/api/cart/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(token),
        },
        credentials: "include",
        body: JSON.stringify({
            sessionId: token ? undefined : sid,
            service_id: serviceId,
            quantity: Math.max(1, Number(quantity) || 1),
        }),
    });
    const data = await res.json().catch(() => ({}));
    console.info("[cart] add response", { status: res.status, data });
    if (!res.ok) {
        throw new Error(data.message || "Gagal menambah ke keranjang");
    }
    return { cart: data.cart, sessionId: sid };
}

export async function fetchCart({ sessionId, token }) {
    const sid = token ? undefined : sessionId || getOrCreateSessionId();
    const query = token ? "" : sid ? `?sessionId=${sid}` : "";
    console.info("[cart] fetch", { sid, authed: !!token });
    const res = await fetch(`${API_BASE}/api/cart${query}`, {
        headers: {
            "Content-Type": "application/json",
            ...authHeader(token),
        },
        credentials: "include",
    });
    const data = await res.json().catch(() => ({}));
    console.info("[cart] fetch response", { status: res.status, data });
    if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil keranjang");
    }
    return { cart: data.cart || { items: [] }, sessionId: sid };
}

export async function clearCart({ sessionId, token }) {
    const sid = token ? undefined : sessionId || getOrCreateSessionId();
    const res = await fetch(`${API_BASE}/api/cart/clear`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(token),
        },
        credentials: "include",
        body: JSON.stringify({
            sessionId: token ? undefined : sid,
        }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && res.status !== 204) {
        throw new Error(data.message || "Gagal mengosongkan keranjang");
    }
    return true;
}
