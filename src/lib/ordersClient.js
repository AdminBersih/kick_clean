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

export async function fetchUserOrders(token) {
    const res = await fetch(`${API_BASE}/api/orders/user`, {
        headers: {
            ...authHeader(token),
        },
        credentials: "include",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil orders");
    }
    return data.orders || [];
}

export async function trackOrder({ orderCode, phone, email, token }) {
    const params = new URLSearchParams();
    if (orderCode) params.append("orderCode", orderCode);
    if (phone) params.append("phone", phone);
    if (email) params.append("email", email);

    const res = await fetch(`${API_BASE}/api/orders/track?${params.toString()}`, {
        headers: {
            ...authHeader(token),
        },
        credentials: "include",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil detail order");
    }
    return data.order;
}

export async function getMidtransStatus({ orderCode, token }) {
    const res = await fetch(`${API_BASE}/api/orders/midtrans-status?orderCode=${encodeURIComponent(orderCode)}`, {
        headers: {
            ...authHeader(token),
        },
        credentials: "include",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil status pembayaran");
    }
    return data;
}

export async function getPaymentLink({ orderCode, token }) {
    const res = await fetch(`${API_BASE}/api/orders/payment-link?orderCode=${encodeURIComponent(orderCode)}`, {
        headers: {
            ...authHeader(token),
        },
        credentials: "include",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil link pembayaran");
    }
    return data;
}

export async function recreatePaymentLink({ orderCode, token }) {
    const res = await fetch(`${API_BASE}/api/orders/recreate-payment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(token),
        },
        credentials: "include",
        body: JSON.stringify({ orderCode }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Gagal membuat ulang link pembayaran");
    }
    return data;
}

export async function cancelMidtransPayment({ orderCode, token }) {
    const res = await fetch(`${API_BASE}/api/orders/midtrans-cancel`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(token),
        },
        credentials: "include",
        body: JSON.stringify({ orderCode: orderCode }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Gagal membatalkan pembayaran");
    }
    return data;
}
