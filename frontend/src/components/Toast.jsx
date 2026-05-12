import React, { useEffect } from 'react';
import { Check, AlertCircle } from 'lucide-react';

export const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
  return (
    <div className={`fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-top-5 fade-in
      ${type === 'success' ? 'bg-[#eef2e6] border-[#6B8E23]/20 text-[#5a781d]' : 'bg-[#C96F45]/10 border-[#C96F45]/20 text-[#C96F45]'}`}>
      {type === 'success' ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};