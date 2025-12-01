// src/components/admin/AdminLayout.js
import Sidebar from './Sidebar';
import { Bell, ChevronDown, LogOut, Menu, X } from 'lucide-react'; // Tambah Menu & X
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false); // State baru untuk Mobile Sidebar

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, []);

  // Tutup sidebar otomatis saat pindah halaman (UX yang baik di HP)
  useEffect(() => {
    const handleRouteChange = () => setMobileSidebarOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      router.push('/admin/login');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <div id="admin-scope"> 
      {/* Tambahkan class dinamis 'mobile-open' jika sidebar aktif */}
      <div className={`admin-wrapper ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
        
        {/* --- SIDEBAR --- */}
        {/* Di HP, sidebar ini akan kita kontrol lewat CSS berdasarkan class 'mobile-open' */}
        <div className="sidebar-container">
             <Sidebar />
             {/* Tombol Close khusus HP (Opsional, tapi membantu) */}
             <button 
                className="mobile-close-btn"
                onClick={() => setMobileSidebarOpen(false)}
             >
                <X size={20} />
             </button>
        </div>

        {/* --- OVERLAY (Layar hitam transparan saat sidebar buka di HP) --- */}
        {isMobileSidebarOpen && (
            <div 
                className="mobile-overlay"
                onClick={() => setMobileSidebarOpen(false)}
            ></div>
        )}
        
        <main className="main-content">
          <header className="topbar">
              {/* --- TOMBOL HAMBURGER (Hanya muncul di HP via CSS) --- */}
              <button 
                className="mobile-menu-btn"
                onClick={() => setMobileSidebarOpen(true)}
              >
                  <Menu size={24} color="#1F2937" />
              </button>

              <div style={{flex:1}}></div> {/* Spacer agar konten kanan mentok */}

              <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                  <Bell size={20} color="#6B7280" style={{cursor:'pointer'}} />
                  
                  {/* --- DROPDOWN ADMIN --- */}
                  <div style={{ position: 'relative' }}>
                      <button 
                        className="admin-btn" 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                          <span className="font-medium admin-name-text">ADMIN</span> 
                          <ChevronDown size={16} />
                      </button>

                      {isDropdownOpen && (
                          <div style={{
                              position: 'absolute',
                              top: '120%', right: 0,
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
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    width: '100%', padding: '8px 12px', border: 'none',
                                    background: 'transparent', color: '#DC2626',
                                    fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#FEF2F2'}
                                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                              >
                                  <LogOut size={16} /> Logout
                              </button>
                          </div>
                      )}
                      
                      {isDropdownOpen && (
                          <div 
                            style={{position: 'fixed', top:0, left:0, right:0, bottom:0, zIndex: 90}}
                            onClick={() => setIsDropdownOpen(false)}
                          ></div>
                      )}
                  </div>
              </div>
          </header>

          <div className="page-content">
              {children}
          </div>
        </main>
      </div>
    </div>
  );
}