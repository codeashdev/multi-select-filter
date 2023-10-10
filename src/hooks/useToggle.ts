import { useAppContext } from "../context/AppContext";
import { Item } from "../types";


export const useToggle = () => {
    const {
        jsonData,
        selectedItems,
        setSelectedItems,
        setUnselectedItems,
        setFilteredItems,
       
      } = useAppContext();
    
    const ToggleItemSelection = (item: Item) => {
        if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
        setSelectedItems((prevSelected) => {
            const updatedSelectedItems = prevSelected.filter((selectedItem) => selectedItem.id !== item.id);
            localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
            return updatedSelectedItems;
        });
    
        const originalIndex = jsonData.findIndex((originalItem) => originalItem.id === item.id);

        const updatedData = ((prevUnselected: Item[]) => {
            const copy = [...prevUnselected];
            copy.splice(originalIndex, 0, item);
            return copy;
        });
        
        setUnselectedItems(updatedData);
        setFilteredItems(updatedData)
        } else {
        setSelectedItems((prevSelected) => {
            const updatedSelectedItems = [item, ...prevSelected];
            localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
        
            return updatedSelectedItems;
        });
        const updatedData =(prevUnselected: Item[]) => prevUnselected.filter((unselectedItem) => unselectedItem.id !== item.id)
        setUnselectedItems(updatedData);
        setFilteredItems(updatedData)
        }
    };
    return {ToggleItemSelection}
}