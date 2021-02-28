import { SimplifiedResult } from "../../types/searchResponse";

import styles from "./StockSelector.module.css";

type SelectorListProps = {
  searchResults: SimplifiedResult[] | null;
  onSelectStock: any;
};

export const SelectorList = ({
  searchResults,
  onSelectStock,
}: SelectorListProps) => {
  const hasResults = Array.isArray(searchResults) && searchResults.length;
  return !hasResults ? null : (
    <ul className={styles.selectorList}>
      {searchResults &&
        searchResults.map(({ name, symbol }) => {
          return (
            <SelectorListItem
              key={symbol}
              name={name}
              symbol={symbol}
              onSelectStock={onSelectStock}
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
