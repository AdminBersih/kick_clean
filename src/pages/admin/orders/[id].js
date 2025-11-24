// src/pages/admin/orders/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Calendar, User, Truck, Loader2, AlertCircle, MapPin, Mail, Phone } from 'lucide-react';

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query; 

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 1. Fetch Detail Order
  useEffect(() => {
    if (!id) return;
    async function fetchOrderDetail() {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`/api/admin/orders/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
            const data = await res.json();
            setOrder(data.order);
        } else {
            console.error("Gagal mengambil detail order");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrderDetail();
  }, [id]);

  // 2. Fungsi Update Status
  const handleStatusChange = async (newStatus) => {
    if (order.status === newStatus) return;

    if (order.status === 'pending') {
        alert("Pesanan PENDING harus dibayar dulu sebelum diproses.");
        return;
    }

    const confirmUpdate = confirm(`Ubah status menjadi ${newStatus}?`);
    if (!confirmUpdate) return;

    setUpdating(true);
    try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`/api/admin/orders/${id}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (res.ok) {
            const data = await res.json();
            setOrder(data.order); 
            alert("Status berhasil diperbarui!");
        } else {
            alert("Gagal update status");
        }
    } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan koneksi");
    } finally {
        setUpdating(false);
    }
  };

  if (loading) return <AdminLayout><div className="p-10 flex justify-center"><Loader2 className="animate-spin"/></div></AdminLayout>;
  if (!order) return <AdminLayout><div className="p-10">Order not found</div></AdminLayout>;

  // Helper Warna Status & Label
  const getStatusConfig = (status) => {
    switch(status) {
        case 'pending': return { bg: '#FEF3C7', color: '#D97706', border: '#FCD34D', label: 'Pending Payment' };
        case 'processing': return { bg: '#DBEAFE', color: '#2563EB', border: '#93C5FD', label: 'On Process' };
        case 'finished': return { bg: '#DCFCE7', color: '#166534', border: '#86EFAC', label: 'Completed' };
        case 'cancelled': return { bg: '#FEE2E2', color: '#DC2626', border: '#FCA5A5', label: 'Cancelled' };
        default: return { bg: '#F3F4F6', color: '#374151', border: '#E5E7EB', label: status };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const statuses = ['pending', 'processing', 'finished', 'cancelled'];

  return (
    <AdminLayout>
      <div className="page-header">
         <div className="page-title">
            <h1>Order Details</h1>
            <div className="breadcrumb">Home &gt; Order List &gt; Details</div>
        </div>
      </div>

      <div className="card mb-6">
            {/* --- HEADER ATAS (ID + PITA STATUS) --- */}
            <div className="order-top-header border-b border-gray-100 pb-6 mb-6" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div className="left-content">
                    <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'6px'}}>
                        <h2 className="text-xl font-bold text-gray-800">#{order.orderCode}</h2>
                        
                        {/* PITA STATUS (RIBBON) */}
                        <span style={{
                            backgroundColor: statusConfig.bg,
                            color: statusConfig.color,
                            border: `1px solid ${statusConfig.border}`,
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            display: 'inline-flex',
                            alignItems: 'center'
                        }}>
                            {statusConfig.label}
                        </span>
                    </div>
                    <div className="text-gray-500 text-sm flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
                    </div>
                </div>
                
                {/* --- TOMBOL CHANGE STATUS --- */}
                <div className="right-actions">
                    <div className="status-actions-container">
                        {statuses.map((s) => {
                            
                            // --- LOGIKA KUNCI STATUS ---
                            let isLocked = false;
                            if (order.status === 'pending' && s !== 'pending') {
                                isLocked = true;
                            }

                            if (order.status !== 'pending' && s === 'pending') {
                                isLocked = true;
                            }

                            if ((order.status === 'finished' || order.status === 'cancelled') && order.status !== s) {
                                isLocked = true;
                            }

                            // Gabungkan dengan loading state
                            const isDisabled = updating || isLocked;

                            return (
                                <button
                                    key={s}
                                    onClick={() => handleStatusChange(s)}
                                    disabled={isDisabled}
                                    className={`status-btn ${order.status === s ? `active ${s}` : ''}`}
                                    title={isDisabled ? "Status terkunci / tidak valid" : `Ubah ke ${s}`}
                                    style={{ cursor: isDisabled ? 'not-allowed' : 'pointer', opacity: isDisabled ? 0.5 : 1 }}
                                >
                                    {s}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* --- USER DETAIL SECTION (KIRI - KANAN) --- */}
            <div style={{
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', // Grid 2 Kolom
                gap: '24px',
                marginBottom: '16px'
            }}>
                
                {/* Kiri: Customer Info */}
                <div style={{
                    border: '1px solid #E5E7EB', 
                    borderRadius: '12px', 
                    padding: '20px',
                    background: '#F9FAFB'
                }}>
                    <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px'}}>
                        <div style={{background:'white', padding:'8px', borderRadius:'8px', border:'1px solid #E5E7EB'}}>
                            <User size={20} color="#1F2937"/>
                        </div>
                        <h3 style={{fontSize:'15px', fontWeight:'700', color:'#1F2937', margin:0}}>Customer Info</h3>
                    </div>
                    
                    <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                        <div>
                            <label style={{fontSize:'12px', color:'#6B7280', display:'block', marginBottom:'2px'}}>Full Name</label>
                            <div style={{fontWeight:'600', color:'#1F2937'}}>{order.customerName}</div>
                        </div>
                        <div style={{display:'flex', gap:'20px'}}>
                            <div>
                                <label style={{fontSize:'12px', color:'#6B7280', display:'block', marginBottom:'2px'}}>Phone</label>
                                <div style={{fontSize:'14px', color:'#374151', display:'flex', alignItems:'center', gap:'6px'}}>
                                    <Phone size={14}/> {order.phone}
                                </div>
                            </div>
                            <div>
                                <label style={{fontSize:'12px', color:'#6B7280', display:'block', marginBottom:'2px'}}>Email</label>
                                <div style={{fontSize:'14px', color:'#374151', display:'flex', alignItems:'center', gap:'6px'}}>
                                    <Mail size={14}/> {order.email || '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kanan: Delivery Info */}
                <div style={{
                    border: '1px solid #E5E7EB', 
                    borderRadius: '12px', 
                    padding: '20px',
                    background: '#F9FAFB'
                }}>
                    <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px'}}>
                        <div style={{background:'white', padding:'8px', borderRadius:'8px', border:'1px solid #E5E7EB'}}>
                            <Truck size={20} color="#1F2937"/>
                        </div>
                        <h3 style={{fontSize:'15px', fontWeight:'700', color:'#1F2937', margin:0}}>Delivery Details</h3>
                    </div>

                    <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                        <div>
                            <label style={{fontSize:'12px', color:'#6B7280', display:'block', marginBottom:'2px'}}>Delivery Method</label>
                            <div style={{
                                display:'inline-block',
                                background: order.pickupMethod === 'pickup' ? '#EEF2FF' : '#ECFDF5',
                                color: order.pickupMethod === 'pickup' ? '#4F46E5' : '#059669',
                                padding:'4px 10px', borderRadius:'4px', fontSize:'12px', fontWeight:'700', textTransform:'uppercase'
                            }}>
                                {order.pickupMethod || 'Drop off'}
                            </div>
                        </div>
                        <div>
                            <label style={{fontSize:'12px', color:'#6B7280', display:'block', marginBottom:'2px'}}>Address</label>
                            <div style={{fontSize:'14px', color:'#374151', lineHeight:'1.5', display:'flex', gap:'6px'}}>
                                <MapPin size={16} style={{flexShrink:0, marginTop:'2px'}} /> 
                                {order.address || 'No address provided'}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
      </div>

      {/* --- SERVICES ORDERED (KOTAK TUMPUL) --- */}
      <div className="card">
            <div className="card-header border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-lg font-bold text-gray-800">Services Ordered</h3>
            </div>
            
            <div className="rounded-table-box">
                {/* Header */}
                <div className="rt-row rt-header">
                    <div className="rt-col-left">Service Name</div>
                    <div className="rt-col-center">Qty</div>
                    <div className="rt-col-right">Price</div>
                </div>

                {/* Items */}
                {order.items.map((item, i) => (
                    <div key={i} className="rt-row">
                        <div className="rt-col-left">
                            <div className="rt-item-name">{item.name}</div>
                        </div>
                        <div className="rt-col-center">
                            <span style={{background:'#F3F4F6', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>
                                x{item.quantity}
                            </span>
                        </div>
                        <div className="rt-col-right">
                            <div className="rt-item-price">Rp {item.price.toLocaleString()}</div>
                            <div style={{fontWeight:'bold', color:'#1F2937'}}>
                                Rp {(item.price * item.quantity).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Total Footer */}
                <div className="rt-row rt-total">
                    <div className="rt-col-left">
                        <span className="label">TOTAL PAYMENT</span>
                    </div>
                    <div className="rt-col-right">
                        <span className="value">Rp {order.totalPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>
      </div>

    </AdminLayout>
  );
}