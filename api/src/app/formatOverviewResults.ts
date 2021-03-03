import {
  OVERVIEW_SYMBOL_KEY,
  OVERVIEW_SECTOR_KEY,
  OVERVIEW_INDUSTRY_KEY,
  OVERVIEW_MARKET_CAP_KEY,
  OVERVIEW_EPS_KEY,
  OVERVIEW_PROFIT_MARGIN_KEY,
} from "./constants";
import { ApiOverviewResult, FormattedOverview } from "../types";

export const formatOverviewResults = (
  result: ApiOverviewResult
): FormattedOverview => {
  return {
    symbol: result[OVERVIEW_SYMBOL_KEY],
    sector: result[OVERVIEW_SECTOR_KEY],
    industry: result[OVERVIEW_INDUSTRY_KEY],
    marketCap: result[OVERVIEW_MARKET_CAP_KEY],
    EPS: result[OVERVIEW_EPS_KEY],
    profitMargin: result[OVERVIEW_PROFIT_MARGIN_KEY],
  };
};
