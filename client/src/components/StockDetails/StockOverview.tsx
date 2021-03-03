import { useStockApi } from "../../hooks";
import { LoadingError } from "./LoadingError";

export const StockOverview = ({ symbol }: { symbol: string }) => {
  const [overview, , { isLoading, hasError }] = useStockApi("overview", symbol);

  const showOverview = !isLoading && !hasError && Boolean(overview);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {hasError && <LoadingError />}
      {showOverview && (
        <div style={{ wordBreak: "break-all" }}>{JSON.stringify(overview)}</div>
      )}
    </>
  );
};
