import { useAppContext } from "../context/AppContext";


export const useSearch = () => {
    const {
        jsonData,
        searchQuery,
        setSearchQuery,
        unselectedItems,
        setUnselectedItems,
        filteredItems,
       
      } = useAppContext();
     // Function to perform the search
    const performSearch = () => {
        const query = searchQuery.toLowerCase();
        const results = unselectedItems.filter((item) =>
        item.name.toLowerCase().includes(query)
        );
    
        setUnselectedItems(results.length > 0 ? results : [{ id: 0, name: 'No results found' }]);
    };

  // Handle search input change and reset search when cleared
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchQuery = e.target.value;
        setSearchQuery(newSearchQuery);

        if (newSearchQuery.trim() === '') {
        setUnselectedItems(filteredItems.length > 0 ? filteredItems : jsonData);
        }
    };
    return {performSearch, handleSearchInputChange}
}