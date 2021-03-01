import { Quote } from "../../types/quote";
import styles from "./StockDetails.module.css";

type StockDetailsViewProps = {
  symbol: string;
  name: string;
  quote: Quote;
};

export const StockDetailsView = ({
  symbol,
  name,
  quote,
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
        <button>❌</button>
      </div>
    </section>
  );
};
