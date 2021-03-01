import { SearchResult } from "../../types/searchResult.types";

import styles from "./StockSelector.module.css";

type SelectorListProps = {
  searchResults: SearchResult[] | null;
  onSelectStock: any;
};

export const SelectorList = ({
  searchResults,
  onSelectStock,
}: SelectorListProps) => {
  const hasResults = Array.isArray(searchResults) && searchResults.length;

  return !hasResults ? (
    <div className={styles.selectorList}>
      <p className={styles.selectorListItem}>No Results Found!</p>
    </div>
  ) : (
    <ul className={styles.selectorList}>
      {searchResults &&
        searchResults.map(({ name, symbol }) => {
          const handleSelectStock = () => onSelectStock(symbol);
          return (
            <SelectorListItem
              key={symbol}
              name={name}
              symbol={symbol}
              onSelectStock={handleSelectStock}
            />
          );
        })}
    </ul>
  );
};

type SelectorListItemProps = {
  name: string;
  symbol: string;
  onSelectStock: any;
};

const SelectorListItem = ({
  name,
  symbol,
  onSelectStock: handleSelectStock,
}: SelectorListItemProps) => {
  return (
    <li
      key={name}
      className={styles.selectorListItem}
      onClick={handleSelectStock}
    >
      {symbol} - {name}
    </li>
  );
};
