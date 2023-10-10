import { Dispatch, SetStateAction } from "react";

export type Item  = {
    id: number,
    name: string,
  }
  

  export type AppContextType = {
    jsonData: Item[],
    setJsonData: Dispatch<SetStateAction<Item[]>>,
    selectedItems: Item[];
    setSelectedItems: Dispatch<SetStateAction<Item[]>>,
    unselectedItems: Item[];
    setUnselectedItems: Dispatch<SetStateAction<Item[]>>,
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>,
    filteredItems: Item[];
    setFilteredItems: Dispatch<SetStateAction<Item[]>>,
  }

  export type AppProviderProps ={
    children: React.ReactNode,
  }