import { ChangeEvent } from "react";
import classes from "./StockSelector.module.css";

export const StockSelectorInput = ({
  onChange,
  value,
}: {
  onChange: (queryValue: string) => void;
  value: string;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);
  return (
    <>
      <label htmlFor="select_stock" className={classes.label}>
        Enter up to three stocks to compare the current stock prices
      </label>
      <input
        className={classes.input}
        list=""
        id="select_stock"
        name="select_stock"
        autoComplete="off"
        onChange={handleChange}
        value={value}
      />
    </>
  );
};
