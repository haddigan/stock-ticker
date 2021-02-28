import { renderHook } from "@testing-library/react-hooks";
import { useSearch } from "./useSearch";
import * as searchMock from "../mock/searchResults.json";

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
          Object {
            "name": "Applied Micro Circuits Corp",
            "symbol": "AMCC",
          },
          Object {
            "name": "Andatee China Marine Fuel Ser Corp",
            "symbol": "AMCF",
          },
          Object {
            "name": "Albemarle Corporation",
            "symbol": "AMC.FRK",
          },
          Object {
            "name": "Amur Minerals Corporation",
            "symbol": "AMC.LON",
          },
          Object {
            "name": "Arizona Metals Corp",
            "symbol": "AMC.TRV",
          },
          Object {
            "name": "AMEC PLC ORD",
            "symbol": "AMCBF",
          },
          Object {
            "name": "Amcor Plc",
            "symbol": "AMCCF",
          },
          Object {
            "name": "AMERICAN BEACON MIDCAP VALUE FUND C CLASS",
            "symbol": "AMCCX",
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
});
