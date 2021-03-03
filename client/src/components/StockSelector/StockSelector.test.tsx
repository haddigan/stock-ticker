import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { StockSelector } from "./StockSelector";
import fetchMock from "fetch-mock";

import searchResults from "../../mock/searchResults.json";

describe("StockSelector component", () => {
  it("renders a combobox", () => {
    render(<StockSelector onSelectStock={() => {}} />);

    const comboboxElement = screen.getByRole("combobox", {
      name: /enter up to three stocks to compare the current stock prices/i,
    });

    expect(comboboxElement).toBeInTheDocument();
  });

  it("gets suggestions from an external api", async () => {
    fetchMock.mock("http://localhost:4000/api/search/BB", searchResults);
    const selectStockHandler = jest.fn();
    render(<StockSelector onSelectStock={selectStockHandler} />);

    fireEvent.change(screen.getByLabelText(/enter up to three stocks/i), {
      target: { value: "BB" },
    });

    await waitFor(() => screen.getByText(/bb - blackberry ltd/i));
    expect(screen.getByText(/bb - blackberry ltd/i)).toBeInTheDocument();
  });

  it("fires an action when a search result is selected", async () => {
    fetchMock.mock("http://localhost:4000/api/search/BB", searchResults);

    const selectStockHandler = jest.fn();
    render(<StockSelector onSelectStock={selectStockHandler} />);

    fireEvent.change(screen.getByLabelText(/enter up to three stocks/i), {
      target: { value: "BB" },
    });

    const searchResult = await waitFor(() =>
      screen.getByText(/bb - blackberry ltd/i)
    );

    fireEvent.click(searchResult);

    expect(selectStockHandler).toBeCalled();
  });

  it("renders a loading state", async () => {
    fetchMock.mock("http://localhost:4000/api/search/BB", searchResults);

    render(<StockSelector onSelectStock={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/enter up to three stocks/i), {
      target: { value: "BB" },
    });

    const loading = await waitFor(() => screen.getByText(/loading/i));
  });

  it("closes once an option is selected", async () => {
    fetchMock.mock("http://localhost:4000/api/search/BB", searchResults);

    render(<StockSelector onSelectStock={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/enter up to three stocks/i), {
      target: { value: "BB" },
    });

    const searchResult = await waitFor(() =>
      screen.getByText(/bb - blackberry ltd/i)
    );

    fireEvent.click(searchResult);

    expect(searchResult).not.toBeInTheDocument();
  });

  it("renders an error state", async () => {
    fetchMock.mock("http://localhost:4000/api/search/BB", 500);

    render(<StockSelector onSelectStock={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/enter up to three stocks/i), {
      target: { value: "BB" },
    });

    const errorText = await waitFor(() =>
      screen.getByText(/something went wrong/i)
    );
  });
});
