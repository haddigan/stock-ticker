import { useState } from "react";
import { StockHeading } from "./StockHeading";
import { StockQuote } from "./StockQuote";
import { StockOverview } from "./StockOverview";
import styles from "./StockDetails.module.css";

type StockDetailsProps = {
  name: string;
  symbol: string;
  onRemoveStock: any;
};

export const StockDetails = ({
  symbol,
  name,
  onRemoveStock,
}: StockDetailsProps) => {
  const [shouldShowDetails, setShouldShowDetails] = useState(false);

  return (
    <section className={styles.stockDetails}>
      <div className={styles.content}>
        <StockHeading name={name} symbol={symbol} />
        <StockQuote symbol={symbol} />
        {/* 
          API rate limit is 5 requests per minute. Loading additional details
          asynchronously like this should space out the calls a little bit.
        */}
        {!shouldShowDetails && (
          <button onClick={() => setShouldShowDetails(true)}>
            Load additional details
          </button>
        )}
        {shouldShowDetails && <StockOverview symbol={symbol} />}
      </div>
      <div className={styles.closeButton}>
        <button onClick={onRemoveStock}>
          <i>❌</i>
        </button>
      </div>
    </section>
  );
};
