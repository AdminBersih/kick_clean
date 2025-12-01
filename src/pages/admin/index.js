// src/pages/admin/index.js
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import SalesChart from '@/components/admin/SalesChart'; // <--- IMPORT PENTING
import { ShoppingBag, MoreVertical, Loader2, TrendingUp, Package, Users } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data dari Backend
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) return; 

        // Pastikan URL backend ini sudah benar (sesuai file dashboard.ts Anda)
        const res = await fetch('/api/admin/orders/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
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

  // Helper Formatter
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  if (loading) {
    return (
        <AdminLayout>
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin" size={40} color="#0F172A"/>
            </div>
        </AdminLayout>
    );
  }

  // Fallback data
  const stats = data?.stats || { revenue: 0, totalOrders: 0, activeOrders: 0, finishedOrders: 0 };
  const recentOrders = data?.recentOrders || [];
  const chartData = data?.chartData || []; // <--- Ambil data grafik dari backend

  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div className="page-title">
          <h1>Dashboard</h1>
          <div className="breadcrumb">Home &gt; Dashboard</div>
        </div>
        <div className="date-range">
           📅 {formatDate(new Date())}
        </div>
      </div>

      {/* 1. Stats Cards */}
      <div className="stats-grid">
        <StatCard title="Total Revenue" value={formatRupiah(stats.revenue)} desc="Pemasukan bersih" icon={<TrendingUp size={24} />} color="blue" />
        <StatCard title="Total Orders" value={stats.totalOrders} desc="Semua pesanan masuk" icon={<ShoppingBag size={24} />} color="purple" />
        <StatCard title="Active Process" value={stats.activeOrders} desc="Sedang dikerjakan" icon={<Package size={24} />} color="orange" />
        <StatCard title="Completed" value={stats.finishedOrders} desc="Pesanan selesai" icon={<Users size={24} />} color="green" />
      </div>

      {/* 2. SALES CHART (Sudah Terhubung) */}
      <div className="card" style={{ marginBottom: '24px', paddingBottom:'10px' }}>
        <div className="card-header">
            <span style={{fontSize:'16px', color:'#1f2937', fontWeight:'700'}}>Sales Statistics</span>
            <div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Last 7 Days</span>
            </div>
        </div>
        {/* Render Grafik */}
        <div style={{ height: '320px', marginTop: '10px' }}>
            <SalesChart data={chartData} />
        </div>
      </div>

      {/* 3. Recent Orders Table */}
      <div className="card">
        <div className="card-header">
            <h3 className="section-title" style={{margin:0}}>Recent Orders</h3>
            <Link href="/admin/orders" style={{fontSize:'13px', color:'#2563EB', fontWeight:600}}>View All</Link>
        </div>
        
        <div className="table-wrapper" style={{border:'none', boxShadow:'none'}}>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th style={{textAlign:'right'}}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.length === 0 ? (
                        <tr><td colSpan="6" style={{textAlign:'center', padding:'30px', color:'#6B7280'}}>Belum ada pesanan masuk.</td></tr>
                    ) : (
                        recentOrders.map((order) => (
                            <TableRow 
                                key={order._id}
                                id={order.orderCode}
                                product={order.items?.[0]?.name || 'Service'}
                                extraItems={order.items?.length > 1 ? `+${order.items.length - 1} more` : ''}
                                date={new Date(order.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'short'})}
                                name={order.customerName}
                                status={order.status}
                                amount={formatRupiah(order.totalPrice)}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>

    </AdminLayout>
  );
}

// --- Sub-Komponen ---

function StatCard({ title, value, desc, icon, color }) {
    const bgColors = { blue: '#EFF6FF', purple: '#FAF5FF', orange: '#FFF7ED', green: '#F0FDF4' };
    const textColors = { blue: '#1D4ED8', purple: '#7E22CE', orange: '#C2410C', green: '#15803D' };

    return (
        <div className="card">
            <div className="card-header" style={{marginBottom:'12px'}}>
                {title} <MoreVertical size={16} />
            </div>
            <div className="card-body">
                <div className="icon-box" style={{
                    backgroundColor: bgColors[color] || '#F3F4F6', 
                    color: textColors[color] || '#374151',
                    width:'48px', height:'48px'
                }}>
                    {icon}
                </div>
                <div>
                    <div className="stat-value">{value}</div>
                    <div className="stat-desc">{desc}</div>
                </div>
            </div>
        </div>
    )
}

function TableRow({ product, extraItems, id, date, name, status, amount }) {
    let badgeClass = '';
    if (status === 'finished') badgeClass = 'delivered';
    else if (status === 'cancelled') badgeClass = 'canceled';
    else if (status === 'processing') badgeClass = 'processing-custom'; 
    else badgeClass = 'badge-pending';

    return (
        <tr>
            <td style={{fontWeight:600, color:'#1F2937'}}>#{id}</td>
            <td>
                <span style={{fontWeight:500}}>{product}</span>
                {extraItems && <span style={{fontSize:'11px', color:'#6B7280', marginLeft:'4px'}}>{extraItems}</span>}
            </td>
            <td style={{color:'#6B7280'}}>{date}</td>
            <td>{name}</td>
            <td>
                {status === 'processing' ? (
                    <span style={{color:'#2563EB', fontWeight:600, display:'flex', alignItems:'center', gap:'6px'}}>
                        <span style={{width:'8px', height:'8px', borderRadius:'50%', background:'#2563EB'}}></span>
                        Processing
                    </span>
                ) : (
                    <span className={badgeClass} style={{textTransform:'capitalize'}}>
                        <span className="status-dot"></span>
                        {status}
                    </span>
                )}
            </td>
            <td style={{fontWeight:'bold', textAlign:'right'}}>{amount}</td>
        </tr>
    )
}