import { useEffect, useState } from "react";
import { Item } from "../types";

export const useDataFetching = () => {
  const [jsonData, setJsonData] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [unselectedItems, setUnselectedItems] = useState<Item[]>([]);

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
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return { setSelectedItems, setUnselectedItems, jsonData, selectedItems, unselectedItems };
};
