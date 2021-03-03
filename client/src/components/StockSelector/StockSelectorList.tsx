import { ReactNode } from "react";
import classes from "./StockSelector.module.css";

export const StockSelectorList = ({ children }: { children?: ReactNode }) => {
  return !children ? null : (
    <datalist id="search_results" className={classes.list}>
      {children}
    </datalist>
  );
};
