import { StockSelector } from "./components/StockSelector";
import { StockDetails } from "./components/StockDetails";

import styles from "./App.module.css";

function App() {
  const selectedStocks = ["GME", "BB"];

  return (
    <main>
      <h1>Stock Comparison</h1>
      <StockSelector />
      <section className={styles.comparisonList}>
        {selectedStocks.map((symbol) => {
          return <StockDetails key={symbol} symbol={symbol} />;
        })}
      </section>
    </main>
  );
}

export default App;
