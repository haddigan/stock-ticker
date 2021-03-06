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

  const handleRemoveStock = (id: string) => {
    setSelectedStocks((selected) => {
      return selected.filter(({ id: chosenId }) => id !== chosenId);
    });
  };

  const renderPinnedStocks = (stocks: SearchResult[]) => {
    return stocks.map(({ symbol, name, id }) => {
      const handleRemove = () => handleRemoveStock(id);
      return (
        <StockDetails
          key={id}
          symbol={symbol}
          name={name}
          onRemoveStock={handleRemove}
        />
      );
    });
  };

  const showStockSelector = selectedStocks.length < 3;

  return (
    <main className={styles.app}>
      <h1>Stock Comparison</h1>
      {showStockSelector && <StockSelector onSelectStock={handleSelectStock} />}
      <section className={styles.comparisonList}>
        {renderPinnedStocks(selectedStocks)}
      </section>
    </main>
  );
}

export default App;
