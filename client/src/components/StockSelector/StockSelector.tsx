import { useState } from "react";
import { useDebounce, useSearch } from "../../hooks";
import { SelectorList } from "./SelectorList";

import styles from "./StockSelector.module.css";

type StockSelectorProps = {
  onSelectStock: (symbol: string) => void;
  disabled?: boolean;
};

export const StockSelector = ({
  onSelectStock,
  disabled = false,
}: StockSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce<string>(searchQuery, 500);

  const [searchResults] = useSearch(debouncedQuery);

  const handleSelectStock = (symbol: string): void => {
    onSelectStock(symbol);
    setSearchQuery("");
  };

  return (
    <div className={styles.stockSelector}>
      <input
        className={styles.selectorInput}
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search by company name or symbol"
        disabled={disabled}
      />
      {searchQuery && searchResults && (
        <SelectorList
          searchResults={searchResults}
          onSelectStock={handleSelectStock}
        />
      )}
    </div>
  );
};
