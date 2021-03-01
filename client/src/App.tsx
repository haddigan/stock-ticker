import { StockSelector } from "./components/StockSelector";
import { StockDetails } from "./components/StockDetails";

import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);

  const handleSelectStock = (symbol: string) => {
    setSelectedStocks((selected) => [...selected, symbol]);
  };

  const handleRemoveStock = (symbol: string) => {
    setSelectedStocks((selected) => {
      return selected.filter((chosenSymbol) => symbol !== chosenSymbol);
    });
  };

  return (
    <main>
      <h1>Stock Comparison</h1>
      <StockSelector
        disabled={selectedStocks.length === 3}
        onSelectStock={handleSelectStock}
      />
      <section className={styles.comparisonList}>
        {selectedStocks.map((symbol) => {
          const handleRemove = () => handleRemoveStock(symbol);
          return (
            <StockDetails
              key={symbol}
              symbol={symbol}
              onRemoveStock={handleRemove}
            />
          );
        })}
      </section>
    </main>
  );
}

export default App;
