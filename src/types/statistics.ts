export interface Statistics {
  totalConfirmedOrders: number;
  monthlyConfirmedOrders: MonthlyData[];
  popularProducts: ProductStats[];
  averageOrderValue: number;
  catalogBreakdown: CatalogStats[];
}

export interface MonthlyData {
  month: string;
  year: number;
  count: number;
  totalValue: number;
}

export interface ProductStats {
  productId: string;
  productName: string;
  timesSelected: number;
  totalRevenue: number;
  lastSelected: Date;
}

export interface CatalogStats {
  catalogType: string;
  totalProducts: number;
  totalValue: number;
  percentage: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'draft' | 'confirmed' | 'modified' | 'completed';
  createdAt: Date;
  confirmedAt?: Date;
  modifiedAt?: Date;
  modifiedBy?: string;
  version: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  catalogType: string;
}