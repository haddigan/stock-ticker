import { StockDetailsView } from "./StockDetailsView";
import { useStockOverview, useStockQuote } from "../../hooks";

export const StockDetails = ({
  symbol,
  name,
  onRemoveStock,
}: {
  name: string;
  symbol: string;
  onRemoveStock: any;
}) => {
  const [stockOverview, , stockOverviewStatus] = useStockOverview(symbol);
  const [stockQuote, , stockQuoteStatus] = useStockQuote(symbol);
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

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {hasError && <div>Error</div>}
      {!isLoading && !hasError && (
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
