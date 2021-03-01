import { FormattedSearchResult, ApiSearchResult } from "../types";
import { SYMBOL_KEY, NAME_KEY } from "./constants";

export const formatSearchResults = (
  matches: ApiSearchResult[]
): FormattedSearchResult[] => {
  return matches.map((match) => {
    const symbol = match[SYMBOL_KEY];
    const name = match[NAME_KEY];
    return { symbol, name };
  });
};
