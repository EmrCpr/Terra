import React, { useState } from 'react';
import { Wand2, Sparkles, Loader2, Copy } from 'lucide-react';
import { callGeminiAPI } from '../services/api';

export const AiProductWriter = ({ setToast }) => {
  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState("");
  const [story, setStory] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateDescription = async (e) => {
    e.preventDefault(); if (!productName) return;
    setIsLoading(true); setGeneratedText("");
    try {
      const prompt = `Sen empatik bir e-ticaret yazarısın. Deprem bölgesindeki kadın kooperatifi tarafından üretilen şu ürün için doğal, samimi bir ürün açıklaması yaz (Kısa olsun): Ürün: ${productName}. Özellikler: ${features}. Hikaye: ${story}.`;
      const result = await callGeminiAPI(prompt);
      setGeneratedText(result);
      setToast({ show: true, message: "Açıklama başarıyla oluşturuldu!", type: "success" });
    } catch (err) {
      setToast({ show: true, message: "Bir hata oluştu.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText).catch(() => document.execCommand('copy'));
    setToast({ show: true, message: "Metin kopyalandı!", type: "success" });
  };

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-300">
      <header>
        <h1 className="text-2xl font-bold text-[#8B5E3C] flex items-center gap-2"><Wand2 className="h-6 w-6 text-[#6B8E23]" /> İçerik Sihirbazı</h1>
        <p className="text-[#2F2F2F]/70 mt-1 text-sm">Ürünlerinizin hikayesini yapay zeka ile müşterilerinize ulaştırın.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={generateDescription} className="bg-white p-6 rounded-2xl shadow-sm border border-[#8B5E3C]/10 space-y-4">
          <div><label className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wide mb-1 block">Ürün Adı *</label><input required value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full border border-[#8B5E3C]/20 rounded-xl px-4 py-2.5 outline-none focus:border-[#6B8E23] bg-[#F6EFE3]/30 text-sm" /></div>
          <div><label className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wide mb-1 block">Özellikler</label><input value={features} onChange={(e) => setFeatures(e.target.value)} className="w-full border border-[#8B5E3C]/20 rounded-xl px-4 py-2.5 outline-none focus:border-[#6B8E23] bg-[#F6EFE3]/30 text-sm" /></div>
          <div><label className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wide mb-1 block">Hikayesi</label><textarea rows="3" value={story} onChange={(e) => setStory(e.target.value)} className="w-full border border-[#8B5E3C]/20 rounded-xl px-4 py-2.5 outline-none focus:border-[#6B8E23] bg-[#F6EFE3]/30 resize-none text-sm" /></div>
          <button type="submit" disabled={isLoading || !productName} className="w-full bg-[#8B5E3C] hover:bg-[#724a2e] text-white px-4 py-3 rounded-xl font-medium flex justify-center items-center gap-2 transition-all shadow-sm disabled:opacity-50 mt-2">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />} {isLoading ? "Sihir Yapılıyor..." : "Büyülü Metni Oluştur"}
          </button>
        </form>
        <div className="bg-gradient-to-br from-white to-[#F6EFE3]/50 p-6 rounded-2xl shadow-sm border border-[#8B5E3C]/10 flex flex-col min-h-[350px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#8B5E3C] text-sm uppercase tracking-wide">Sonuç</h3>
            {generatedText && <button type="button" onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-bold text-[#6B8E23] hover:bg-[#6B8E23]/10 px-3 py-1.5 rounded-lg transition-colors uppercase"><Copy className="h-3 w-3"/> Kopyala</button>}
          </div>
          <div className="flex-1 relative border border-dashed border-[#8B5E3C]/20 rounded-xl p-4 bg-white/50">
            {isLoading ? <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8B5E3C]/50 gap-2"><Wand2 className="h-8 w-8 animate-bounce text-[#6B8E23]" /><p className="text-sm font-medium">Yazılıyor...</p></div> : generatedText ? <textarea readOnly value={generatedText} className="w-full h-full outline-none text-[#2F2F2F] bg-transparent resize-none text-sm leading-relaxed" /> : <div className="h-full flex items-center justify-center text-[#8B5E3C]/40 text-sm text-center">Sol taraftan bilgileri doldurup üret butonuna basın.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};