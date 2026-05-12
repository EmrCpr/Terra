import React from 'react';
import { LayoutDashboard, ShoppingBag, Package, Wand2, Settings, Sparkles } from 'lucide-react';

export const Sidebar = ({ isOpen, activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: "Özet" },
    { id: 'orders', icon: <ShoppingBag className="h-5 w-5" />, label: "Siparişler" },
    { id: 'products', icon: <Package className="h-5 w-5" />, label: "Stok & Ürünler" },
    { id: 'ai-writer', icon: <Wand2 className="h-5 w-5" />, label: "İçerik Sihirbazı ✨" },
    { id: 'settings', icon: <Settings className="h-5 w-5" />, label: "Ayarlar" },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#8B5E3C]/10 transform transition-transform duration-300 ease-in-out pt-16 md:pt-0 md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="p-4 space-y-1.5 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${activeView === item.id ? "bg-[#6B8E23]/10 text-[#6B8E23] shadow-sm" : "text-[#2F2F2F]/70 hover:bg-[#F6EFE3] hover:text-[#8B5E3C]"}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#F6EFE3]/50 rounded-xl border border-[#8B5E3C]/10">
        <div className="flex items-center gap-2 text-[#8B5E3C] mb-1">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">MVP Sürümü</span>
        </div>
        <p className="text-xs text-[#2F2F2F]/60">Hackathon Demo v1.0</p>
      </div>
    </aside>
  );
};