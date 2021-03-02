import { renderHook } from "@testing-library/react-hooks";
import { useStockQuote } from "./useStockQuote";

const quoteMock = {
  symbol: "BB",
  price: "$10.9100",
  openPrice: "$10.2900",
  lowPrice: "$10.2900",
  highPrice: "$11.2500",
  changePercent: "8.5572%",
};

const mockFetch = (mockData: any) => {
  global.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockData),
    });
  }) as jest.Mock;
};

const mockFetchError = (error: Error) => {
  global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

// TS has trouble resolving this as a mocked module and so it complains that
// it can't find properties like "mockClear".
const mockFetchCleanUp = () => {
  // @ts-ignore
  global.fetch.mockClear();
  // @ts-ignore
  delete global.fetch;
};

describe("useQuote Hook", () => {
  beforeEach(() => mockFetch(quoteMock));
  afterEach(() => mockFetchCleanUp());

  it("should return an error response", async () => {
    mockFetchError(new Error("test error"));
    const { result, waitForNextUpdate } = renderHook(() => useStockQuote("BB"));
    await waitForNextUpdate();
    expect(result.current).toMatchInlineSnapshot(`
      Array [
        null,
        "test error",
        Object {
          "hasError": true,
          "isIdle": true,
          "isLoading": false,
        },
      ]
    `);
  });

  it("Should return a formatted list of results", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStockQuote("BB"));
    await waitForNextUpdate();
    expect(result.current).toMatchInlineSnapshot(`
      Array [
        Object {
          "changePercent": "8.5572%",
          "highPrice": "$11.2500",
          "lowPrice": "$10.2900",
          "openPrice": "$10.2900",
          "price": "$10.9100",
          "symbol": "BB",
        },
        null,
        Object {
          "hasError": false,
          "isIdle": true,
          "isLoading": false,
        },
      ]
    `);
  });
});
