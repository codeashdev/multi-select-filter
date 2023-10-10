import { useState } from 'react';
import { AppContextType, AppProviderProps, Item } from '../types';
import { AppContext } from './AppContext';



export function AppProvider({ children }: AppProviderProps): JSX.Element {
  const [jsonData, setJsonData] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [unselectedItems, setUnselectedItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const contextValue: AppContextType = {
    jsonData,
    setJsonData,
    selectedItems,
    setSelectedItems,
    unselectedItems,
    setUnselectedItems,
    searchQuery,
    setSearchQuery,
    filteredItems,
    setFilteredItems,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
