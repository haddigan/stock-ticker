import { renderHook } from "@testing-library/react-hooks";
import fetchMock from "fetch-mock";
import { useStockApi } from "./useStockApi";

import quote from "../mock/quote.json";

it("returns a response from the api", async () => {
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);
  const { result, waitForNextUpdate } = renderHook(() =>
    useStockApi("quote", "BB")
  );
  await waitForNextUpdate();
  const [response] = result.current;

  expect(JSON.stringify(response)).toBe(JSON.stringify(quote));
});

it("Sets an error if something goes wrong", async () => {
  fetchMock.mock("http://localhost:4000/api/quote/BB", {
    throws: new Error("fetch failed"),
  });
  const { result, waitForNextUpdate } = renderHook(() =>
    useStockApi("quote", "BB")
  );
  await waitForNextUpdate();
  const [response, error, status] = result.current;
  expect(response).toBe(null);
  expect(error).toBe("fetch failed");
  expect(status.hasError).toBe(true);
});

it("handles loading states properly", async () => {
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);
  const { result, waitForNextUpdate } = renderHook(() =>
    useStockApi("quote", "BB")
  );
  const [, , loadingStatus] = result.current;
  expect(loadingStatus.isLoading).toBe(true);
  expect(loadingStatus.isIdle).toBe(false);

  await waitForNextUpdate();
  const [, , loadedStatus] = result.current;

  expect(loadedStatus.isLoading).toBe(false);
  expect(loadedStatus.isIdle).toBe(true);
});

it("sets response to null if no param is passed", async () => {
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);
  const { result } = renderHook(() => useStockApi("quote", ""));
  const [response] = result.current;
  expect(response).toBe(null);
});
