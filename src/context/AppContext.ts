// Create a new file named appContext.ts
import { createContext, useContext } from 'react';
import { AppContextType } from '../types';

export const AppContext = createContext<AppContextType | null>(null);

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
