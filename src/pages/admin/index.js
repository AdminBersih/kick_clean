import AdminLayout from '@/components/admin/AdminLayout';
import { ShoppingBag, MoreVertical } from 'lucide-react';

export default function Dashboard() {
  return (
    <AdminLayout>
      {/* Header & Breadcrumb */}
      <div className="page-header">
        <div className="page-title">
          <h1>Dashboard</h1>
          <div className="breadcrumb">Home &gt; Dashboard</div>
        </div>
        <div className="date-range">
           📅 Oct 11, 2023 - Nov 11, 2022
        </div>
      </div>

      {/* 1. Stats Cards (4 Kotak) */}
      <div className="stats-grid">
        <StatCard title="Total Orders" value="Rp 126.500" />
        <StatCard title="Active Orders" value="Rp 450.000" />
        <StatCard title="Completed Orders" value="12" />
        <StatCard title="Return Orders" value="0" />
      </div>

      {/* 2. Graph Placeholder (Sesuai gambar Sale Graph) */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
            <span style={{fontSize:'18px', color:'#1f2937'}}>Sale Graph</span>
            <div style={{display:'flex', gap:'8px'}}>
                <button className="admin-btn" style={{padding:'4px 12px'}}>WEEKLY</button>
                <button className="admin-btn" style={{background:'#0F172A', color:'white'}}>MONTHLY</button>
                <button className="admin-btn" style={{padding:'4px 12px'}}>YEARLY</button>
            </div>
        </div>
        <div style={{height: '250px', background: '#F9FAFB', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#9CA3AF'}}>
            {/* Disini nanti tempat Chart (Recharts/Chart.js) */}
            [ Grafik Penjualan Placeholder ]
        </div>
      </div>

      {/* 3. Recent Orders Table */}
      <h3 className="section-title">Recent Orders</h3>
      <div className="table-wrapper">
        <table className="custom-table">
            <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>Product</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer Name</th>
                    <th>Status</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <TableRow 
                    product="Cuci Sepatu Deep Clean" id="#25426" date="Nov 8th, 2023" 
                    name="Budi Santoso" status="Delivered" amount="Rp 200.000" 
                />
                <TableRow 
                    product="Repaint Leather" id="#25425" date="Nov 7th, 2023" 
                    name="Siti Aminah" status="Canceled" amount="Rp 150.000" 
                />
                <TableRow 
                    product="Fast Cleaning" id="#25424" date="Nov 6th, 2023" 
                    name="Joko Anwar" status="Delivered" amount="Rp 80.000" 
                />
            </tbody>
        </table>
      </div>

    </AdminLayout>
  );
}

// --- Komponen Kecil (Internal) ---

function StatCard({ title, value }) {
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
                    <div className="stat-desc">Compared to Oct 2023</div>
                </div>
            </div>
        </div>
    )
}

function TableRow({ product, id, date, name, status, amount }) {
    const statusClass = status === 'Delivered' ? 'delivered' : 'canceled';
    
    return (
        <tr>
            <td><input type="checkbox" /></td>
            <td style={{fontWeight:600}}>{product}</td>
            <td>{id}</td>
            <td>{date}</td>
            <td style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <div style={{width:24, height:24, borderRadius:'50%', background:'#E5E7EB'}}></div> 
                {name}
            </td>
            <td>
                <span className={statusClass}>
                    <span className="status-dot"></span>
                    {status}
                </span>
            </td>
            <td style={{fontWeight:'bold'}}>{amount}</td>
        </tr>
    )
}