import { useDebounce } from "./useDebounce";
import { render, act, screen } from "@testing-library/react";

jest.useFakeTimers("modern");

describe("useDebounce", () => {
  it("should put initialized value in first render", () => {
    function Component() {
      const debouncedValue = useDebounce("Hello world", 1000);
      return <div>{debouncedValue}</div>;
    }
    render(<Component />);
    const resultText = screen.getByText(/hello world/i);
    expect(resultText).toBeInTheDocument;
  });

  it("will update value when timer is called", () => {
    function Component({ text }: { text: string }) {
      const value = useDebounce(text, 1000);
      return <div>{value}</div>;
    }

    const { rerender } = render(<Component text={"Hello"} />);

    const resultText = screen.getByText(/hello/i);

    expect(resultText).toBeInTheDocument();

    act(() => {
      rerender(<Component text="Hello world" />);
    });

    // timeout shouldn't have called yet
    expect(resultText).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    // after runAllTimer text should be updated
    const updatedText = screen.getByText(/hello world/i);
    expect(updatedText).toBeInTheDocument();
  });
});
