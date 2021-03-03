import { StockDetailsView } from "./StockDetailsView";
import { useStockApi } from "../../hooks";

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
  const [stockQuote, error, status] = useStockApi("quote", symbol);
  const { isLoading, hasError } = status;
  const shouldRenderStock = Boolean(stockQuote) && !isLoading && !hasError;

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {hasError && <div>{error}</div>}
      {shouldRenderStock && (
        <StockDetailsView
          symbol={symbol}
          name={name}
          quote={stockQuote}
          onRemoveStock={onRemoveStock}
        />
      )}
    </>
  );
};
