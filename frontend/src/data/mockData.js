export const initialProducts = [
  { id: 1, name: "Hakiki Nar Ekşisi (500ml)", category: "Gıda", stock: 45, criticalStockThreshold: 10, price: "₺180" },
  { id: 2, name: "Geleneksel Defne Sabunu", category: "Kozmetik", stock: 8, criticalStockThreshold: 15, price: "₺65" },
  { id: 3, name: "Kahvaltılık Zahter", category: "Gıda", stock: 32, criticalStockThreshold: 10, price: "₺120" },
  { id: 4, name: "Kurutulmuş Biber (1kg)", category: "Gıda", stock: 5, criticalStockThreshold: 20, price: "₺210" },
  { id: 5, name: "El İşlemesi Bez Çanta", category: "Tekstil", stock: 18, criticalStockThreshold: 5, price: "₺150" },
];

export const initialOrders = [
  { id: "SIP-1004", customer: "Elif Can", date: "Bugün 14:30", total: "₺450", status: "Hazırlanıyor" },
  { id: "SIP-1001", customer: "Ahmet Yılmaz", date: "Bugün 09:15", total: "₺850", status: "Hazırlanıyor" },
  { id: "SIP-1002", customer: "Ayşe Kaya", date: "Dün", total: "₺320", status: "Kargoya Verildi" },
  { id: "SIP-1003", customer: "Mehmet Demir", date: "3 Gün Önce", total: "₺1.200", status: "Gecikti" },
  { id: "SIP-1005", customer: "Zeynep Şahin", date: "Geçen Hafta", total: "₺180", status: "Teslim Edildi" },
];

export const mockNotifications = [
  { id: 1, text: "Kritik stok uyarısı: Kurutulmuş Biber", time: "10 dk önce", isRead: false },
  { id: 2, text: "Yeni sipariş: SIP-1004 (Elif Can)", time: "1 saat önce", isRead: false },
  { id: 3, text: "Haftalık özet raporu hazırlandı", time: "1 gün önce", isRead: true },
];