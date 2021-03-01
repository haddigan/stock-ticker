import { SYMBOL_SEARCH, OVERVIEW, GLOBAL_QUOTE } from "../app/constants";

export type ApiFunction =
  | typeof SYMBOL_SEARCH
  | typeof OVERVIEW
  | typeof GLOBAL_QUOTE;
