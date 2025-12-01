// src/components/admin/SalesChart.js
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function SalesChart({ data }) {
  // Jika data kosong, tampilkan pesan
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Belum ada data penjualan minggu ini
      </div>
    );
  }

  // Format tanggal agar lebih cantik (misal "2023-11-23" jadi "23 Nov")
  const formattedData = data.map(item => ({
    name: new Date(item._id).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    total: item.total
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={formattedData}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0F172A" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{fontSize: 12, fill: '#6B7280'}} 
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{fontSize: 12, fill: '#6B7280'}} 
          tickFormatter={(value) => `Rp${value/1000}k`} 
        />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
          formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}
        />
        <Area 
          type="monotone" 
          dataKey="total" 
          stroke="#0F172A" 
          strokeWidth={3} 
          fillOpacity={1} 
          fill="url(#colorTotal)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}