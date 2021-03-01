import fetch from "node-fetch";
import { makeApiRequest } from "./makeApiRequest";
import { SYMBOL_SEARCH, API_KEY, API_URI } from "./constants";

jest.mock("node-fetch", () => {
  return jest
    .fn()
    .mockResolvedValue({ json: jest.fn().mockResolvedValue({ foo: "bar" }) });
});

describe("makeApiRequest", () => {
  it("Makes an api request to the right endpoint", async () => {
    const SYMBOL = "AMC";
    await makeApiRequest(SYMBOL_SEARCH, SYMBOL);
    expect(fetch).toBeCalledWith(
      `${API_URI}?function=SYMBOL_SEARCH&keywords=${SYMBOL}&apikey=${API_KEY}`
    );
  });

  it("Returns json", async () => {
    const result = await makeApiRequest(SYMBOL_SEARCH, "AMC");
    const testResult = () => JSON.stringify(result);
    expect(testResult).not.toThrow();
  });

  it("Throws an error if response is not json", async () => {
    // @ts-ignore
    fetch.mockImplementationOnce(jest.fn().mockResolvedValue("foo"));

    expect(makeApiRequest(SYMBOL_SEARCH, "AMC")).rejects.toThrow();
  });
});
