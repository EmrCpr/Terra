import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, AlertTriangle, Clock, Sparkles, Loader2, ChevronRight, MessageSquareWarning } from 'lucide-react';
import { askAI } from '../services/api';

const Sparkline = ({ color }) => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <path d="M0 15 Q 10 5, 20 10 T 40 5 T 60 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CircularProgress = ({ value, total, color }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-10 h-10">
        <circle cx="20" cy="20" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200" />
        <circle cx="20" cy="20" r={radius} stroke={color} strokeWidth="4" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" />
      </svg>
      <span className="absolute text-[10px] font-bold" style={{ color }}>{value}</span>
    </div>
  );
};

export const DashboardPreview = ({ setActiveView, products, orders }) => {
  const [insight, setInsight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadInsight = async () => {
      setIsLoading(true);
      try {
        const prompt = "Deprem bölgesindeki kadın kooperatifi yöneticisine 2 cümlelik, motive edici e-ticaret operasyon önerisi ver.";
        const response = await askAI(prompt);
        setInsight(response?.answer || "Siparişleriniz düzenli artıyor! Bugün sosyal medyada üretim sürecinden bir hikaye paylaşabilirsiniz.");
      } catch (error) {
        setInsight("Siparişleriniz düzenli artıyor! Bugün sosyal medyada üretim sürecinden bir hikaye paylaşabilirsiniz.");
      } finally {
        setIsLoading(false);
      }
    };
    loadInsight();
  }, []);

  const pendingOrders = orders.filter(o => o.status === "Hazırlanıyor" || o.status === "pending").length;
  const criticalProducts = products.filter(p => p.stock <= p.criticalStockThreshold).length;
  const delayedOrders = orders.filter(o => o.status === "Gecikti" || o.status === "delayed").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <h1 className="text-2xl font-bold text-[#8B5E3C]">Hoş Geldin, Betül 🌿</h1>
          <p className="text-[#2F2F2F]/70 mt-1 text-sm">İşte kooperatifinin bugünkü durumu.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
        <div onClick={() => setActiveView('products')} className="bg-white p-5 rounded-2xl border border-[#8B5E3C]/10 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-[#2F2F2F]/50 uppercase tracking-wider">Toplam Ürün</p>
              <p className="text-3xl font-extrabold text-[#2F2F2F] mt-1">{products.length}</p>
            </div>
            <div className="p-2 bg-[#8B5E3C]/5 rounded-xl group-hover:bg-[#8B5E3C]/10 transition-colors"><Package className="h-6 w-6 text-[#8B5E3C]" /></div>
          </div>
          <div className="mt-auto flex items-end justify-between">
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">+2 Yeni (Bu hafta)</span>
            <Sparkline color="#8B5E3C" />
          </div>
        </div>

        <div onClick={() => setActiveView('orders')} className="bg-white p-5 rounded-2xl border border-[#8B5E3C]/10 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] shadow-sm">
           <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-[#2F2F2F]/50 uppercase tracking-wider">Bekleyen Sipariş</p>
              <p className="text-3xl font-extrabold text-[#2F2F2F] mt-1">{pendingOrders}</p>
            </div>
            <div className="p-2 bg-[#6B8E23]/5 rounded-xl group-hover:bg-[#6B8E23]/10 transition-colors"><ShoppingBag className="h-6 w-6 text-[#6B8E23]" /></div>
          </div>
           <div className="mt-auto flex items-center justify-between">
            <span className="text-xs font-medium text-[#2F2F2F]/50">Tamamlanma:</span>
            <CircularProgress value={orders.length - pendingOrders} total={orders.length} color="#6B8E23" />
          </div>
        </div>

        <div onClick={() => setActiveView('products')} className="bg-gradient-to-br from-[#fff7ed] to-[#fff1f2] p-5 rounded-2xl border border-orange-200 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(234,88,12,0.15)] shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity"><AlertTriangle className="w-32 h-32 text-orange-600" /></div>
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <p className="text-sm font-bold text-orange-700 uppercase tracking-wider">Kritik Stok</p>
              <p className="text-3xl font-extrabold text-orange-600 mt-1">{criticalProducts}</p>
            </div>
            <div className="p-2 bg-white/60 rounded-xl backdrop-blur-sm shadow-sm"><AlertTriangle className="h-6 w-6 text-orange-500 animate-pulse" /></div>
          </div>
           <div className="mt-auto relative z-10">
            <span className="text-xs font-semibold text-orange-800 bg-orange-100/80 px-2 py-1 rounded-md inline-flex items-center gap-1 backdrop-blur-sm">
               Hemen Tedarik Et <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        <div onClick={() => setActiveView('orders')} className="bg-white p-5 rounded-2xl border border-red-100 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-[#2F2F2F]/50 uppercase tracking-wider">Geciken</p>
              <p className="text-3xl font-extrabold text-red-600 mt-1">{delayedOrders}</p>
            </div>
            <div className="p-2 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors"><Clock className="h-6 w-6 text-red-500" /></div>
          </div>
           <div className="mt-auto">
             {delayedOrders > 0 ? (
               <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-md flex items-center gap-1 w-max"><MessageSquareWarning className="w-3 h-3" /> Müşterilere Bilgi Ver</span>
             ) : (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Tüm siparişler zamanında</span>
             )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-white to-[#F6EFE3] p-6 rounded-2xl shadow-sm border border-[#6B8E23]/30 relative overflow-hidden z-10">
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

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-[#8B5E3C]/10 overflow-hidden relative z-10">
        <div className="p-5 border-b border-[#8B5E3C]/5 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-[#2F2F2F]">Son Siparişler</h2>
          <button onClick={() => setActiveView('orders')} className="text-sm text-[#6B8E23] font-semibold flex items-center gap-1 hover:text-[#5a781d] transition-colors group">
            Tümü <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#2F2F2F]">
            <thead className="bg-white text-[#2F2F2F]/50 uppercase font-bold text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Sipariş No</th>
                <th className="px-6 py-4">Müşteri</th>
                <th className="px-6 py-4">Tutar</th>
                <th className="px-6 py-4 text-right">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.slice(0, 4).map((o, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-[#2F2F2F]">{o.id.toString().includes('SIP') ? o.id : `SIP-${o.id}`}</td>
                  <td className="px-6 py-4 font-medium text-gray-600">{o.customer_name || o.customer}</td>
                  <td className="px-6 py-4 font-semibold text-[#8B5E3C]">{o.total_price ? `₺${o.total_price}` : o.total || '₺0'}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border inline-block ${(o.status === 'Hazırlanıyor' || o.status === 'pending') ? 'bg-orange-50 text-orange-600 border-orange-200/50 shadow-sm' : (o.status === 'Kargoya Verildi' || o.status === 'shipped') ? 'bg-emerald-50 text-emerald-600 border-emerald-200/50 shadow-sm' : 'bg-red-50 text-red-600 border-red-200/50 shadow-sm'}`}>
                      {o.status === 'pending' ? 'HAZIRLANIYOR' : o.status === 'shipped' ? 'KARGODA' : o.status === 'delayed' ? 'GECİKTİ' : o.status}
                    </span>
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