import React, { useState } from 'react';
import { decodeHTMLEntities } from './utils/decodeHTMLEntities';
import Card from './components/Card';
import { useDataFetching } from './hooks/usedatafetching';
import { Item } from './types';
import './App.css';

function App() {
  const { jsonData, selectedItems, unselectedItems, setSelectedItems, setUnselectedItems } = useDataFetching();
  const [searchQuery, setSearchQuery] = useState<string>('');

   // Function to toggle the selection of an item
  const toggleItemSelection = (item: Item) => {
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
    }
  };

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
      setUnselectedItems(jsonData);
    }
  };

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
          <img src="/public/search.svg" alt="Search" className="search-icon" />
      </div>
    
        <div className="scrollable-list">
          <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => toggleItemSelection(item)}
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
                    onChange={() => toggleItemSelection(item)}
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
