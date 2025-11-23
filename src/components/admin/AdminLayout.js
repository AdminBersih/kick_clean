import Sidebar from './Sidebar';
import { Bell, ChevronDown, LogOut } from 'lucide-react'; // Tambahkan LogOut
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; // Tambahkan useState

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk dropdown

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, []);

  // --- FUNGSI LOGOUT ---
  const handleLogout = async () => {
    try {
      // 1. Panggil API Logout (Backend)
      await fetch('/api/auth/logout', { method: 'POST' });

      // 2. Hapus Token Frontend
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');

      // 3. Redirect ke Login
      router.push('/admin/login');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <div id="admin-scope"> 
      <div className="admin-wrapper">
        <Sidebar />
        
        <main className="main-content">
          <header className="topbar">
              <Bell size={20} color="#6B7280" style={{cursor:'pointer'}} />
              
              {/* --- BAGIAN DROPDOWN --- */}
              <div style={{ position: 'relative' }}>
                  
                  {/* Tombol ADMIN (Tetap pakai class Anda) */}
                  <button 
                    className="admin-btn" 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                      <span className="font-medium">ADMIN</span> 
                      <ChevronDown size={16} />
                  </button>

                  {/* Menu Dropdown (Muncul jika state true) */}
                  {isDropdownOpen && (
                      <div style={{
                          position: 'absolute',
                          top: '120%',
                          right: 0,
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          padding: '8px',
                          minWidth: '140px',
                          zIndex: 100
                      }}>
                          <button 
                            onClick={handleLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                width: '100%',
                                padding: '8px 12px',
                                border: 'none',
                                background: 'transparent',
                                color: '#DC2626', // Warna Merah
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                borderRadius: '4px'
                            }}
                            onMouseEnter={(e) => e.target.style.background = '#FEF2F2'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                          >
                              <LogOut size={16} />
                              Logout
                          </button>
                      </div>
                  )}
                  
                  {/* Overlay untuk menutup dropdown saat klik di luar */}
                  {isDropdownOpen && (
                      <div 
                        style={{position: 'fixed', top:0, left:0, right:0, bottom:0, zIndex: 90}}
                        onClick={() => setIsDropdownOpen(false)}
                      ></div>
                  )}
              </div>
              {/* --- END DROPDOWN --- */}

          </header>

          <div className="page-content">
              {children}
          </div>
        </main>
      </div>
    </div>
  );
}