import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product, ProductVariant } from '../../types/product';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../stores/useCartStore';
import { cn } from '../../lib/utils';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCartStore();
  
  if (!product) return null;
  
  const variant = selectedVariant || product.variants[0];
  const price = product.pricing.find((p) => p.planId === 'LACIE')?.price || 0;
  
  const imagePlaceholder = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(`
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="sans-serif" font-size="20">
        ${product.name}
      </text>
    </svg>
  `)))}`;
  
  const handleAddToCart = () => {
    addItem({
      product,
      selectedVariant: variant,
      quantity: 1,
      plan: 'LACIE',
    });
    onClose();
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.variants.length - 1 : prev - 1
    );
    setSelectedVariant(product.variants[currentImageIndex === 0 ? product.variants.length - 1 : currentImageIndex - 1]);
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.variants.length - 1 ? 0 : prev + 1
    );
    setSelectedVariant(product.variants[currentImageIndex === product.variants.length - 1 ? 0 : currentImageIndex + 1]);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden z-50">
          <div className="flex h-full">
            {/* 画像エリア */}
            <div className="flex-1 bg-gray-50 relative">
              {product.variants.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              <img
                src={variant.imageUrl || imagePlaceholder}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = imagePlaceholder;
                }}
              />
              
              {/* サムネイル */}
              {product.variants.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.variants.map((v, index) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVariant(v);
                        setCurrentImageIndex(index);
                      }}
                      className={cn(
                        'w-16 h-16 rounded border-2 overflow-hidden',
                        variant.id === v.id ? 'border-blue-500' : 'border-gray-300'
                      )}
                    >
                      <img
                        src={v.thumbnailUrl || v.imageUrl || imagePlaceholder}
                        alt={v.color}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = imagePlaceholder;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* 詳細エリア */}
            <div className="w-96 p-6 flex flex-col">
              <Dialog.Close className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </Dialog.Close>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h2>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-500">メーカー名:</span>
                  <span className="text-sm font-medium">{product.manufacturer}</span>
                  {product.modelNumber && (
                    <>
                      <span className="text-sm text-gray-500">品番:</span>
                      <span className="text-sm font-medium">{product.modelNumber}</span>
                    </>
                  )}
                </div>
                
                {/* カラー選択 */}
                {product.variants.length > 1 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">カラー選択</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all',
                            variant.id === v.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          )}
                        >
                          {v.colorCode && (
                            <div
                              className="w-5 h-5 rounded-full border border-gray-300"
                              style={{ backgroundColor: v.colorCode }}
                            />
                          )}
                          <span className="text-sm">{v.color}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 価格情報 */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">プラン</span>
                    <div className="flex gap-2">
                      <Badge variant="plan" className={selectedPlan === 'LACIE' ? '' : 'opacity-50'}>
                        LACIE
                      </Badge>
                      <Badge variant="plan" className={selectedPlan === 'HOURS' ? '' : 'opacity-50'}>
                        HOURS
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      {price === 0 ? '標準仕様' : formatPrice(price)}
                    </span>
                    {price > 0 && (
                      <span className="text-sm text-gray-500">
                        単価: {product.unit}
                      </span>
                    )}
                  </div>
                  
                  {product.isOption ? (
                    <Badge variant="option" className="mt-2">
                      オプション
                    </Badge>
                  ) : (
                    <Badge variant="standard" className="mt-2">
                      標準仕様
                    </Badge>
                  )}
                </div>
                
                {/* 説明 */}
                {product.description && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">商品説明</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                )}
              </div>
              
              {/* アクションボタン */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  キャンセル
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  className="flex-1"
                  disabled={price === 0 && !product.isOption}
                >
                  {price === 0 && !product.isOption ? '標準仕様' : 'カートに追加'}
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};