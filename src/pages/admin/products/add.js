// src/pages/admin/products/add.js
import { useState } from 'react';
import { useRouter } from 'next/router'; // Untuk redirect setelah sukses
import AdminLayout from '@/components/admin/AdminLayout';
import { Image as ImageIcon, X, Check } from 'lucide-react';

export default function AddProduct() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // State sesuai field Backend (Service.ts)
  const [formData, setFormData] = useState({
    name: '',
    category: '', // Default kosong agar user harus memilih dropdown
    description: '',
    price: '',     
    duration: '',  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Validasi sederhana (Tambahkan category agar wajib dipilih)
    if(!formData.name || !formData.price || !formData.duration || !formData.category) {
        alert("Nama, Kategori, Harga, dan Durasi wajib diisi!");
        setIsLoading(false);
        return;
    }

    try {
        const payload = {
            ...formData,
            price: Number(formData.price), // Pastikan dikirim sebagai Number
            isActive: true
        };

        // --- AMBIL TOKEN ---
        const token = localStorage.getItem('adminToken'); 

        const res = await fetch('/api/services', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(payload)
        });
        // -------------------

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Gagal menambahkan produk");
        }

        // Sukses
        alert("Service berhasil ditambahkan!");
        router.push('/admin/products'); // Kembali ke halaman list

    } catch (error) {
        console.error(error);
        alert(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div id="admin-scope">
        <div className="page-header">
            <div className="page-title">
                <h1>Add New Service</h1>
                <div className="breadcrumb">Home &gt; Products &gt; Add New</div>
            </div>
        </div>

        <div className="add-product-wrapper">
            
            {/* --- Form Input Section --- */}
            <div className="card form-card">
                
                {/* Name */}
                <div className="form-group">
                    <label>Service Name <span style={{color:'red'}}>*</span></label>
                    <input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text" 
                        className="custom-input" 
                        placeholder="Contoh: Cuci Sepatu Deep Clean" 
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="custom-textarea" 
                        placeholder="Jelaskan detail layanan..."
                    ></textarea>
                </div>

                {/* --- MODIFIKASI: CATEGORY DROPDOWN --- */}
                <div className="form-group">
                    <label>Category <span style={{color:'red'}}>*</span></label>
                    <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="custom-input" // Menggunakan class yang sama agar styling konsisten
                        style={{ cursor: 'pointer', appearance: 'auto' }} // Agar panah dropdown muncul
                    >
                        <option value="" disabled>-- Select Category --</option>
                        <option value="Shoes Treatment">Shoes Treatment</option>
                        <option value="Special Treatment">Special Treatment</option>
                        <option value="Other Treatment">Other Treatment</option>
                    </select>
                </div>
                {/* ------------------------------------- */}

                {/* Price & Duration Row */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Price (Rp) <span style={{color:'red'}}>*</span></label>
                        <input 
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            type="number" 
                            className="custom-input" 
                            placeholder="50000" 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Duration (Estimasi) <span style={{color:'red'}}>*</span></label>
                        <input 
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            type="text" 
                            className="custom-input" 
                            placeholder="Contoh: 3 Hari / 45 Menit" 
                        />
                    </div>
                </div>
            </div>

            {/* --- Gallery Section --- */}
            <div className="right-column">
                <div className="gallery-section" style={{opacity: 0.5, pointerEvents:'none'}}>
                    <h3 className="section-label">Service Image (Coming Soon)</h3>
                    <div className="upload-box">
                        <ImageIcon size={40} color="#0F172A" />
                        <p className="upload-text">Fitur Upload belum tersedia di Backend</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button 
                        className="btn-cancel" 
                        onClick={() => router.back()}
                        disabled={isLoading}
                    >
                        CANCEL
                    </button>
                    
                    <button 
                        className="btn-save" 
                        style={{background: '#0F172A', color:'white', padding:'12px', borderRadius:'8px', flex:1}}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? 'SAVING...' : 'PUBLISH SERVICE'}
                    </button>
                </div>
            </div>

        </div>
      </div>
    </AdminLayout>
  );
}