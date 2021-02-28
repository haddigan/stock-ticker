import { useState } from "react";
import { useDebounce, useSearch } from "../../hooks";
import { SelectorList } from "./SelectorList";

export const StockSelector = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce<string>(searchQuery, 500);

  const [searchResults] = useSearch(debouncedQuery);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search by company name or symbol"
      />
      <SelectorList searchResults={searchResults} />
    </div>
  );
};
