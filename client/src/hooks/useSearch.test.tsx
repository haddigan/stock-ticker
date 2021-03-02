import { renderHook } from "@testing-library/react-hooks";
import { useSearch } from "./useSearch";

const searchMock = [
  { symbol: "AMC", name: "AMC Entertainment Holdings Inc - Class A" },
  {
    symbol: "AMCA",
    name: "iShares Russell 1000 Pure U.S. Revenue ETF",
  },
];

const mockFetch = (mockData: any) => {
  global.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockData),
    });
  });
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

describe("useSearch Hook", () => {
  beforeEach(() => mockFetch(searchMock));
  afterEach(() => mockFetchCleanUp());

  it("should return an error response", async () => {
    mockFetchError(new Error("test error"));
    const { result, waitForNextUpdate } = renderHook(() => useSearch("AMC"));
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
    const { result, waitForNextUpdate } = renderHook(() => useSearch("AMC"));
    await waitForNextUpdate();
    expect(result.current).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "name": "AMC Entertainment Holdings Inc - Class A",
            "symbol": "AMC",
          },
          Object {
            "name": "iShares Russell 1000 Pure U.S. Revenue ETF",
            "symbol": "AMCA",
          },
        ],
        null,
        Object {
          "hasError": false,
          "isIdle": true,
          "isLoading": false,
        },
      ]
    `);
  });
  it("Should null out list of results when called with empty parameter", async () => {
    const { result } = renderHook(() => useSearch(""));
    expect(result.current).toMatchInlineSnapshot(`
      Array [
        null,
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
