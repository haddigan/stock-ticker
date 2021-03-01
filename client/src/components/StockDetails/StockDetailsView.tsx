import { Quote } from "../../types/stockQuote.types";
import styles from "./StockDetails.module.css";

type StockDetailsViewProps = {
  symbol: string;
  name: string;
  quote: Quote;
  onRemoveStock: any;
};

export const StockDetailsView = ({
  symbol,
  name,
  quote,
  onRemoveStock,
}: StockDetailsViewProps) => {
  const { high, low, changePercent, price } = quote || {};

  return (
    <section className={styles.stockDetails}>
      <div className={styles.content}>
        <h2>{name}</h2>
        <div>${price}</div>
        <div>Percent change: {changePercent}</div>
        <h3>Stats</h3>
        <div>High: {high}</div>
        <div>Low: {low}</div>
      </div>
      <div className={styles.closeButton}>
        <button onClick={onRemoveStock}>❌</button>
      </div>
    </section>
  );
};
