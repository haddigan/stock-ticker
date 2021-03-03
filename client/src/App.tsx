import { StockSelector } from "./components/StockSelector";
import { StockDetails } from "./components/StockDetails";
import { SearchResult } from "./types/searchResult.types";

import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [selectedStocks, setSelectedStocks] = useState<SearchResult[]>([]);

  const handleSelectStock = (stock: SearchResult) => {
    setSelectedStocks((selected) => [...selected, stock]);
  };

  const handleRemoveStock = (symbol: string) => {
    setSelectedStocks((selected) => {
      return selected.filter(
        ({ symbol: chosenSymbol }) => symbol !== chosenSymbol
      );
    });
  };
  const showStockSelector = selectedStocks.length < 3;
  return (
    <main>
      <h1>Stock Comparison</h1>
      {showStockSelector && <StockSelector onSelectStock={handleSelectStock} />}
      <section className={styles.comparisonList}>
        {selectedStocks.map(({ symbol, name }) => {
          const handleRemove = () => handleRemoveStock(symbol);
          return (
            <StockDetails
              key={symbol}
              symbol={symbol}
              name={name}
              onRemoveStock={handleRemove}
            />
          );
        })}
      </section>
    </main>
  );
}

export default App;
