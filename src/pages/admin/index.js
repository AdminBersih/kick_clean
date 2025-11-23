// src/pages/admin/index.js
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { ShoppingBag, MoreVertical, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data saat halaman dibuka
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = localStorage.getItem('adminToken'); // 1. Ambil Token
        if (!token) return; 

        const res = await fetch('/api/admin/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}` // 2. Kirim Token
            }
        });
        if (res.ok) {
          const jsonData = await res.json();
          setData(jsonData);
        }
      } catch (error) {
        console.error("Gagal ambil data dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  // Helper: Format Rupiah
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  
  // Helper: Format Tanggal
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  // Tampilan Loading
  if (loading) {
    return (
        <AdminLayout>
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin" size={40} color="#0F172A"/>
            </div>
        </AdminLayout>
    );
  }

  // Data aman (atau default 0 jika error/kosong)
  const stats = data?.stats || { revenue: 0, totalOrders: 0, activeOrders: 0, finishedOrders: 0, cancelledOrders: 0 };
  const recentOrders = data?.recentOrders || [];

  return (
    <AdminLayout>
      {/* Header & Breadcrumb */}
      <div className="page-header">
        <div className="page-title">
          <h1>Dashboard</h1>
          <div className="breadcrumb">Home &gt; Dashboard</div>
        </div>
        <div className="date-range">
           📅 {formatDate(new Date())}
        </div>
      </div>

      {/* 1. Stats Cards (Dinamis) */}
      <div className="stats-grid">
        <StatCard title="Total Revenue" value={formatRupiah(stats.revenue)} desc="Total Pemasukan" />
        <StatCard title="Total Orders" value={stats.totalOrders} desc="Semua Pesanan Masuk" />
        <StatCard title="Active Orders" value={stats.activeOrders} desc="Sedang Dalam Proses" />
        <StatCard title="Completed" value={stats.finishedOrders} desc="Pesanan Selesai" />
      </div>

      {/* 2. Graph Placeholder (Tetap Statis Dulu) */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
            <span style={{fontSize:'18px', color:'#1f2937'}}>Sale Graph</span>
            <div style={{display:'flex', gap:'8px'}}>
                <button className="admin-btn" style={{padding:'4px 12px'}}>WEEKLY</button>
            </div>
        </div>
        <div style={{height: '250px', background: '#F9FAFB', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#9CA3AF'}}>
            [ Grafik Penjualan Placeholder ]
        </div>
      </div>

      {/* 3. Recent Orders Table (Dinamis) */}
      <h3 className="section-title">Recent Orders</h3>
      <div className="table-wrapper">
        <table className="custom-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product / Service</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {recentOrders.length === 0 ? (
                    <tr><td colSpan="6" style={{textAlign:'center', padding:'20px'}}>Belum ada pesanan.</td></tr>
                ) : (
                    recentOrders.map((order) => (
                        <TableRow 
                            key={order._id}
                            id={order.orderCode}
                            // Ambil nama produk pertama, atau 'Multiple items' jika lebih dari 1
                            product={order.items.length > 0 ? order.items[0].name + (order.items.length > 1 ? '...' : '') : 'Unknown Service'}
                            date={formatDate(order.createdAt)}
                            name={order.customerName}
                            status={order.status}
                            amount={formatRupiah(order.totalPrice)}
                        />
                    ))
                )}
            </tbody>
        </table>
      </div>

    </AdminLayout>
  );
}

// --- Komponen Kecil ---

function StatCard({ title, value, desc }) {
    return (
        <div className="card">
            <div className="card-header">
                {title}
                <MoreVertical size={16} />
            </div>
            <div className="card-body">
                <div className="icon-box">
                    <ShoppingBag size={24} />
                </div>
                <div>
                    <div className="stat-value">{value}</div>
                    <div className="stat-desc">{desc}</div>
                </div>
            </div>
        </div>
    )
}

function TableRow({ product, id, date, name, status, amount }) {
    // Mapping status backend ke class CSS frontend
    let statusClass = 'pending-badge'; // Default
    if (status === 'finished') statusClass = 'delivered';
    if (status === 'cancelled') statusClass = 'canceled';
    if (status === 'processing') statusClass = 'pending-badge'; // Pastikan ada CSS untuk ini atau pakai style manual

    return (
        <tr>
            <td style={{fontWeight:600}}>#{id}</td>
            <td>{product}</td>
            <td>{date}</td>
            <td>{name}</td>
            <td>
                <span className={statusClass} style={{textTransform: 'capitalize'}}>
                    <span className="status-dot"></span>
                    {status}
                </span>
            </td>
            <td style={{fontWeight:'bold'}}>{amount}</td>
        </tr>
    )
}