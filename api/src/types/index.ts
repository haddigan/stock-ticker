import {
  SYMBOL_SEARCH,
  OVERVIEW,
  GLOBAL_QUOTE,
  GLOBAL_QUOTE_KEY,
} from "../app/constants";

export type ApiFunction =
  | typeof SYMBOL_SEARCH
  | typeof OVERVIEW
  | typeof GLOBAL_QUOTE;

export interface FormattedSearchResult {
  symbol: string;
  name: string;
}

export interface FormattedQuote {
  symbol: string;
  price: string;
  openPrice: string;
  lowPrice: string;
  highPrice: string;
  changePercent: string;
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

export interface ApiQuoteResult {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
}

export interface ApiQuoteResults {
  [GLOBAL_QUOTE_KEY]: ApiQuoteResult;
}

export interface ApiSearchResults {
  bestMatches: ApiSearchResult[];
}
