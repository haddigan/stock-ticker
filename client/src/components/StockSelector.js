import { useState } from "react";
import { useDebounce, useSearch } from "../hooks";

export const StockSelector = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const [searchResults] = useSearch(debouncedQuery);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search by company name or symbol"
      />
      {searchResults && <p>{JSON.stringify(searchResults)}</p>}
    </div>
  );
};
