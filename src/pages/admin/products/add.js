// src/pages/admin/products/add.js
import AdminLayout from '@/components/admin/AdminLayout';
import { Image as ImageIcon, X, Check, UploadCloud } from 'lucide-react';

export default function AddProduct() {
  return (
    <AdminLayout>
      <div id="admin-scope">
        
        {/* --- Header --- */}
        <div className="page-header">
            <div className="page-title">
                <h1>Product Details</h1>
                <div className="breadcrumb">Home &gt; All Products &gt; Add New Product</div>
            </div>
        </div>

        {/* --- Main Form Grid (Kiri: Form, Kanan: Gallery) --- */}
        <div className="add-product-wrapper">
            
            {/* KOLOM KIRI: Form Input */}
            <div className="card form-card">
                
                {/* Product Name */}
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" className="custom-input" placeholder="Type name here" />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="custom-textarea" placeholder="Type Description here"></textarea>
                </div>

                {/* Category */}
                <div className="form-group">
                    <label>Category</label>
                    <input type="text" className="custom-input" placeholder="Type Category here" />
                </div>

                {/* Brand Name */}
                <div className="form-group">
                    <label>Brand Name</label>
                    <input type="text" className="custom-input" placeholder="Type brand name here" />
                </div>

                {/* Row: SKU & Stock */}
                <div className="form-row">
                    <div className="form-group">
                        <label>SKU</label>
                        <input type="text" className="custom-input" placeholder="Fox-3983" />
                    </div>
                    <div className="form-group">
                        <label>Stock Quantity</label>
                        <input type="text" className="custom-input" placeholder="1258" />
                    </div>
                </div>

                {/* Row: Price */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Regular Price</label>
                        <input type="text" className="custom-input" placeholder="₹1000" />
                    </div>
                    <div className="form-group">
                        <label>Sale Price</label>
                        <input type="text" className="custom-input" placeholder="₹450" />
                    </div>
                </div>

                {/* Tag */}
                <div className="form-group">
                    <label>Tag</label>
                    <div className="tag-input-area">
                        <span className="tag-pill">Lorem</span>
                        <span className="tag-pill">Lorem</span>
                        <span className="tag-pill">Lorem</span>
                    </div>
                </div>
            </div>

            {/* KOLOM KANAN: Gallery & Actions */}
            <div className="right-column">
                
                {/* Main Image Preview (Kotak Abu Besar) */}
                <div className="main-image-preview"></div>

                {/* Upload Area */}
                <div className="gallery-section">
                    <h3 className="section-label">Product Gallery</h3>
                    
                    <div className="upload-box">
                        <ImageIcon size={40} color="#0F172A" strokeWidth={1.5} />
                        <p className="upload-text">Drop your imager here, or browse</p>
                        <p className="upload-subtext">Jpeg, png are allowed</p>
                    </div>

                    {/* Uploaded List */}
                    <div className="file-list">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="file-item">
                                <div className="file-thumb"></div>
                                <div className="file-info">
                                    <span className="file-name">Product thumbnail.png</span>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '100%'}}></div>
                                    </div>
                                </div>
                                <div className="file-check">
                                    <Check size={14} color="white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button className="btn-delete">DELETE</button>
                    <button className="btn-cancel">CANCEL</button>
                </div>
            </div>

        </div>
      </div>
    </AdminLayout>
  );
}