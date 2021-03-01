import { StockSelector } from "./components/StockSelector";
import { StockDetails } from "./components/StockDetails";

import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);

  const handleSelectStock = (symbol: string) => {
    setSelectedStocks((selected) => [...selected, symbol]);
  };

  return (
    <main>
      <h1>Stock Comparison</h1>
      <StockSelector onSelectStock={handleSelectStock} />
      <section className={styles.comparisonList}>
        {selectedStocks.map((symbol) => {
          return <StockDetails key={symbol} symbol={symbol} />;
        })}
      </section>
    </main>
  );
}

export default App;
