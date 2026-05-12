import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, MessageCircle } from 'lucide-react';

export const AiChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Merhaba Betül! Operasyonlarla veya ürünlerle ilgili sana nasıl yardımcı olabilirim?", sender: "ai" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userText = inputValue;
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: "user" }]);
    setInputValue(""); setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/ai/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userText })
      });
      if (!response.ok) throw new Error("API Hatası");
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, text: data.reply, sender: "ai" }]);
    } catch (error) {
      setTimeout(() => {
        const mockReply = "Bağlantı kurulana kadar offline moddayım. Son verilere göre 'Defne Sabunu' stoğumuz kritik seviyede (8 adet kaldı).";
        setMessages(prev => [...prev, { id: Date.now() + 1, text: mockReply, sender: "ai" }]);
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-[340px] sm:w-[380px] rounded-2xl shadow-2xl border border-[#8B5E3C]/10 mb-4 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-4">
          <div className="bg-gradient-to-r from-[#8B5E3C] to-[#724a2e] text-[#F6EFE3] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg"><Sparkles className="h-5 w-5 text-white" /></div>
              <div>
                <h3 className="font-bold text-sm">Terra AI</h3>
                <p className="text-[10px] text-white/70">Sisteme Bağlı • Çevrimiçi</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-xl transition-colors"><X className="h-5 w-5" /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-[#F6EFE3]/30 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-[#8B5E3C] text-white rounded-tr-sm' : 'bg-white text-[#2F2F2F] border border-[#8B5E3C]/10 rounded-tl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#8B5E3C]/10 max-w-[80%] p-3.5 rounded-2xl rounded-tl-sm text-sm flex items-center gap-2 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#6B8E23] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-[#6B8E23] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[#6B8E23] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-white border-t border-[#8B5E3C]/10">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Buraya yazın..." className="flex-1 bg-[#F6EFE3]/50 border border-[#8B5E3C]/20 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#6B8E23]/50 text-sm text-[#2F2F2F] placeholder-[#2F2F2F]/40" />
              <button type="submit" disabled={!inputValue.trim() || isLoading} className="bg-[#6B8E23] text-white p-2.5 rounded-xl hover:bg-[#5a781d] disabled:opacity-50 transition-colors shadow-sm"><Send className="h-5 w-5" /></button>
            </form>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-[#8B5E3C] text-white p-4 rounded-full shadow-xl hover:bg-[#724a2e] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center relative group">
        {!isOpen && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6B8E23] opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-[#6B8E23]"></span></span>}
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};