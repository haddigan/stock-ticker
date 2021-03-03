import classes from "./StockSelector.module.css";

export const StockSelectorOption = ({
  name,
  symbol,
  onClick: handleClick,
}: {
  name: string;
  symbol: string;
  onClick: any;
}) => {
  return (
    <option className={classes.listItem} onClick={handleClick}>
      {symbol} - {name}
    </option>
  );
};
