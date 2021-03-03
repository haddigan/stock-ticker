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
  id: string;
}

export interface FormattedQuote {
  symbol: string;
  price: string;
  openPrice: string;
  lowPrice: string;
  highPrice: string;
  changePercent: string;
}

export interface FormattedOverview {
  symbol: string;
  sector: string;
  industry: string;
  marketCap: string;
  EPS: string;
  profitMargin: string;
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

export interface ApiOverviewResult {
  Symbol: string;
  AssetType: string;
  Description: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FullTimeEmployees: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  SharesFloat: string;
  SharesShort: string;
  SharesShortPriorMonth: string;
  ShortRatio: string;
  ShortPercentOutstanding: string;
  ShortPercentFloat: string;
  PercentInsiders: string;
  PercentInstitutions: string;
  ForwardAnnualDividendRate: string;
  ForwardAnnualDividendYield: string;
  PayoutRatio: string;
  DividendDate: string;
  ExDividendDate: string;
  LastSplitFactor: string;
  LastSplitDate: string;
}

export interface ApiQuoteResults {
  [GLOBAL_QUOTE_KEY]: ApiQuoteResult;
}

export interface ApiSearchResults {
  bestMatches: ApiSearchResult[];
}
