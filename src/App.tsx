import Card from './components/Card';
import { useSearch } from './hooks/useSearch';
import SearchBar from './components/SearchBar';
import ItemsList from './components/ItemsList';
import './App.css';


function App() {
  const {performSearch} = useSearch();

  return (
    <Card>
      <p>Kategoriler</p>
        <SearchBar />
        <ItemsList />
        <button onClick={performSearch} className='search-button'>Ara</button>
    </Card>
  );
}

export default App;
