// src/pages/admin/products.js
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Loader2, Trash2 } from 'lucide-react'; 
import Link from 'next/link';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch Data
  useEffect(() => {
    async function fetchServices() {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('/api/services', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Gagal mengambil data');
        
        const data = await res.json();
        setProducts(data.services || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  // 2. Fungsi Delete
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus layanan ini?");
    if (!confirmDelete) return;

    try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`/api/services/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error("Gagal menghapus data");

        setProducts((prevProducts) => prevProducts.filter((item) => item._id !== id));
        alert("Layanan berhasil dihapus!");

    } catch (error) {
        console.error(error);
        alert(error.message || "Terjadi kesalahan saat menghapus");
    }
  };

  // Helper Format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <div className="page-title">
          <h1>All Products (Services)</h1>
          <div className="breadcrumb">Home &gt; All Products</div>
        </div>
        
        <Link href="/admin/products/add" className="btn-dark">
            <Plus size={18} />
            ADD NEW SERVICE
        </Link>
      </div>

      {loading ? (
        <div style={{display:'flex', justifyContent:'center', padding:'50px'}}>
            <Loader2 className="animate-spin" />
        </div>
      ) : error ? (
        <div className="error-msg">Error: {error}</div>
      ) : (
        <div className="products-grid">
            {products.length === 0 ? (
                <p>Belum ada layanan/produk yang ditambahkan.</p>
            ) : (
                products.map((item) => (
                <ProductCard 
                    key={item._id} 
                    data={item} 
                    formatPrice={formatRupiah}
                    onDelete={() => handleDelete(item._id)} 
                />
                ))
            )}
        </div>
      )}
    </AdminLayout>
  );
}

// --- KOMPONEN PRODUCT CARD (TANPA GAMBAR) ---
function ProductCard({ data, formatPrice, onDelete }) {
    return (
        <div className="product-card">
            <div className="pc-header">
                {/* Bagian Gambar DIHAPUS di sini */}
                
                <div className="pc-info" style={{ flex: 1 }}> {/* Tambah flex:1 agar teks memenuhi ruang */}
                    <h3 className="pc-title">{data.name}</h3>
                    <span className="pc-category">{data.category}</span>
                    <div className="pc-price">{formatPrice(data.price)}</div>
                </div>
                
                <button 
                    className="pc-menu-btn" 
                    onClick={onDelete}
                    title="Hapus Layanan"
                    style={{color: '#EF4444'}}
                >
                    <Trash2 size={20} />
                </button>
            </div>

            <div className="pc-summary">
                <h4>Description</h4>
                <p>{data.description || "No description provided."}</p>
            </div>

            <div className="pc-stats-box">
                <div className="stat-row mb-2">
                    <span className="label">Duration</span>
                    <div className="value-group">
                        <span>{data.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}