import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { StockDetails } from "./StockDetails";
import fetchMock from "fetch-mock";
import quote from "../../mock/quote.json";
import overview from "../../mock/overview.json";

it("renders stock information", async () => {
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);

  render(
    <StockDetails name="Blackberry Inc" symbol="BB" onRemoveStock={jest.fn()} />
  );
  await waitForElementToBeRemoved(screen.getByText(/loading/i));
  const heading = screen.getByRole("heading", { name: /blackberry inc/i });
  const openPrice = screen.getByText(/open/i);
  const highPrice = screen.getByText(/high/i);
  const lowPrice = screen.getByText(/low/i);

  [heading, openPrice, highPrice, lowPrice].forEach((matcher) =>
    expect(matcher).toBeInTheDocument()
  );
});

it("renders a close button", async () => {
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);

  render(
    <StockDetails name="Blackberry Inc" symbol="BB" onRemoveStock={jest.fn()} />
  );
  await waitForElementToBeRemoved(screen.getByText(/loading/i));

  const button = screen.getByRole("button", { name: "❌" });
  expect(button).toBeInTheDocument();
});

it("fires a handler when close button is clicked", async () => {
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);
  const onRemoveHandler = jest.fn();
  render(
    <StockDetails
      name="Blackberry Inc"
      symbol="BB"
      onRemoveStock={onRemoveHandler}
    />
  );
  await waitForElementToBeRemoved(screen.getByText(/loading/i));

  const button = screen.getByRole("button", { name: "❌" });

  fireEvent.click(button);

  expect(onRemoveHandler).toBeCalled();
});

it("shows a loading state", async () => {
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);

  render(
    <StockDetails name="Blackberry Inc" symbol="BB" onRemoveStock={jest.fn()} />
  );
  await waitFor(() => screen.getByText(/loading/i));
});

it("shows an error state", async () => {
  fetchMock.mock("http://localhost:4000/api/quote/BB", 500);

  render(
    <StockDetails name="Blackberry Inc" symbol="BB" onRemoveStock={jest.fn()} />
  );

  await waitForElementToBeRemoved(screen.getByText(/loading/i));

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});

it("Loads stock overview manually when user clicks the load more details button", async () => {
  fetchMock.mock("http://localhost:4000/api/quote/BB", quote);
  fetchMock.mock("http://localhost:4000/api/overview/BB", overview);

  render(
    <StockDetails name="Blackberry Inc" symbol="BB" onRemoveStock={jest.fn()} />
  );

  await waitForElementToBeRemoved(screen.getByText(/loading/i));

  const button = screen.getByText(/load additional details/i);

  fireEvent.click(button);

  await waitForElementToBeRemoved(screen.getByText(/loading/i));

  const overviewHeading = screen.getByText(/overview/i);

  expect(overviewHeading).toBeInTheDocument();
});
