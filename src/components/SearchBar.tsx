import { useAppContext } from "../context/AppContext";
import { useSearch } from "../hooks/useSearch";


const SearchBar = () => {
    const { searchQuery } = useAppContext();
    const { handleSearchInputChange} = useSearch();
    return (
        <div className="search-bar">
        <input
          type="text"
          placeholder="Kategori ara..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
          <img src="/search.svg" alt="Search" className="search-icon" />
      </div>
    )
}
export default SearchBar;