import React, { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';

export const OrdersView = ({ orders }) => {
  const [filter, setFilter] = useState('Tümü');
  const [search, setSearch] = useState('');
  
  const filtered = orders.filter(o => 
    (filter === 'Tümü' || o.status === filter) && 
    (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#8B5E3C]">Siparişler</h1>
          <p className="text-[#2F2F2F]/70 mt-1 text-sm">Operasyonlarını buradan takip et.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B5E3C]/50" />
            <input type="text" placeholder="Sipariş no veya müşteri..." value={search} onChange={e=>setSearch(e.target.value)} className="pl-9 pr-4 py-2 border border-[#8B5E3C]/20 rounded-xl text-sm focus:ring-2 focus:ring-[#6B8E23]/50 outline-none w-full sm:w-64" />
          </div>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['Tümü', 'Hazırlanıyor', 'Kargoya Verildi', 'Gecikti', 'Teslim Edildi'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors border ${filter === f ? 'bg-[#8B5E3C] text-white border-[#8B5E3C]' : 'bg-white text-[#2F2F2F]/70 border-[#8B5E3C]/20 hover:bg-[#F6EFE3]'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#8B5E3C]/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F6EFE3]/50 text-[#8B5E3C] uppercase font-medium text-xs">
            <tr><th className="px-6 py-4">Sipariş No</th><th className="px-6 py-4">Müşteri</th><th className="px-6 py-4">Tarih</th><th className="px-6 py-4">Tutar</th><th className="px-6 py-4">Durum</th><th className="px-6 py-4">İşlem</th></tr>
          </thead>
          <tbody className="divide-y divide-[#8B5E3C]/5">
            {filtered.map((o, i) => (
              <tr key={i} className="hover:bg-[#F6EFE3]/30 transition-colors">
                <td className="px-6 py-4 font-bold text-[#8B5E3C]">{o.id}</td>
                <td className="px-6 py-4 font-medium">{o.customer}</td>
                <td className="px-6 py-4 text-[#2F2F2F]/70">{o.date}</td>
                <td className="px-6 py-4 font-medium">{o.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase border inline-block
                    ${o.status === 'Hazırlanıyor' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                      o.status === 'Kargoya Verildi' ? 'bg-[#6B8E23]/10 text-[#6B8E23] border-[#6B8E23]/20' : 
                      o.status === 'Teslim Edildi' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                      'bg-[#C96F45]/10 text-[#C96F45] border-[#C96F45]/20'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-[#8B5E3C]/10 text-[#8B5E3C] rounded-lg transition-colors"><ArrowUpRight className="h-4 w-4"/></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="6" className="text-center py-8 text-[#2F2F2F]/50">Sipariş bulunamadı.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};