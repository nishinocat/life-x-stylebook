import React from 'react';
import type { Product } from '../../types/product';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../stores/useCartStore';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const selectedPlan = useCartStore((state) => state.selectedPlan);
  const price = product.pricing.find((p) => p.planId === selectedPlan)?.price || 0;
  const defaultVariant = product.variants[0];
  
  const imagePlaceholder = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="sans-serif" font-size="16">
        ${product.name}
      </text>
    </svg>
  `)))}`;

  return (
    <Card
      hoverable
      onClick={() => onSelect(product)}
      className="overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-12 bg-gray-100">
        <img
          src={defaultVariant?.imageUrl || imagePlaceholder}
          alt={product.name}
          className="w-full h-32 sm:h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = imagePlaceholder;
          }}
        />
      </div>
      
      <div className="p-2 sm:p-4">
        <div className="flex items-start justify-between mb-1 sm:mb-2">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 flex-1">
            {product.name}
          </h3>
          {product.isOption ? (
            <Badge variant="option" className="ml-1 sm:ml-2 flex-shrink-0 text-xs">
              オプション
            </Badge>
          ) : (
            <Badge variant="standard" className="ml-1 sm:ml-2 flex-shrink-0 text-xs">
              標準
            </Badge>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">{product.manufacturer}</p>
        
        {product.modelNumber && (
          <p className="text-xs text-gray-400 mb-1 sm:mb-2 hidden sm:block">{product.modelNumber}</p>
        )}
        
        <div className="flex items-baseline justify-between mt-2 sm:mt-3">
          <span className="text-sm sm:text-lg font-bold text-gray-900">
            {price === 0 ? '標準仕様' : formatPrice(price)}
          </span>
          {price > 0 && (
            <span className="text-xs text-gray-500">
              {product.unit === '㎡' ? '/ ㎡' : product.unit === '個' ? '/ 個' : ''}
            </span>
          )}
        </div>
        
        {product.variants.length > 1 && (
          <div className="flex gap-1 mt-3">
            {product.variants.slice(0, 5).map((variant) => (
              <div
                key={variant.id}
                className="w-6 h-6 rounded-full border-2 border-gray-300"
                style={{ 
                  backgroundColor: variant.colorCode || '#e5e7eb',
                }}
                title={variant.color}
              />
            ))}
            {product.variants.length > 5 && (
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-600">+{product.variants.length - 5}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};