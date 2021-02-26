import { useStockApi } from "./useStockApi";
function App() {
  const { response, isLoading, isIdle, error } = useStockApi();
  return (
    <>
      {isIdle && <div>Hello world</div>}
      {isLoading && <div>Loading...</div>}
      {response && <div>{JSON.stringify(response)}</div>}
      {!!error && <div>{error}</div>}
    </>
  );
}

export default App;
