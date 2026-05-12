import React, { useState } from 'react';
import { Search, Plus, X, AlertTriangle, Check } from 'lucide-react';

export const ProductsView = ({ products, setProducts, setToast }) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', criticalStockThreshold: '' });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category || "Diğer",
      price: newProduct.price.includes('₺') ? newProduct.price : `₺${newProduct.price}`,
      stock: parseInt(newProduct.stock) || 0,
      criticalStockThreshold: parseInt(newProduct.criticalStockThreshold) || 10,
    };
    setProducts([productToAdd, ...products]);
    setToast({ show: true, message: "Ürün başarıyla eklendi!", type: "success" });
    setIsModalOpen(false);
    setNewProduct({ name: '', category: '', price: '', stock: '', criticalStockThreshold: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#8B5E3C]">Stok & Ürünler</h1>
          <p className="text-[#2F2F2F]/70 mt-1 text-sm">{products.length} adet ürün listeleniyor.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B5E3C]/50" />
            <input type="text" placeholder="Ürün ara..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 border border-[#8B5E3C]/20 rounded-xl text-sm focus:ring-2 focus:ring-[#6B8E23]/50 outline-none w-full sm:w-64" />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#6B8E23] hover:bg-[#5a781d] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap">
            <Plus className="h-4 w-4" /> Yeni Ekle
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#2F2F2F]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-[#8B5E3C]/10 overflow-hidden animate-in zoom-in-95">
            <div className="p-4 border-b border-[#8B5E3C]/10 flex justify-between items-center bg-[#F6EFE3]/50">
              <h3 className="font-bold text-[#8B5E3C]">Yeni Ürün Ekle</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8B5E3C] hover:bg-white p-1 rounded-md transition-colors"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAddProduct} className="p-5 space-y-4">
              <div><label className="text-xs font-bold text-[#8B5E3C] uppercase mb-1 block">Ürün Adı *</label><input required value={newProduct.name} onChange={e=>setNewProduct({...newProduct, name: e.target.value})} className="w-full border border-[#8B5E3C]/20 rounded-xl px-3 py-2 outline-none focus:border-[#6B8E23] bg-[#F6EFE3]/30 text-sm" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-[#8B5E3C] uppercase mb-1 block">Kategori</label><input value={newProduct.category} onChange={e=>setNewProduct({...newProduct, category: e.target.value})} placeholder="Örn: Gıda" className="w-full border border-[#8B5E3C]/20 rounded-xl px-3 py-2 outline-none focus:border-[#6B8E23] bg-[#F6EFE3]/30 text-sm" /></div>
                <div><label className="text-xs font-bold text-[#8B5E3C] uppercase mb-1 block">Fiyat *</label><input required value={newProduct.price} onChange={e=>setNewProduct({...newProduct, price: e.target.value})} placeholder="Örn: 150" className="w-full border border-[#8B5E3C]/20 rounded-xl px-3 py-2 outline-none focus:border-[#6B8E23] bg-[#F6EFE3]/30 text-sm" /></div>
                <div><label className="text-xs font-bold text-[#8B5E3C] uppercase mb-1 block">Stok Adedi *</label><input required type="number" value={newProduct.stock} onChange={e=>setNewProduct({...newProduct, stock: e.target.value})} className="w-full border border-[#8B5E3C]/20 rounded-xl px-3 py-2 outline-none focus:border-[#6B8E23] bg-[#F6EFE3]/30 text-sm" /></div>
                <div><label className="text-xs font-bold text-[#8B5E3C] uppercase mb-1 block">Kritik Eşik</label><input type="number" placeholder="Örn: 10" value={newProduct.criticalStockThreshold} onChange={e=>setNewProduct({...newProduct, criticalStockThreshold: e.target.value})} className="w-full border border-[#8B5E3C]/20 rounded-xl px-3 py-2 outline-none focus:border-[#6B8E23] bg-[#F6EFE3]/30 text-sm" /></div>
              </div>
              <div className="pt-2 flex justify-end gap-3 border-t border-[#8B5E3C]/10 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-[#2F2F2F]/70 hover:bg-[#F6EFE3] rounded-xl transition-colors">İptal</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-[#8B5E3C] hover:bg-[#724a2e] text-white rounded-xl transition-colors shadow-sm">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#8B5E3C]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F6EFE3]/50 text-[#8B5E3C] uppercase font-medium text-xs">
              <tr><th className="px-6 py-4">Ürün</th><th className="px-6 py-4">Kategori</th><th className="px-6 py-4">Fiyat</th><th className="px-6 py-4">Stok Durumu</th><th className="px-6 py-4">Durum</th></tr>
            </thead>
            <tbody className="divide-y divide-[#8B5E3C]/5">
              {filtered.map(p => {
                const isCrit = p.stock <= p.criticalStockThreshold;
                const ratio = Math.min((p.stock / 50) * 100, 100);
                return (
                  <tr key={p.id} className={`${isCrit ? 'bg-[#C96F45]/5' : 'hover:bg-[#F6EFE3]/30'} transition-colors`}>
                    <td className="px-6 py-4 font-medium text-[#2F2F2F]">{p.name}</td>
                    <td className="px-6 py-4 text-[#2F2F2F]/70">{p.category}</td>
                    <td className="px-6 py-4 font-medium">{p.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 font-bold ${isCrit ? 'text-[#C96F45]' : 'text-[#2F2F2F]'}`}>{p.stock}</span>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${isCrit ? 'bg-[#C96F45]' : 'bg-[#6B8E23]'}`} style={{ width: `${ratio}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isCrit ? <span className="px-3 py-1 rounded-full text-[11px] font-bold border bg-[#C96F45]/10 text-[#C96F45] border-[#C96F45]/20 flex items-center gap-1 w-max"><AlertTriangle className="h-3 w-3"/> Kritik</span> : <span className="px-3 py-1 rounded-full text-[11px] font-bold border bg-[#6B8E23]/10 text-[#6B8E23] border-[#6B8E23]/20 flex items-center gap-1 w-max"><Check className="h-3 w-3"/> Yeterli</span>}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && <tr><td colSpan="5" className="text-center py-8 text-[#2F2F2F]/50">Ürün bulunamadı.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};