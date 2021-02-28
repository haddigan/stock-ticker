import { SimplifiedResult } from "../../types/searchResponse";

type SelectorListProps = {
  searchResults: SimplifiedResult[] | null;
};

export const SelectorList = ({ searchResults }: SelectorListProps) => {
  const hasResults = Array.isArray(searchResults) && searchResults.length;
  return !hasResults ? null : (
    <ul>
      {searchResults &&
        searchResults.map(({ name, symbol }) => {
          return <SelectorListItem name={name} symbol={symbol} />;
        })}
    </ul>
  );
};

type SelectorListItemProps = {
  name: string;
  symbol: string;
};

const SelectorListItem = ({ name, symbol }: SelectorListItemProps) => {
  return (
    <li key={name}>
      {symbol} - {name}
    </li>
  );
};
