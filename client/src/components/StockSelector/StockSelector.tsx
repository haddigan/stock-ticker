import { useState } from "react";
import { useDebounce, useStockApi } from "../../hooks";
import { SelectorList } from "./SelectorList";
import { SearchResult } from "../../types/searchResult.types";

import styles from "./StockSelector.module.css";

type StockSelectorProps = {
  onSelectStock: (stock: SearchResult) => void;
  disabled?: boolean;
};

export const StockSelector = ({
  onSelectStock,
  disabled = false,
}: StockSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce<string>(searchQuery, 500);

  const [searchResults] = useStockApi("search", debouncedQuery);

  const handleSelectStock = (stock: SearchResult): void => {
    onSelectStock(stock);
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
