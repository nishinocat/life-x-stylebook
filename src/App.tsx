import { useState } from 'react';
import { Header } from './components/layout/Header';
import { CatalogWithTabs } from './components/catalog/CatalogWithTabs';
import { CartSidebar } from './components/cart/CartSidebar';
import { ConfirmOrderModal } from './components/catalog/ConfirmOrderModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useVersionStore } from './stores/useVersionStore';
import { useCartStore } from './stores/useCartStore';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdmin] = useState(true); // デモ用に管理者モードを有効化
  
  const currentVersion = useVersionStore((state) => state.currentVersion);
  const items = useCartStore((state) => state.items);
  
  const handleCartClose = () => {
    setIsCartOpen(false);
    if (items.length > 0) {
      setIsConfirmModalOpen(true);
    }
  };

  if (showAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
        onAdminClick={() => setShowAdmin(true)}
      />
      
      <main className="flex-1 overflow-hidden">
        <CatalogWithTabs />
      </main>
      
      {/* バージョン表示 */}
      <div className="fixed bottom-4 left-4 bg-white px-3 py-1 rounded-lg shadow-md text-xs text-gray-600">
        Ver. {currentVersion}
      </div>
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={handleCartClose}
      />
      
      <ConfirmOrderModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
}

export default App;
