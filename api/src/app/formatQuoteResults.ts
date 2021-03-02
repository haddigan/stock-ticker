import { ApiQuoteResult, FormattedQuote } from "../types";
import {
  STOCK_SYMBOL_KEY,
  STOCK_OPEN_KEY,
  STOCK_HIGH_KEY,
  STOCK_LOW_KEY,
  STOCK_PRICE_KEY,
  STOCK_CHANGE_PERCENT_KEY,
} from "./constants";

export const formatQuoteResults = (quote: ApiQuoteResult): FormattedQuote => {
  return {
    symbol: quote[STOCK_SYMBOL_KEY],
    price: `$${quote[STOCK_PRICE_KEY]}`,
    openPrice: `$${quote[STOCK_OPEN_KEY]}`,
    lowPrice: `$${quote[STOCK_LOW_KEY]}`,
    highPrice: `$${quote[STOCK_HIGH_KEY]}`,
    changePercent: quote[STOCK_CHANGE_PERCENT_KEY],
  };
};
