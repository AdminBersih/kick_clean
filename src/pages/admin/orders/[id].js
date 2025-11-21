// src/pages/admin/orders/[id].js
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
    Calendar, Printer, ChevronDown, User, 
    Truck, CreditCard, Download 
} from 'lucide-react';

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdminLayout>
      <div id="admin-scope">
        
        {/* --- Page Title --- */}
        <div className="page-header">
            <div className="page-title">
                <h1>Orders Details</h1>
                <div className="breadcrumb">Home &gt; Order List &gt; Order Details</div>
            </div>
        </div>

        {/* --- Main Content Card --- */}
        <div className="card mb-6">
            
            {/* 1. HEADER ORDER (ID, Date, Buttons) */}
            <div className="order-top-header border-b border-gray-100 pb-6 mb-6">
                <div className="left-content">
                    <div className="order-id-group">
                        <h2 className="text-xl font-bold text-gray-800">Orders ID: #{id || '6743'}</h2>
                        <span className="badge-pending">Pending</span>
                    </div>
                    <div className="order-date-group">
                        <Calendar size={16} />
                        <span>Feb 16, 2022 - Feb 20, 2022</span>
                    </div>
                </div>
                
                <div className="right-actions">
                    <div className="status-dropdown">
                        <span>Change Status</span>
                        <ChevronDown size={16} />
                    </div>
                    <button className="action-square-btn"><Printer size={18} /></button>
                    <button className="btn-save">Save</button>
                </div>
            </div>

            {/* 2. INFO CARDS (Customer & Order Info Only) */}
            <div className="info-grid mb-8">
                {/* Customer Card */}
                <div className="info-box">
                    <div className="info-box-inner">
                        <div className="icon-square"><User size={20} /></div>
                        <div className="info-text">
                            <h4 className="font-bold text-gray-800 mb-1">Customer</h4>
                            <p className="text-sm text-gray-500 mb-1">Full Name: Shristi Singh</p>
                            <p className="text-sm text-gray-500 mb-1">Email: shristi@gmail.com</p>
                            <p className="text-sm text-gray-500 mb-4">Phone: +91 904 231 1212</p>
                            <button className="btn-outline w-full">View profile</button>
                        </div>
                    </div>
                </div>

                {/* Order Info Card */}
                <div className="info-box">
                    <div className="info-box-inner">
                        <div className="icon-square"><Truck size={20} /></div>
                        <div className="info-text">
                            <h4 className="font-bold text-gray-800 mb-1">Order Info</h4>
                            <p className="text-sm text-gray-500 mb-1">Shipping: Next express</p>
                            <p className="text-sm text-gray-500 mb-1">Payment Method: Paypal</p>
                            <p className="text-sm text-gray-500 mb-4">Status: Pending</p>
                            <button className="btn-outline w-full">Download info</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. PAYMENT & NOTE GRID */}
            <div className="payment-note-grid">
                <div className="info-box payment-box">
                    <h4 className="font-bold text-gray-800 mb-4">Payment Info</h4>
                    <div className="payment-card-row mb-3">
                        <div className="text-orange-500"><CreditCard size={24} /></div>
                        <span className="text-sm font-medium text-gray-600">Master Card **** **** 6557</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Business name: Shristi Singh</p>
                    <p className="text-sm text-gray-500">Phone: +91 904 231 1212</p>
                </div>

                <div className="note-box">
                    <h4 className="font-bold text-gray-800 mb-2">Note</h4>
                    <textarea className="custom-textarea" placeholder="Type some notes"></textarea>
                </div>
            </div>
        </div>

        {/* --- Products Table Card --- */}
        <div className="card">
            <div className="card-header border-b border-gray-100 pb-4 mb-0">
                <h3 className="text-lg font-bold text-gray-800">Products</h3>
            </div>
            
            <div className="table-wrapper">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Product Name</th>
                            <th>Order ID</th>
                            <th>Quantity</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4].map((item) => (
                            <tr key={item}>
                                <td><input type="checkbox" /></td>
                                <td>
                                    <div className="product-cell-flex">
                                        <div className="prod-img-placeholder"></div> 
                                        <span className="font-medium text-gray-700">Lorem Ipsum</span>
                                    </div>
                                </td>
                                <td>#25421</td>
                                <td>2</td>
                                <td className="text-right font-bold">₹800.40</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 4. SUMMARY SECTION (RATA KANAN) */}
            <div className="summary-section-wrapper">
                <div className="summary-box">
                    <div className="summary-row">
                        <span className="s-label">Subtotal</span>
                        <span className="s-value">₹3,201.6</span>
                    </div>
                    <div className="summary-row">
                        <span className="s-label">Tax (20%)</span>
                        <span className="s-value">₹640.32</span>
                    </div>
                    <div className="summary-row">
                        <span className="s-label">Discount</span>
                        <span className="s-value">₹0</span>
                    </div>
                    <div className="summary-row">
                        <span className="s-label">Shipping Rate</span>
                        <span className="s-value">₹0</span>
                    </div>
                    <div className="summary-row total-row">
                        <span className="s-label-total">Total</span>
                        <span className="s-value-total">₹3841.92</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}