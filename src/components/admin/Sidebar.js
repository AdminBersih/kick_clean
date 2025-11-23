// src/components/admin/Sidebar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, ShoppingBag, ClipboardList, ChevronDown } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  // Helper untuk mengecek URL aktif
  const isActive = (path) => router.pathname === path;

  return (
    <aside className="sidebar">
      <div className="brand">
         👟 KickClean
      </div>

      <nav className="menu-list">
        <Link href="/admin" className={`menu-item ${isActive('/admin') ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link href="/admin/products" className={`menu-item ${isActive('/admin/products') ? 'active' : ''}`}>
          <ShoppingBag size={20} />
          <span>All Products</span>
        </Link>

        <Link href="/admin/orders" className={`menu-item ${isActive('/admin/orders') ? 'active' : ''}`}>
          <ClipboardList size={20} />
          <span>Order List</span>
        </Link>

        <div className="menu-header">Categories</div>
        <div className="menu-item" style={{cursor: 'pointer', justifyContent: 'space-between'}}>
            <span>Shoes Cleaning</span>
            <ChevronDown size={16} />
        </div>
      </nav>
    </aside>
  );
}