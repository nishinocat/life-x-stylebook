import { create } from 'zustand';
import type { Order } from '../types/statistics';

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  
  createOrder: (customerId: string, customerName: string) => void;
  confirmOrder: (orderId: string) => void;
  modifyOrder: (orderId: string, modifiedBy: string) => void;
  getStatistics: () => {
    totalConfirmedOrders: number;
    yearlyTotal: number;
    monthlyAverage: number;
  };
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  currentOrder: null,
  
  createOrder: (customerId, customerName) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      customerId,
      customerName,
      items: [],
      totalAmount: 0,
      status: 'draft',
      createdAt: new Date(),
      version: '1.0.0',
    };
    
    set((state) => ({
      orders: [...state.orders, newOrder],
      currentOrder: newOrder,
    }));
  },
  
  confirmOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'confirmed' as const,
              confirmedAt: new Date(),
            }
          : order
      ),
    }));
  },
  
  modifyOrder: (orderId, modifiedBy) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'modified' as const,
              modifiedAt: new Date(),
              modifiedBy,
            }
          : order
      ),
    }));
  },
  
  getStatistics: () => {
    const { orders } = get();
    const confirmedOrders = orders.filter((o) => 
      o.status === 'confirmed' || o.status === 'modified' || o.status === 'completed'
    );
    
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const yearlyOrders = confirmedOrders.filter((o) => 
      o.confirmedAt && o.confirmedAt >= yearStart
    );
    
    const yearlyTotal = yearlyOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const monthlyAverage = yearlyTotal / 12;
    
    return {
      totalConfirmedOrders: confirmedOrders.length,
      yearlyTotal,
      monthlyAverage,
    };
  },
}));