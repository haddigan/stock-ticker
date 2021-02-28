import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const headingText = screen.getByText(/stock comparison/i);
  expect(headingText).toBeInTheDocument();
});
