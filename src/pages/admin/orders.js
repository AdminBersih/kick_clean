// src/pages/admin/orders.js
import AdminLayout from '@/components/admin/AdminLayout';
import { Calendar, ChevronDown, MoreVertical } from 'lucide-react';
import Link from "next/link"

export default function OrderList() {
  // Data Dummy untuk tabel (Sesuai gambar)
  const orders = [
    { id: "#25426", product: "Lorem Ipsum", date: "Nov 8th, 2023", customer: "Kavin", img: "https://i.pravatar.cc/150?u=1", status: "Delivered", amount: "₹200.00" },
    { id: "#25425", product: "Lorem Ipsum", date: "Nov 7th, 2023", customer: "Komael", img: "https://i.pravatar.cc/150?u=2", status: "Canceled", amount: "₹200.00" },
    { id: "#25424", product: "Lorem Ipsum", date: "Nov 6th, 2023", customer: "Nikhil", img: "https://i.pravatar.cc/150?u=3", status: "Delivered", amount: "₹200.00" },
    { id: "#25423", product: "Lorem Ipsum", date: "Nov 5th, 2023", customer: "Shivam", img: "https://i.pravatar.cc/150?u=4", status: "Canceled", amount: "₹200.00" },
    { id: "#25422", product: "Lorem Ipsum", date: "Nov 4th, 2023", customer: "Shadab", img: "https://i.pravatar.cc/150?u=5", status: "Delivered", amount: "₹200.00" },
    { id: "#25421", product: "Lorem Ipsum", date: "Nov 2nd, 2023", customer: "Yogesh", img: "https://i.pravatar.cc/150?u=6", status: "Delivered", amount: "₹200.00" },
    { id: "#25423", product: "Lorem Ipsum", date: "Nov 1st, 2023", customer: "Sunita", img: "https://i.pravatar.cc/150?u=7", status: "Canceled", amount: "₹200.00" },
    { id: "#25421", product: "Lorem Ipsum", date: "Nov 1st, 2023", customer: "Priyanka", img: "https://i.pravatar.cc/150?u=8", status: "Delivered", amount: "₹200.00" },
  ];

  return (
    <AdminLayout>
      {/* --- Header Section --- */}
      <div className="page-header">
        <div className="page-title">
          <h1>Orders List</h1>
          <div className="breadcrumb">Home &gt; Order List</div>
        </div>
        
        <div className="header-actions">
            {/* Date Picker Dummy */}
            <div className="date-picker-btn">
                <Calendar size={16} />
                <span>Feb 16, 2022 - Feb 20, 2022</span>
            </div>
            
            {/* Status Dropdown */}
            <div className="status-dropdown">
                <span>Change Status</span>
                <ChevronDown size={16} />
            </div>
        </div>
      </div>

      {/* --- Table Card --- */}
      <div className="table-card">
        <div className="card-header">
            <h3 className="card-title">Recent Purchases</h3>
            <button><MoreVertical size={20} color="#9CA3AF" /></button>
        </div>
        
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
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" /></td>
                            <td style={{fontWeight: 500}}>
                                {/* Link ke halaman detail, kita hapus tanda '#' dari ID agar URL bersih */}
                                <Link href={`/admin/orders/${order.id.replace('#', '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <span style={{ cursor: 'pointer' }} onMouseOver={(e) => e.target.style.color = '#0F172A'} onMouseOut={(e) => e.target.style.color = 'inherit'}>
                                        {order.product}
                                    </span>
                                </Link>
                            </td>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>
                                <div className="customer-cell">
                                    <img src={order.img} alt={order.customer} />
                                    <span>{order.customer}</span>
                                </div>
                            </td>
                            <td>
                                <span className={order.status === 'Delivered' ? 'delivered' : 'canceled'}>
                                    <span className="status-dot"></span>
                                    {order.status}
                                </span>
                            </td>
                            <td style={{fontWeight: 'bold'}}>{order.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* --- Pagination --- */}
        <div className="pagination-wrapper">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <span className="dots">...</span>
            <button className="page-btn">10</button>
            <button className="next-btn">NEXT &gt;</button>
        </div>
      </div>
    </AdminLayout>
  );
}