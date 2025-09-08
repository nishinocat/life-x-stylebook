export type PlanType = 'LACIE' | 'HOURS';
export type UnitType = '㎡' | '個' | '一式' | 'sqm' | 'piece' | 'set';

export interface ProductVariant {
  id: string;
  color: string;
  colorCode?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  images?: string[];
}

export interface PricingInfo {
  planId?: PlanType;
  plan?: PlanType;
  price: number;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName: string;
  subcategory: string;
  name: string;
  manufacturer: string;
  modelNumber: string;
  unit: UnitType;
  isOption: boolean;
  variants: ProductVariant[];
  pricing: PricingInfo[];
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  displayOrder: number;
  icon?: string;
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  plan: PlanType;
}