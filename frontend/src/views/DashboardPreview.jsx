import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, AlertTriangle, Clock, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import { callGeminiAPI } from '../services/api';

export const DashboardPreview = ({ setActiveView, products, orders }) => {
  const [insight, setInsight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    callGeminiAPI("Deprem bölgesindeki kadın kooperatifi yöneticisi Betül'e 2 cümlelik, motive edici e-ticaret operasyon veya pazarlama önerisi ver. Selamlama yapma, doğrudan öneriye gir.")
      .then(setInsight).catch(() => setInsight("Siparişleriniz düzenli artıyor! Bugün sosyal medyada üretim sürecinden bir hikaye paylaşarak bu ilgiyi satışa çevirebilirsiniz.")).finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#8B5E3C]">Hoş Geldin, Betül 🌿</h1>
          <p className="text-[#2F2F2F]/70 mt-1 text-sm">İşte kooperatifinin bugünkü durumu.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[ 
          { label: "Toplam Ürün", val: products.length, icon: Package, color: "text-[#8B5E3C]", link: "products" },
          { label: "Bekleyen Sipariş", val: orders.filter(o=>o.status==="Hazırlanıyor").length, icon: ShoppingBag, color: "text-[#6B8E23]", link: "orders" },
          { label: "Kritik Stok", val: products.filter(p=>p.stock <= p.criticalStockThreshold).length, icon: AlertTriangle, color: "text-[#C96F45]", link: "products", bg: "bg-[#C96F45]/5", border: "border-[#C96F45]/20" },
          { label: "Geciken", val: orders.filter(o=>o.status==="Gecikti").length, icon: Clock, color: "text-[#C96F45]", link: "orders" }
        ].map((stat, i) => (
          <div key={i} onClick={() => setActiveView(stat.link)} className={`p-5 rounded-2xl shadow-sm border ${stat.border || 'border-[#8B5E3C]/10'} ${stat.bg || 'bg-white'} flex flex-col justify-center cursor-pointer hover:shadow-md transition-shadow group`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-sm font-medium ${stat.color === 'text-[#C96F45]' ? 'text-[#C96F45]' : 'text-[#2F2F2F]/60'}`}>{stat.label}</p>
              <stat.icon className={`h-5 w-5 ${stat.color} group-hover:scale-110 transition-transform`} />
            </div>
            <p className={`text-2xl font-bold ${stat.color === 'text-[#C96F45]' ? 'text-[#C96F45]' : 'text-[#2F2F2F]'}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-white to-[#F6EFE3] p-6 rounded-2xl shadow-sm border border-[#6B8E23]/30 relative overflow-hidden">
        <Sparkles className="absolute top-0 right-0 p-4 opacity-5 h-32 w-32 text-[#6B8E23] pointer-events-none" />
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#6B8E23]/10 p-1.5 rounded-lg"><Sparkles className="h-5 w-5 text-[#6B8E23]" /></div>
              <h2 className="text-lg font-bold text-[#8B5E3C]">Terra Öneriyor</h2>
            </div>
            <div className="min-h-[60px] flex items-center">
              {isLoading ? <div className="flex gap-2 items-center text-sm text-[#2F2F2F]/60"><Loader2 className="h-4 w-4 animate-spin text-[#6B8E23]"/> Analiz ediliyor...</div> : <p className="text-[#2F2F2F] text-sm leading-relaxed font-medium italic">"{insight}"</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#8B5E3C]/10 overflow-hidden">
        <div className="p-5 border-b border-[#8B5E3C]/10 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#8B5E3C]">Son Siparişler</h2>
          <button onClick={() => setActiveView('orders')} className="text-sm text-[#6B8E23] font-medium flex items-center gap-1 hover:underline">Tümü <ChevronRight className="h-4 w-4"/></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#2F2F2F]">
            <thead className="bg-[#F6EFE3]/50 text-[#8B5E3C] uppercase font-medium text-xs">
              <tr><th className="px-6 py-4">Sipariş No</th><th className="px-6 py-4">Müşteri</th><th className="px-6 py-4">Tutar</th><th className="px-6 py-4 text-right">Durum</th></tr>
            </thead>
            <tbody className="divide-y divide-[#8B5E3C]/5">
              {orders.slice(0, 3).map((o, i) => (
                <tr key={i} className="hover:bg-[#F6EFE3]/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#8B5E3C]">{o.id}</td>
                  <td className="px-6 py-4">{o.customer}</td>
                  <td className="px-6 py-4 font-medium">{o.total}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border inline-block ${o.status === 'Hazırlanıyor' ? 'bg-orange-50 text-orange-600 border-orange-200' : o.status === 'Kargoya Verildi' ? 'bg-[#6B8E23]/10 text-[#6B8E23] border-[#6B8E23]/20' : 'bg-[#C96F45]/10 text-[#C96F45] border-[#C96F45]/20'}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};