import React from 'react';
import { ShoppingCart, User, Home, Droplets, Trees, Settings } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';
import { formatPrice } from '../../lib/utils';

interface HeaderProps {
  onCartClick: () => void;
  activeTab: 'exterior' | 'interior' | 'water';
  onTabChange: (tab: 'exterior' | 'interior' | 'water') => void;
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onCartClick, 
  activeTab, 
  onTabChange,
  isAdmin = false,
  onAdminClick 
}) => {
  const { items, getTotalPrice, selectedPlan, setSelectedPlan } = useCartStore();
  const totalPrice = getTotalPrice();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-900">LIFE X</h1>
            <span className="text-sm text-gray-500">インテリアカタログ</span>
          </div>
          
          {/* プラン選択 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">プラン選択:</span>
            <button
              onClick={() => setSelectedPlan('LACIE')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPlan === 'LACIE'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              LACIE
            </button>
            <button
              onClick={() => setSelectedPlan('HOURS')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPlan === 'HOURS'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              HOURS
            </button>
          </div>
          
          {/* 右側のアクション */}
          <div className="flex items-center gap-4">
            {/* カート情報 */}
            <button
              onClick={onCartClick}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">合計金額</p>
                <p className="text-sm font-bold text-gray-900">{formatPrice(totalPrice)}</p>
              </div>
            </button>
            
            {/* ユーザーメニュー */}
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      
      {/* カタログタブナビゲーション */}
      <nav className="px-6 py-2 bg-gray-50">
        <div className="flex items-center justify-between">
          <ul className="flex gap-2">
            <li>
              <button
                onClick={() => onTabChange('exterior')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'exterior'
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Trees className="w-4 h-4" />
                エクステリア
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange('interior')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'interior'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Home className="w-4 h-4" />
                インテリア
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange('water')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'water'
                    ? 'bg-cyan-500 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Droplets className="w-4 h-4" />
                水廻り
              </button>
            </li>
          </ul>
          
          {/* 管理者ボタン */}
          {isAdmin && (
            <button
              onClick={onAdminClick}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              <Settings className="w-3 h-3" />
              メンテナンス
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};