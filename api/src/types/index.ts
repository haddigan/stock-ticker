import { SYMBOL_SEARCH, OVERVIEW, GLOBAL_QUOTE } from "../app/constants";

export type ApiFunction =
  | typeof SYMBOL_SEARCH
  | typeof OVERVIEW
  | typeof GLOBAL_QUOTE;

export interface FormattedSearchResult {
  symbol: string;
  name: string;
}

export interface ApiSearchResult {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

export interface ApiSearchResults {
  bestMatches: ApiSearchResult[];
}
