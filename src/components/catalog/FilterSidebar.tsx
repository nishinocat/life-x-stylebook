import React from 'react';
import type { Category } from '../../types/product';
import type { FilterOptions } from '../../types/filter';
import { Button } from '../common/Button';

interface FilterSidebarProps {
  categories: Category[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  filters,
  onFilterChange,
  onReset,
}) => {
  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];
    
    onFilterChange({
      ...filters,
      categories: newCategories,
    });
  };
  
  const subcategoryOptions = [
    'フローリング',
    'タイル',
    'カーペット',
    'クロス',
    '塗装',
    '照明',
  ];

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">フィルター</h2>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          リセット
        </button>
      </div>
      
      <div className="space-y-6">
        {/* プラン選択 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">選択中のプラン</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              LACIE
            </Button>
            <Button variant="secondary" size="sm" className="flex-1">
              HOURS
            </Button>
          </div>
        </div>
        
        {/* カテゴリフィルター */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">大項目</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* サブカテゴリフィルター */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">素材</h3>
          <div className="space-y-2">
            {subcategoryOptions.map((subcategory) => (
              <label
                key={subcategory}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={filters.subcategories.includes(subcategory)}
                  onChange={() => {
                    const newSubcategories = filters.subcategories.includes(subcategory)
                      ? filters.subcategories.filter((s) => s !== subcategory)
                      : [...filters.subcategories, subcategory];
                    onFilterChange({
                      ...filters,
                      subcategories: newSubcategories,
                    });
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{subcategory}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* 標準/オプション */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">仕様</h3>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.showStandard}
                onChange={() =>
                  onFilterChange({
                    ...filters,
                    showStandard: !filters.showStandard,
                  })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">標準仕様</span>
            </label>
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.showOption}
                onChange={() =>
                  onFilterChange({
                    ...filters,
                    showOption: !filters.showOption,
                  })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">オプション</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};