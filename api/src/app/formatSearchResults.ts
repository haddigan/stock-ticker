import { FormattedSearchResult, ApiSearchResult } from "../types";
import { SYMBOL_KEY, NAME_KEY } from "./constants";
import { nanoid } from "nanoid";

export const formatSearchResults = (
  matches: ApiSearchResult[]
): FormattedSearchResult[] => {
  return matches.map((match) => {
    const symbol = match[SYMBOL_KEY];
    const name = match[NAME_KEY];
    const id = nanoid();
    return { symbol, name, id };
  });
};
