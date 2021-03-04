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

  const debouncedQuery = useDebounce(queryValue, 250);
  const [searchResults, , { isLoading, hasError }] = useStockApi(
    "search",
    debouncedQuery
  );

  const renderOptionList = (list: SearchResult[]) => {
    if (!list) return null;
    return list.map(({ name, symbol, id }) => {
      const handleSelect = () => {
        setQueryValue("");
        handleSelectStock({ name, symbol, id });
      };
      return (
        <StockSelectorOption
          key={id}
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
      {isLoading && (!searchResults || searchResults.length < 1) && (
        <div>Loading...</div>
      )}
      {hasError && (
        <div>Something went wrong. Please wait a few moments and try again</div>
      )}
      {queryValue && (
        <StockSelectorList>
          {renderOptionList(searchResults || null)}
        </StockSelectorList>
      )}
    </div>
  );
};
