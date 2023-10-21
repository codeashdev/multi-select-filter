import { useToggle } from "../hooks/useToggle";
import { useDataFetching } from "../hooks/usedatafetching";
import { decodeHTMLEntities } from "../utils/decodeHTMLEntities";


const ItemsList = () => {
    const {  selectedItems, unselectedItems } = useDataFetching();
    const {ToggleItemSelection } = useToggle();
    
    return (
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
    )

}
export default ItemsList;