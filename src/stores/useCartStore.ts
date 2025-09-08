import { create } from 'zustand';
import type { CartItem } from '../types/product';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.product.id === item.product.id && 
               i.selectedVariant.id === item.selectedVariant.id
      );
      
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.product.id === item.product.id && 
            i.selectedVariant.id === item.selectedVariant.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      
      return { items: [...state.items, item] };
    });
  },
  
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      const price = item.product.pricing.find(
        (p) => p.planId === 'LACIE'
      )?.price || 0;
      return total + price * item.quantity;
    }, 0);
  },
}));