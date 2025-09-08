import { create } from 'zustand';
import type { Version } from '../types/version';

interface VersionStore {
  currentVersion: string;
  versions: Version[];
  pendingChanges: string[];
  
  addChange: (change: string) => void;
  createNewVersion: (description: string, createdBy: string) => void;
  getCurrentVersion: () => Version | undefined;
  getVersionHistory: () => Version[];
}

const generateVersionNumber = (prevVersion: string): string => {
  const parts = prevVersion.split('.');
  const patch = parseInt(parts[2]) + 1;
  return `${parts[0]}.${parts[1]}.${patch}`;
};

export const useVersionStore = create<VersionStore>((set, get) => ({
  currentVersion: '1.0.0',
  versions: [
    {
      id: '1',
      version: '1.0.0',
      createdAt: new Date(),
      createdBy: 'システム',
      description: '初期バージョン',
      changes: [],
      isActive: true,
    },
  ],
  pendingChanges: [],
  
  addChange: (change) => {
    set((state) => ({
      pendingChanges: [...state.pendingChanges, change],
    }));
  },
  
  createNewVersion: (description, createdBy) => {
    const { currentVersion, versions, pendingChanges } = get();
    const newVersionNumber = generateVersionNumber(currentVersion);
    
    const newVersion: Version = {
      id: Date.now().toString(),
      version: newVersionNumber,
      createdAt: new Date(),
      createdBy,
      description,
      changes: [...pendingChanges],
      isActive: true,
    };
    
    // 以前のバージョンを非アクティブに
    const updatedVersions = versions.map((v) => ({
      ...v,
      isActive: false,
    }));
    
    set({
      currentVersion: newVersionNumber,
      versions: [...updatedVersions, newVersion],
      pendingChanges: [],
    });
  },
  
  getCurrentVersion: () => {
    const { versions } = get();
    return versions.find((v) => v.isActive);
  },
  
  getVersionHistory: () => {
    const { versions } = get();
    return versions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
}));