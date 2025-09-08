export interface Version {
  id: string;
  version: string;
  createdAt: Date;
  createdBy: string;
  description: string;
  changes: VersionChange[];
  isActive: boolean;
}

export interface VersionChange {
  id: string;
  type: 'add' | 'update' | 'delete';
  entityType: 'product' | 'category' | 'price';
  entityId: string;
  previousValue?: any;
  newValue?: any;
  changedBy: string;
  changedAt: Date;
}