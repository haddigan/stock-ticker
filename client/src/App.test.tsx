import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders a heading", () => {
  render(<App />);
  const headingText = screen.getByText(/stock comparison/i);
  expect(headingText).toBeInTheDocument();
});

it.todo("displays a stock when one is chosen from the dropdown");

it.todo("shows up to three pinned stocks");

it.todo("removes a stock from the pinned stocks");

it.todo("renders error states");
