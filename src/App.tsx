import { decodeHTMLEntities } from './utils/decodeHTMLEntities';
import Card from './components/Card';
import { useAppContext } from './context/AppContext';
import { useDataFetching } from './hooks/usedatafetching';
import { useToggle } from './hooks/useToggle';
import { useSearch } from './hooks/useSearch';
import './App.css';

function App() {
  const {  selectedItems, unselectedItems } = useDataFetching();
  const {ToggleItemSelection } = useToggle();
  const { searchQuery } = useAppContext();
  const {performSearch, handleSearchInputChange} = useSearch();

  return (
    <Card>
      <p>Kategoriler</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Kategori ara..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
          <img src="/search.svg" alt="Search" className="search-icon" />
      </div>
    
        <div className="scrollable-list">
          <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => ToggleItemSelection(item)}
                />
                <span>{decodeHTMLEntities(item.name)}</span>
              </label>
            </li>
          ))}
           {unselectedItems.map((item) => (
            <li key={item.id}>
              {item.id === 0 ? (
                <div className="no-results-found">Sonuç bulunamadı</div>
              ) : (
                <label>
                  <input
                    type="checkbox"
                    checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                    onChange={() => ToggleItemSelection(item)}
                  />
                  {decodeHTMLEntities(item.name)}
                </label>
              )}
            </li>
          ))}
          </ul>
        </div>
        <button onClick={performSearch} className='search-button'>Ara</button>
        </Card>
  );
}

export default App;
