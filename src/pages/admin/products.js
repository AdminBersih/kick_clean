// src/pages/admin/products.js
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, MoreHorizontal, TrendingUp } from 'lucide-react';
import Image from 'next/image'; // Pastikan pakai Next Image
import Link from 'next/link';

export default function AllProducts() {
  // Data Dummy untuk simulasi tampilan
  const products = Array(6).fill({
    name: "Battery 12V High Power",
    category: "Battery",
    price: "₹110.40", // Ganti mata uang nanti jika perlu
    summary: "Lorem ipsum is placeholder text commonly used in the graphic.",
    sales: 1269,
    remaining: 1269
  });

  return (
    <AdminLayout>
      {/* --- Header Section --- */}
      <div className="page-header">
        <div className="page-title">
          <h1>All Products</h1>
          <div className="breadcrumb">Home &gt; All Products</div>
        </div>
        
        {/* Tombol Add New Product */}
        <Link href="/admin/products/add" className="btn-dark">
            <Plus size={18} />
            ADD NEW PRODUCT
        </Link>
      </div>

      {/* --- Product Grid --- */}
      <div className="products-grid">
        {products.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </div>
    </AdminLayout>
  );
}

// --- Komponen Kartu Produk (Internal) ---
function ProductCard({ data }) {
    return (
        <div className="product-card">
            {/* Bagian Atas: Gambar & Info */}
            <div className="pc-header">
                <div className="pc-image">
                   {/* Placeholder Image (Ganti src dengan gambar asli Anda nanti) */}
                   <img src="https://placehold.co/100x100/png" alt="Product" style={{width:'100%', borderRadius: '8px'}} />
                </div>
                <div className="pc-info">
                    <h3 className="pc-title">Lorem Ipsum</h3>
                    <span className="pc-category">{data.category}</span>
                    <div className="pc-price">{data.price}</div>
                </div>
                <button className="pc-menu-btn">
                    <MoreHorizontal size={20} color="#9CA3AF" />
                </button>
            </div>

            {/* Bagian Tengah: Summary */}
            <div className="pc-summary">
                <h4>Summary</h4>
                <p>{data.summary}</p>
            </div>

            {/* Bagian Bawah: Stats Box */}
            <div className="pc-stats-box">
                {/* Sales Row */}
                <div className="stat-row mb-2">
                    <span className="label">Sales</span>
                    <div className="value-group">
                        <TrendingUp size={14} color="#D97706" />
                        <span>{data.sales}</span>
                    </div>
                </div>
                <hr className="divider"/>
                {/* Remaining Row */}
                <div className="stat-row mt-2">
                    <span className="label">Remaining Products</span>
                    <div className="value-group">
                        {/* Progress Bar Visual */}
                        <div className="progress-track">
                            <div className="progress-fill"></div>
                        </div>
                        <span>{data.remaining}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}