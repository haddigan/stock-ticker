export const SYMBOL_KEY = "1. symbol";
export const NAME_KEY = "2. name";

export interface SearchResult {
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

export interface SimplifiedResult {
  symbol: SearchResult[typeof SYMBOL_KEY];
  name: SearchResult[typeof NAME_KEY];
}

export type SearchResponse = SearchResult[];
