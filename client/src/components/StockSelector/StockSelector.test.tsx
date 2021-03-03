import { render, screen } from "@testing-library/react";
import { StockSelector } from "./StockSelector";

describe("StockSelector component", () => {
  it("Contains a text input", () => {
    render(<StockSelector />);

    const comboboxElement = screen.getByRole("combobox", {
      name: /enter up to three stocks to compare the current stock prices/i,
    });

    expect(comboboxElement).toBeInTheDocument();
  });
});
