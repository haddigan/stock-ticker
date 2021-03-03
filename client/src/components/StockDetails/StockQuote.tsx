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
          <div className={styles.priceDisplay}>
            <div className={styles.priceDetails}>
              <div className={styles.stockPrice}>{price}</div>
              <div className={isUp ? styles.positive : styles.negative}>
                {changePercent}
              </div>
            </div>
            <div className={styles.priceVisual}>
              <i
                className={`${styles.priceIcon} ${
                  !isUp && styles.iconNegative
                }`}
              >
                🚀
              </i>
            </div>
          </div>
          <h3>Stats</h3>
          <dl className={styles.dataTable}>
            <dt className={styles.term}>Open:</dt>
            <dd className={styles.detail}>{openPrice}</dd>
            <dt className={styles.term}>High:</dt>
            <dd className={styles.detail}>{highPrice}</dd>
            <dt className={styles.term}>Low:</dt>
            <dd className={styles.detail}>{lowPrice}</dd>
          </dl>
        </div>
      )}
    </>
  );
};
