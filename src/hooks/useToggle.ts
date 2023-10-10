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
        
        setUnselectedItems((prevUnselected) => {
            const copy = [...prevUnselected];
            copy.splice(originalIndex, 0, item);
            return copy;
        
        });
        } else {
        setSelectedItems((prevSelected) => {
            const updatedSelectedItems = [item, ...prevSelected];
            localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
        
            return updatedSelectedItems;
        });
        setUnselectedItems((prevUnselected) => prevUnselected.filter((unselectedItem) => unselectedItem.id !== item.id));
        setFilteredItems((prevUnselected) => prevUnselected.filter((unselectedItem) => unselectedItem.id !== item.id))
        }
    };
    return {ToggleItemSelection}
}