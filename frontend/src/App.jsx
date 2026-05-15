import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { getProducts, getOrders } from './services/api';
import { Toast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AiChatWidget } from './components/AiChatWidget';
import { DashboardPreview } from './views/DashboardPreview';
import { ProductsView } from './views/ProductsView';
import { OrdersView } from './views/OrdersView';
import { AiProductWriter } from './views/AiProductWriter';

const statusMap = {
  pending: 'Hazırlanıyor',
  shipped: 'Kargoya Verildi',
  delayed: 'Gecikti',
  delivered: 'Teslim Edildi',
};

const formatOrderDate = (dateString) => {
  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? dateString : date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
};

const mapProducts = (products) => products.map((product) => ({
  id: product.id,
  name: product.name,
  category: product.category,
  stock: product.stock,
  criticalStockThreshold: product.criticalStockThreshold,
  price: `₺${product.price}`,
}));

const mapOrders = (orders) => orders.map((order) => ({
  id: order.order_no,
  customer: order.customer_name,
  date: formatOrderDate(order.order_date),
  total: `₺${order.total_price}`,
  status: statusMap[order.status] || order.status,
}));

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, orderData] = await Promise.all([getProducts(), getOrders()]);
        setProducts(mapProducts(productData));
        setOrders(mapOrders(orderData));
      } catch (error) {
        console.error('Veri yüklenirken hata oluştu:', error);
      }
    };

    loadData();
  }, []);

  const renderView = () => {
    switch(activeView) {
      case 'dashboard': return <DashboardPreview setActiveView={setActiveView} products={products} orders={orders} />;
      case 'products': return <ProductsView products={products} setProducts={setProducts} setToast={setToast} />;
      case 'orders': return <OrdersView orders={orders} />;
      case 'ai-writer': return <AiProductWriter setToast={setToast} />;
      case 'settings': return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-[#8B5E3C] animate-in fade-in">
          <Settings className="h-16 w-16 mb-4 opacity-50" />
          <h2 className="text-xl font-bold">Ayarlar</h2>
          <p className="opacity-70 mt-2 text-sm">Bu sayfa MVP sonrasında eklenecektir.</p>
        </div>
      );
      default: return <DashboardPreview setActiveView={setActiveView} products={products} orders={orders} />;
    }
  };

  return (
    <div className="min-h-screen zeytin-deseni text-[#2F2F2F] font-sans selection:bg-[#6B8E23]/20 relative overflow-x-hidden">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({show: false, message:"", type:""})} />}
      
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      
      <div className="max-w-7xl mx-auto flex relative">
        <Sidebar isOpen={isSidebarOpen} activeView={activeView} setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full pb-28 min-h-[calc(100vh-4rem)]">
          {renderView()}
        </main>
        {isSidebarOpen && <div className="fixed inset-0 bg-[#2F2F2F]/30 backdrop-blur-sm z-20 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
      </div>

      <AiChatWidget />
    </div>
  );
}