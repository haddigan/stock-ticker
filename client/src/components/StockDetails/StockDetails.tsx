import { StockHeading } from "./StockHeading";
import { StockQuote } from "./StockQuote";
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
  return (
    <section className={styles.stockDetails}>
      <div className={styles.content}>
        <StockHeading name={name} symbol={symbol} />
        <StockQuote symbol={symbol} />
      </div>
      <div className={styles.closeButton}>
        <button onClick={onRemoveStock}>❌</button>
      </div>
    </section>
  );
};
