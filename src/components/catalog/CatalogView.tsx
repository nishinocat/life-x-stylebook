import React, { useState, useMemo } from 'react';
import type { Product } from '../../types/product';
import type { FilterOptions } from '../../types/filter';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { ProductDetailModal } from './ProductDetailModal';
import { categories } from '../../data/mockData';
import { useProductStore } from '../../stores/useProductStore';
import { Search } from 'lucide-react';

interface CatalogViewProps {
  catalogType?: 'exterior' | 'interior' | 'water';
}

export const CatalogView: React.FC<CatalogViewProps> = ({ catalogType = 'interior' }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    subcategories: [],
    priceRange: { min: 0, max: 100000 },
    showStandard: true,
    showOption: true,
    searchQuery: '',
  });
  
  // ProductStoreから商品を取得
  const exteriorProducts = useProductStore((state) => state.exteriorProducts);
  const interiorProducts = useProductStore((state) => state.interiorProducts);
  const waterProducts = useProductStore((state) => state.waterProducts);
  
  // カタログタイプに応じて商品を選択
  const products = useMemo(() => {
    switch (catalogType) {
      case 'exterior':
        return exteriorProducts;
      case 'interior':
        return interiorProducts;
      case 'water':
        return waterProducts;
      default:
        return interiorProducts;
    }
  }, [catalogType, exteriorProducts, interiorProducts, waterProducts]);
  
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // カテゴリフィルター
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.categoryId)
      );
    }
    
    // サブカテゴリフィルター
    if (filters.subcategories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.subcategories.includes(product.subcategory)
      );
    }
    
    // 標準/オプションフィルター
    filtered = filtered.filter((product) => {
      if (product.isOption && !filters.showOption) return false;
      if (!product.isOption && !filters.showStandard) return false;
      return true;
    });
    
    // 検索フィルター
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.manufacturer.toLowerCase().includes(query) ||
        product.modelNumber?.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [filters, searchQuery, products]);
  
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const handleResetFilters = () => {
    setFilters({
      categories: [],
      subcategories: [],
      priceRange: { min: 0, max: 100000 },
      showStandard: true,
      showOption: true,
      searchQuery: '',
    });
    setSearchQuery('');
  };

  return (
    <div className="flex h-full">
      {/* サイドバー */}
      <div className="w-64 flex-shrink-0 p-6 border-r border-gray-200 overflow-y-auto">
        <FilterSidebar
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
        />
      </div>
      
      {/* メインコンテンツ */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* 検索バー */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="商品を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* 検索結果数 */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {filteredProducts.length}件の商品が見つかりました
          </p>
        </div>
        
        {/* 商品グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
            <button
              onClick={handleResetFilters}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </div>
      
      {/* 商品詳細モーダル */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
};