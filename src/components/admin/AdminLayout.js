// src/components/admin/AdminLayout.js
import Sidebar from './Sidebar';
import { Bell, ChevronDown } from 'lucide-react';

export default function AdminLayout({ children }) {
  return (
    // 👇 KITA TAMBAHKAN ID "admin-scope" DI SINI SEBAGAI PELINDUNG
    <div id="admin-scope"> 
      <div className="admin-wrapper">
        <Sidebar />
        
        <main className="main-content">
          <header className="topbar">
              <Bell size={20} color="#6B7280" style={{cursor:'pointer'}} />
              <button className="admin-btn">
                  <span className="font-medium">ADMIN</span> 
                  <ChevronDown size={16} />
              </button>
          </header>

          <div className="page-content">
              {children}
          </div>
        </main>
      </div>
    </div>
  );
}