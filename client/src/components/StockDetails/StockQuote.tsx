import { useStockApi } from "../../hooks";
import { LoadingError } from "./LoadingError";
import styles from "./StockDetails.module.css";

export const StockQuote = ({ symbol }: { symbol: string }) => {
  const [quote, , { isLoading, hasError }] = useStockApi("quote", symbol);

  const showQuote = !isLoading && !hasError && Boolean(quote);
  const { openPrice, highPrice, lowPrice, price, changePercent } = quote || {};
  const isUp = changePercent && !changePercent.includes("-");
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {hasError && <LoadingError />}
      {showQuote && (
        <div>
          <div>{price}</div>
          <div className={isUp ? styles.positive : styles.negative}>
            {changePercent}
          </div>
          <h3>Stats</h3>
          <dl>
            <dt>Open:</dt>
            <dd>{openPrice}</dd>
            <dt>High:</dt>
            <dd>{highPrice}</dd>
            <dt>Low:</dt>
            <dd>{lowPrice}</dd>
          </dl>
        </div>
      )}
    </>
  );
};
