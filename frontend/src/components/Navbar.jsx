import React, { useState } from 'react';
import { Sprout, Bell, User, Menu, X } from 'lucide-react';
import { mockNotifications } from '../data/mockData';

export const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-[#8B5E3C]/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="p-2 -ml-2 text-[#8B5E3C] hover:bg-[#F6EFE3] rounded-lg md:hidden transition-colors">
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
         <div className="flex items-center gap-2 cursor-pointer group">
         <div className="group-hover:scale-105 transition-transform overflow-hidden rounded-full border-2 border-[#6B8E23]/20">
              <img 
               src="/logo.png" 
               alt="Terra Koop Logo" 
               className="h-12 w-12 object-cover" // Boyutu h-12 (48px) yaparak büyüttük
         />
        </div>
        <span className="font-bold text-xl tracking-tight text-[#8B5E3C]">Terra Koop</span>
        </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5 relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-[#2F2F2F] hover:bg-[#F6EFE3] rounded-full transition-colors">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#C96F45] border-2 border-white rounded-full"></span>}
          </button>

          {showNotifications && (
            <div className="absolute top-12 right-12 w-80 bg-white rounded-2xl shadow-xl border border-[#8B5E3C]/10 overflow-hidden z-50">
              <div className="p-4 border-b border-[#8B5E3C]/10 bg-[#F6EFE3]/50 flex justify-between items-center">
                <h3 className="font-bold text-[#8B5E3C]">Bildirimler</h3>
                <span className="text-xs bg-[#6B8E23]/20 text-[#6B8E23] px-2 py-1 rounded-full font-medium">{unreadCount} Yeni</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {mockNotifications.map(n => (
                  <div key={n.id} className={`p-4 border-b border-[#8B5E3C]/5 hover:bg-[#F6EFE3]/30 cursor-pointer ${!n.isRead ? 'bg-[#F6EFE3]/50' : ''}`}>
                    <p className={`text-sm ${!n.isRead ? 'font-semibold text-[#2F2F2F]' : 'text-[#2F2F2F]/70'}`}>{n.text}</p>
                    <p className="text-xs text-[#2F2F2F]/50 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 p-1 pl-3 pr-1 rounded-full bg-white border border-[#8B5E3C]/10 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <span className="text-sm font-medium text-[#2F2F2F] hidden sm:block">Betül</span>
            <div className="h-8 w-8 rounded-full bg-[#8B5E3C] text-[#F6EFE3] flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};