import { SearchResult } from "../../types/searchResult.types";

export const StockHeading = ({ name, symbol }: SearchResult) => {
  return (
    <hgroup>
      <h2>{name}</h2>
      <h3>{symbol}</h3>
    </hgroup>
  );
};
