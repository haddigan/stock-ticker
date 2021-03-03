import { useState } from "react";
import { StockSelectorInput } from "./StockSelectorInput";
import { StockSelectorList } from "./StockSelectorList";
import { StockSelectorOption } from "./StockSelectorOption";

import { useDebounce, useStockApi } from "../../hooks";

import classes from "./StockSelector.module.css";
import { SearchResult } from "../../types/searchResult.types";

export const StockSelector = ({
  onSelectStock: handleSelectStock,
}: {
  onSelectStock: (selectedStock: SearchResult) => void;
}) => {
  const [queryValue, setQueryValue] = useState("");

  const debouncedQuery = useDebounce(queryValue, 500);
  const [searchResults] = useStockApi("search", debouncedQuery);

  const renderOptionList = (list: SearchResult[]) => {
    if (!list) return null;
    return list.map(({ name, symbol }) => {
      const handleSelect = () => {
        setQueryValue("");
        handleSelectStock({ name, symbol });
      };
      return (
        <StockSelectorOption
          key={symbol}
          name={name}
          symbol={symbol}
          onClick={handleSelect}
        />
      );
    });
  };

  return (
    <div className={classes.base}>
      <StockSelectorInput
        value={queryValue}
        onChange={(value) => setQueryValue(value)}
      />
      {queryValue && (
        <StockSelectorList>
          {renderOptionList(searchResults || null)}
        </StockSelectorList>
      )}
    </div>
  );
};
