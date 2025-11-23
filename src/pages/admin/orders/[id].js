// src/pages/admin/orders/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Calendar, Printer, ChevronDown, User, Truck, CreditCard, Loader2 } from 'lucide-react';

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query; // Ini adalah _id dari database

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 1. Fetch Detail Order
  useEffect(() => {
    if (!id) return;
    async function fetchOrderDetail() {
      try {
        const res = await fetch(`/api/admin/orders/${id}`);
        if (res.ok) {
            const data = await res.json();
            setOrder(data.order);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrderDetail();
  }, [id]);

  // 2. Fungsi Update Status (Nembak ke status.ts)
  const handleStatusChange = async (newStatus) => {
    const confirmUpdate = confirm(`Ubah status menjadi ${newStatus}?`);
    if (!confirmUpdate) return;

    setUpdating(true);
    try {
        const res = await fetch(`/api/admin/orders/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (res.ok) {
            const data = await res.json();
            setOrder(data.order); // Update tampilan UI dengan data baru
            alert("Status berhasil diperbarui!");
        } else {
            alert("Gagal update status");
        }
    } catch (err) {
        console.error(err);
    } finally {
        setUpdating(false);
    }
  };

  if (loading) return <AdminLayout><div className="p-10 flex justify-center"><Loader2 className="animate-spin"/></div></AdminLayout>;
  if (!order) return <AdminLayout><div className="p-10">Order not found</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="page-header">
         {/* ... Judul ... */}
         <div className="page-title">
            <h1>Order Details</h1>
            <div className="breadcrumb">Home &gt; Order List &gt; Details</div>
        </div>
      </div>

      <div className="card mb-6">
            {/* Header ID & Status */}
            <div className="order-top-header border-b border-gray-100 pb-6 mb-6">
                <div className="left-content">
                    <div className="order-id-group">
                        <h2 className="text-xl font-bold text-gray-800">Order Code: #{order.orderCode}</h2>
                        <span className="badge-status" style={{background:'#FEF3C7', color:'#D97706', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>
                            {order.status.toUpperCase()}
                        </span>
                    </div>
                    <div className="order-date-group mt-2 text-gray-500 flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(order.createdAt).toLocaleString('id-ID')}</span>
                    </div>
                </div>
                
                <div className="right-actions">
                    {/* Dropdown Status Custom */}
                    <div className="relative group">
                        <button className="status-dropdown flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50" disabled={updating}>
                            <span>{updating ? 'Updating...' : 'Change Status'}</span>
                            <ChevronDown size={16} />
                        </button>
                        {/* Menu Dropdown */}
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg hidden group-hover:block z-10">
                            {['pending', 'processing', 'finished', 'cancelled'].map((s) => (
                                <button 
                                    key={s}
                                    onClick={() => handleStatusChange(s)}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 uppercase"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="action-square-btn p-2 border rounded hover:bg-gray-100"><Printer size={18} /></button>
                </div>
            </div>

            {/* Info Grid (Customer, Kontak, Note) */}
            <div className="info-grid mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="info-box border p-4 rounded-lg">
                    <div className="flex gap-4">
                        <div className="icon-square bg-blue-100 p-3 rounded text-blue-600"><User size={24} /></div>
                        <div>
                            <h4 className="font-bold text-gray-800">Customer</h4>
                            <p className="text-sm text-gray-500">{order.customerName}</p>
                            <p className="text-sm text-gray-500">{order.email || '-'}</p>
                            <p className="text-sm text-gray-500">{order.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="info-box border p-4 rounded-lg">
                    <div className="flex gap-4">
                        <div className="icon-square bg-green-100 p-3 rounded text-green-600"><Truck size={24} /></div>
                        <div>
                            <h4 className="font-bold text-gray-800">Order Info</h4>
                            <p className="text-sm text-gray-500">Method: {order.pickupMethod || 'Drop off'}</p>
                            <p className="text-sm text-gray-500">Address: {order.address || '-'}</p>
                        </div>
                    </div>
                </div>
            </div>

             {/* Note Box */}
            <div className="note-box mb-6">
                <h4 className="font-bold text-gray-800 mb-2">Notes</h4>
                <textarea 
                    className="custom-textarea w-full border p-3 rounded bg-gray-50" 
                    readOnly 
                    value={order.notes || "No notes provided."}
                ></textarea>
            </div>
      </div>

      {/* Products Table */}
      <div className="card">
            <div className="card-header border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-lg font-bold text-gray-800">Services Ordered</h3>
            </div>
            
            <table className="custom-table w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="py-2">Service Name</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Qty</th>
                        <th className="py-2 text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item, i) => (
                        <tr key={i} className="border-b last:border-0">
                            <td className="py-3 font-medium">{item.name}</td>
                            <td className="py-3">Rp {item.price.toLocaleString()}</td>
                            <td className="py-3">{item.quantity}</td>
                            <td className="py-3 text-right font-bold">Rp {(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="summary-section mt-6 flex justify-end">
                <div className="w-64">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Total Price</span>
                        <span className="font-bold text-xl">Rp {order.totalPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>
      </div>
    </AdminLayout>
  );
}