import { Quote } from "../../types/stockQuote.types";
import styles from "./StockDetails.module.css";

type StockDetailsViewProps = {
  symbol: string;
  name: string;
  quote: Quote | null;
  onRemoveStock: any;
};

export const StockDetailsView = ({
  name,
  quote,
  onRemoveStock,
}: StockDetailsViewProps) => {
  if (!quote) return null;

  const { highPrice, lowPrice, changePercent, price } = quote;

  return (
    <section className={styles.stockDetails}>
      <div className={styles.content}>
        <h2>{name}</h2>
        <div>{price}</div>
        <div>Percent change: {changePercent}</div>
        <h3>Stats</h3>
        <div>High: {highPrice}</div>
        <div>Low: {lowPrice}</div>
      </div>
      <div className={styles.closeButton}>
        <button onClick={onRemoveStock}>❌</button>
      </div>
    </section>
  );
};
