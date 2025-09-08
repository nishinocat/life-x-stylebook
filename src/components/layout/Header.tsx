import React, { useState } from 'react';
import { ShoppingCart, User, Settings, Menu, X } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';
import { formatPrice } from '../../lib/utils';

interface HeaderProps {
  onCartClick: () => void;
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onCartClick, 
  isAdmin = false,
  onAdminClick
}) => {
  const { items, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* ロゴとメニューボタン */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">LIFE X</h1>
              <span className="hidden sm:block text-sm text-gray-500">カタログ</span>
            </div>
            
            {/* デスクトップ用プラン表示 */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-600 mr-2">プラン:</span>
              <div className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500 text-white">
                LACIE
              </div>
            </div>
            
            {/* 右側のアクション */}
            <div className="flex items-center gap-2">
              {/* カートボタン */}
              <button
                onClick={onCartClick}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs text-gray-500">合計</p>
                  <p className="text-sm font-bold text-gray-900">{formatPrice(totalPrice)}</p>
                </div>
              </button>
              
              {/* ユーザーメニュー */}
              <button className="hidden sm:block p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
        
        {/* 管理者ボタン */}
        {isAdmin && (
          <div className="px-4 sm:px-6 py-2 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-end">
              <button
                onClick={onAdminClick}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                <Settings className="w-3 h-3" />
                <span className="hidden sm:inline">アイテムのメンテナンス</span>
                <span className="sm:hidden">管理</span>
              </button>
            </div>
          </div>
        )}
        
        {/* モバイル用プラン表示 */}
        <div className="md:hidden px-4 py-2 bg-white border-t border-gray-100">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-600">プラン:</span>
            <div className="px-4 py-1 rounded-lg text-xs font-medium bg-red-500 text-white">
              LACIE
            </div>
          </div>
        </div>
      </header>
      
      {/* モバイルメニュー */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg">メニュー</h2>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {isAdmin && (
                  <li className="pt-4 border-t">
                    <button
                      onClick={() => {
                        if (onAdminClick) onAdminClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    >
                      アイテムのメンテナンス
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};