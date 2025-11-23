const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/api/services`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Gagal mengambil daftar layanan");
  }
  return Array.isArray(data.services) ? data.services : [];
}

export async function fetchServiceDetail(id) {
  if (!id) throw new Error("ID layanan tidak ditemukan");
  const res = await fetch(`${API_BASE}/api/services/${id}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Gagal mengambil detail layanan");
  }
  return data.service;
}
