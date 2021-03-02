import { StockDetailsView } from "./StockDetailsView";
import { useStockOverview, useStockQuote } from "../../hooks";

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
  const [
    stockOverview,
    stockOverviewError,
    stockOverviewStatus,
  ] = useStockOverview(symbol);
  const [stockQuote, stockQuoteError, stockQuoteStatus] = useStockQuote(symbol);
  const {
    isLoading: isLoadingOverview,
    hasError: hasOverviewError,
  } = stockOverviewStatus;
  const {
    isLoading: isLoadingQuote,
    hasError: hasQuoteError,
  } = stockQuoteStatus;

  const isLoading = isLoadingOverview && isLoadingQuote;
  const hasError = hasOverviewError && hasQuoteError;
  const shouldRenderStock = Boolean(stockQuote) && !isLoading && !hasError;

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {hasOverviewError && <div>{stockOverviewError}</div>}
      {hasQuoteError && <div>{stockQuoteError}</div>}
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
