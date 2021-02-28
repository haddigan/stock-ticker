import { render, screen } from "@testing-library/react";
import { StockSelector } from "./StockSelector";

it("renders search bar", () => {
  render(<StockSelector />);
  const searchInput = screen.getByRole("textbox");
  expect(searchInput).toBeInTheDocument();
});
