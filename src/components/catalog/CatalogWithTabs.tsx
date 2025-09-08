import React, { useState, useMemo } from 'react';
import { useProductStore } from '../../stores/useProductStore';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { Search } from 'lucide-react';
import type { Product } from '../../types/product';

export const CatalogWithTabs: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'exterior' | 'interior' | 'water'>('exterior');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'standard' | 'option'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const { exteriorProducts, interiorProducts, waterProducts } = useProductStore();

  // タブに応じた商品を取得
  const currentProducts = useMemo(() => {
    switch (activeTab) {
      case 'exterior':
        return exteriorProducts;
      case 'interior':
        return interiorProducts;
      case 'water':
        return waterProducts;
      default:
        return [];
    }
  }, [activeTab, exteriorProducts, interiorProducts, waterProducts]);

  // カテゴリ一覧を取得
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    currentProducts.forEach(product => categorySet.add(product.categoryName));
    return Array.from(categorySet).sort();
  }, [currentProducts]);

  // フィルタリングされた商品
  const filteredProducts = useMemo(() => {
    return currentProducts.filter(product => {
      // 検索フィルター
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // カテゴリフィルター
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.categoryName)) {
        return false;
      }

      // タイプフィルター
      if (filterType === 'standard' && product.isOption) return false;
      if (filterType === 'option' && !product.isOption) return false;

      // 価格フィルター
      const price = product.pricing.find(p => p.planId === 'LACIE')?.price || 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;

      return true;
    });
  }, [currentProducts, searchTerm, selectedCategories, filterType, priceRange]);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setFilterType('all');
    setPriceRange([0, 500000]);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="flex h-full">
      {/* 左側のフィルターサイドバー */}
      <div className="hidden lg:block w-64 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* 検索 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="商品を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* カテゴリフィルター */}
          {categories.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">カテゴリ</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="mr-2"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* タイプフィルター */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">タイプ</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={filterType === 'all'}
                  onChange={() => setFilterType('all')}
                  className="mr-2"
                />
                <span className="text-sm">すべて</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={filterType === 'standard'}
                  onChange={() => setFilterType('standard')}
                  className="mr-2"
                />
                <span className="text-sm">標準</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={filterType === 'option'}
                  onChange={() => setFilterType('option')}
                  className="mr-2"
                />
                <span className="text-sm">オプション</span>
              </label>
            </div>
          </div>

          {/* 価格範囲 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">価格範囲</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>¥0</span>
                <span>¥{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* リセットボタン */}
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            フィルターをリセット
          </button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 overflow-y-auto">
        {/* タブナビゲーション */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('exterior')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'exterior'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                エクステリア
              </button>
              <button
                onClick={() => setActiveTab('interior')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'interior'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                インテリア
              </button>
              <button
                onClick={() => setActiveTab('water')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'water'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                水廻り
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* モバイル用検索 */}
          <div className="lg:hidden mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="商品を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 商品グリッド */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleProductSelect}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">該当する商品が見つかりませんでした</p>
            </div>
          )}
        </div>
      </div>

      {/* 商品詳細モーダル */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};