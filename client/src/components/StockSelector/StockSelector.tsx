import { useState } from "react";
import { useDebounce, useSearch } from "../../hooks";
import { SelectorList } from "./SelectorList";

import styles from "./StockSelector.module.css";

export const StockSelector = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce<string>(searchQuery, 500);

  const [searchResults] = useSearch(debouncedQuery);

  const handleSelectStock = () => {
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
