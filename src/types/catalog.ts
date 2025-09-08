export type CatalogType = 'interior' | 'exterior' | 'water';

export interface CatalogTab {
  id: CatalogType;
  name: string;
  icon: string;
  description: string;
}