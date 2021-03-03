import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import fetchMock from "fetch-mock";
import App from "./App";

import quote from "./mock/quote.json";
import searchResults from "./mock/searchResults.json";

it("renders a heading", () => {
  render(<App />);
  const headingText = screen.getByText(/stock comparison/i);
  expect(headingText).toBeInTheDocument();
});

it("displays a stock when one is chosen from the dropdown", async () => {
  fetchMock.mock("http://localhost:4000/api/search/BB", searchResults);
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);

  render(<App />);

  fireEvent.change(screen.getByRole("combobox"), { target: { value: "BB" } });

  const searchResult = await waitFor(() =>
    screen.getByText(/bb - blackberry ltd/i)
  );

  fireEvent.click(searchResult);

  await waitForElementToBeRemoved(screen.getByText(/loading/i));
});

it("shows up to three pinned stocks", async () => {
  fetchMock.mock("http://localhost:4000/api/search/bb", searchResults);
  fetchMock.mock("http://localhost:4000/api/search/amc", [
    {
      symbol: "AMC",
      name: "AMC Theatres",
      id: "jdfsklfhs",
    },
  ]);
  fetchMock.mock("http://localhost:4000/api/search/gme", [
    {
      symbol: "GME",
      name: "Gamestop Inc",
      id: "fjdsfhuifhdsl",
    },
  ]);
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);
  fetchMock.mock("http://localhost:4000/api/quote/AMC", quote);
  fetchMock.mock("http://localhost:4000/api/quote/GME", quote);

  const searchAndSelectStock = async (symbol: string, name: string) => {
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: symbol },
    });

    const matcher = new RegExp(`${symbol} - ${name}`, "i");
    const searchResult = await waitFor(() => screen.getByText(matcher));

    fireEvent.click(searchResult);

    await waitForElementToBeRemoved(screen.getByText(/loading/i));
  };

  render(<App />);

  const input = screen.getByRole("combobox");

  await searchAndSelectStock("bb", "blackberry ltd");
  await searchAndSelectStock("gme", "gamestop inc");
  await searchAndSelectStock("amc", "amc theatres");

  expect(input).not.toBeInTheDocument();
});

it("removes a stock from the pinned stocks", async () => {
  fetchMock.mock("http://localhost:4000/api/search/BB", searchResults);
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);

  render(<App />);

  fireEvent.change(screen.getByRole("combobox"), { target: { value: "BB" } });

  const searchResult = await waitFor(() =>
    screen.getByText(/bb - blackberry ltd/i)
  );

  fireEvent.click(searchResult);

  await waitForElementToBeRemoved(screen.getByText(/loading/i));

  const heading = screen.getByRole("heading", { level: 2 });
  const button = screen.getByRole("button", { name: "❌" });

  fireEvent.click(button);

  expect(button).not.toBeInTheDocument();
  expect(heading).not.toBeInTheDocument();
});

it("renders error states", async () => {
  fetchMock.mock("http://localhost:4000/api/search/BB", searchResults);
  fetchMock.mock("http://localhost:4000/api/quote/BB", 500);

  render(<App />);

  fireEvent.change(screen.getByRole("combobox"), { target: { value: "BB" } });

  const searchResult = await waitFor(() =>
    screen.getByText(/bb - blackberry ltd/i)
  );

  fireEvent.click(searchResult);

  await waitForElementToBeRemoved(screen.getByText(/loading/i));

  const error = screen.getByText(/something went wrong/i);

  expect(error).toBeInTheDocument();
});
