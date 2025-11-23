// src/pages/admin/login.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Lock, User, LayoutDashboard, AlertCircle } from 'lucide-react'; 

export default function AdminLogin() {
  const router = useRouter();
  
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Cek jika sudah login
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        router.push('/admin');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login gagal');
      }

      if (data.user.role !== 'admin') {
        setError("Akun ini tidak memiliki akses Admin!");
        setLoading(false);
        return;
      }

      localStorage.setItem('adminToken', data.accessToken);
      localStorage.setItem('adminUser', JSON.stringify(data.user));

      router.push('/admin');

    } catch (err) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ID ini penting agar CSS login.css terbaca
    <div id="login-scope">
      
      <div className="login-card">
        
        {/* Logo Header */}
        <div className="brand-logo">
            <LayoutDashboard size={28} />
        </div>
        <h1>Admin Portal</h1>
        <p className="subtitle">Login to manage Kick Clean System</p>

        {/* Pesan Error */}
        {error && (
          <div className="error-box">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
                <div className="input-icon"><User size={18} /></div>
                <input 
                    type="email" 
                    required
                    placeholder="admin@kickclean.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
                <div className="input-icon"><Lock size={18} /></div>
                <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'CHECKING...' : 'SIGN IN'}
          </button>

        </form>

        <div className="footer-copy">
            &copy; 2025 Kick Clean Management
        </div>

      </div>
    </div>
  );
}