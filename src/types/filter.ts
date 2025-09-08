export interface FilterOptions {
  categories: string[];
  subcategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  showStandard: boolean;
  showOption: boolean;
  searchQuery: string;
}