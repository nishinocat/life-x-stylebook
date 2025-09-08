import React, { useMemo } from 'react';
import { Search } from 'lucide-react';
import { useProductStore } from '../../stores/useProductStore';

interface FilterSidebarNewProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  selectedSubcategories: string[];
  onSubcategoriesChange: (subcategories: string[]) => void;
  selectedManufacturers: string[];
  onManufacturersChange: (manufacturers: string[]) => void;
  filterType: 'all' | 'standard' | 'option';
  onFilterTypeChange: (type: 'all' | 'standard' | 'option') => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  catalogType: 'exterior' | 'interior' | 'water' | 'all';
}

export const FilterSidebarNew: React.FC<FilterSidebarNewProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  selectedSubcategories,
  onSubcategoriesChange,
  selectedManufacturers,
  onManufacturersChange,
  filterType,
  onFilterTypeChange,
  priceRange,
  onPriceRangeChange,
  catalogType,
}) => {
  const { exteriorProducts, interiorProducts, waterProducts } = useProductStore();
  
  // カタログタイプに応じた商品を取得
  const products = useMemo(() => {
    if (catalogType === 'all') {
      return [...exteriorProducts, ...interiorProducts, ...waterProducts];
    }
    switch (catalogType) {
      case 'exterior':
        return exteriorProducts;
      case 'interior':
        return interiorProducts;
      case 'water':
        return waterProducts;
      default:
        return [];
    }
  }, [catalogType, exteriorProducts, interiorProducts, waterProducts]);
  
  // カテゴリとサブカテゴリを集計
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    products.forEach(product => categorySet.add(product.categoryName));
    return Array.from(categorySet).sort();
  }, [products]);
  
  const subcategories = useMemo(() => {
    const subcategorySet = new Set<string>();
    products.forEach(product => {
      if (product.subcategory) subcategorySet.add(product.subcategory);
    });
    return Array.from(subcategorySet).sort();
  }, [products]);
  
  const manufacturers = useMemo(() => {
    const manufacturerSet = new Set<string>();
    products.forEach(product => manufacturerSet.add(product.manufacturer));
    return Array.from(manufacturerSet).sort();
  }, [products]);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      onSubcategoriesChange(selectedSubcategories.filter(s => s !== subcategory));
    } else {
      onSubcategoriesChange([...selectedSubcategories, subcategory]);
    }
  };

  const handleManufacturerToggle = (manufacturer: string) => {
    if (selectedManufacturers.includes(manufacturer)) {
      onManufacturersChange(selectedManufacturers.filter(m => m !== manufacturer));
    } else {
      onManufacturersChange([...selectedManufacturers, manufacturer]);
    }
  };

  const handleReset = () => {
    onSearchChange('');
    onCategoriesChange([]);
    onSubcategoriesChange([]);
    onManufacturersChange([]);
    onFilterTypeChange('all');
    onPriceRangeChange([0, 500000]);
  };

  return (
    <div className="p-4 space-y-6">
      {/* 検索 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="商品を検索..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* タイプフィルター */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">タイプ</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              checked={filterType === 'all'}
              onChange={() => onFilterTypeChange('all')}
              className="mr-2"
            />
            <span className="text-sm">すべて</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={filterType === 'standard'}
              onChange={() => onFilterTypeChange('standard')}
              className="mr-2"
            />
            <span className="text-sm">標準</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={filterType === 'option'}
              onChange={() => onFilterTypeChange('option')}
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
            onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>¥0</span>
            <span>¥{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* カテゴリフィルター */}
      {categories.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">カテゴリ</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
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

      {/* サブカテゴリフィルター */}
      {subcategories.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">サブカテゴリ</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {subcategories.map(subcategory => (
              <label key={subcategory} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(subcategory)}
                  onChange={() => handleSubcategoryToggle(subcategory)}
                  className="mr-2"
                />
                <span className="text-sm">{subcategory}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* メーカーフィルター */}
      {manufacturers.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">メーカー</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {manufacturers.map(manufacturer => (
              <label key={manufacturer} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedManufacturers.includes(manufacturer)}
                  onChange={() => handleManufacturerToggle(manufacturer)}
                  className="mr-2"
                />
                <span className="text-sm">{manufacturer}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* リセットボタン */}
      <button
        onClick={handleReset}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        フィルターをリセット
      </button>
    </div>
  );
};