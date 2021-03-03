import { useStockApi } from "../../hooks";
import { LoadingError } from "./LoadingError";
import styles from "./StockDetails.module.css";

export const StockOverview = ({ symbol }: { symbol: string }) => {
  const [overview, , { isLoading, hasError }] = useStockApi("overview", symbol);

  const showOverview = !isLoading && !hasError && Boolean(overview);
  const { sector, industry, marketCap, EPS, profitMargin } = overview || {};

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {hasError && <LoadingError />}
      {showOverview && (
        <div className={styles.overview}>
          <h3>Overview</h3>
          {/* This data table component should be refactored out to a new component. /*}
          {/* StockQuote uses one that is identical */}
          <dl className={styles.dataTable}>
            <dt className={styles.term}>Sector:</dt>
            <dd className={styles.detail}>{sector}</dd>
            <dt className={styles.term}>Industry:</dt>
            <dd className={styles.detail}>{industry}</dd>
            <dt className={styles.term}>Market Cap:</dt>
            <dd className={styles.detail}>{marketCap}</dd>
            <dt className={styles.term}>EPS:</dt>
            <dd className={styles.detail}>{EPS}</dd>
            <dt className={styles.term}>Market Cap:</dt>
            <dd className={styles.detail}>{profitMargin}</dd>
          </dl>
        </div>
      )}
    </>
  );
};
