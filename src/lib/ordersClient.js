const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

const authHeader = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

/**
 * Create order on backend using current cart snapshot.
 * Uses sessionId for guest carts and Authorization header for logged-in users.
 */
export async function createOrder({ sessionId, customerName, phone, email, address, pickupMethod, notes, token }) {
    const body = {
        sessionId: token ? undefined : sessionId,
        customerName,
        phone,
        email,
        address,
        pickupMethod,
        notes,
    };

    const res = await fetch(`${API_BASE}/api/orders/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(token),
        },
        credentials: "include",
        body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Gagal membuat order");
    }

    return { data, sessionId };
}
