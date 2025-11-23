// src/pages/admin/orders.js
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Calendar, ChevronDown, MoreVertical, Loader2, Eye } from 'lucide-react';
import Link from "next/link";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data Orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/admin/orders');
        const data = await res.json();
        if (res.ok) {
            setOrders(data.orders || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // Helper Format Tanggal
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  // Helper Format Rupiah
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits:0 }).format(num);

  return (
    <AdminLayout>
      <div className="page-header">
        <div className="page-title">
          <h1>Orders List</h1>
          <div className="breadcrumb">Home &gt; Order List</div>
        </div>
      </div>

      <div className="table-card">
        <div className="card-header">
            <h3 className="card-title">Recent Purchases</h3>
        </div>
        
        <div className="table-wrapper">
            {loading ? (
                <div className="p-8 flex justify-center"><Loader2 className="animate-spin"/></div>
            ) : (
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan="6" className="text-center p-4">No orders found.</td></tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id}>
                                    <td style={{fontWeight: 500}}>#{order.orderCode}</td>
                                    <td>{formatDate(order.createdAt)}</td>
                                    <td>
                                        <div className="customer-cell">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs">
                                                {order.customerName.charAt(0)}
                                            </div>
                                            <span>{order.customerName}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {/* Class dinamis berdasarkan status */}
                                        <span className={`
                                            ${order.status === 'finished' ? 'delivered' : ''} 
                                            ${order.status === 'cancelled' ? 'canceled' : ''}
                                            ${order.status === 'pending' || order.status === 'processing' ? 'pending-badge' : ''} // Pastikan ada CSS ini
                                        `}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{fontWeight: 'bold'}}>{formatRupiah(order.totalPrice)}</td>
                                    <td>
                                        <Link href={`/admin/orders/${order._id}`}>
                                            <button className="text-blue-600 hover:text-blue-800" title="View Details">
                                                <Eye size={20} />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
      </div>
    </AdminLayout>
  );
}