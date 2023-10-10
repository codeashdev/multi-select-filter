import { useEffect } from "react";
import { Item } from "../types";
import { useAppContext } from "../context/AppContext";

export const useDataFetching = () => {

  const {
    jsonData,
    setJsonData,
    selectedItems,
    setSelectedItems,
    unselectedItems,
    setUnselectedItems,
    setFilteredItems,
   
  } = useAppContext();

  useEffect(() => {
    fetch("/src/assets/items.json")
      .then((response) => response.json())
      .then((data: { data: string[] }) => {
        const items = data.data.map((name, index) => ({
          id: index + 1,
          name: name,
        }));
        setJsonData(items);

        const sessionSelectedItems = JSON.parse(localStorage.getItem('selectedItems') || '[]');
        setSelectedItems(sessionSelectedItems);
        
        setUnselectedItems(
          items.filter((item) => !sessionSelectedItems.some((selectedItem: Item) => selectedItem.id === item.id))
        );
        setFilteredItems(
          items.filter((item) => !sessionSelectedItems.some((selectedItem: Item) => selectedItem.id === item.id))
        )
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [setFilteredItems, setJsonData, setSelectedItems, setUnselectedItems]);

  return { jsonData, selectedItems, unselectedItems, setSelectedItems, setUnselectedItems }
};
