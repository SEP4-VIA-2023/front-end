import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    //simple test to make sure it goes to login page
    const signInElements = screen.getAllByText(/sign in/i);
    expect(signInElements.length).toBeGreaterThanOrEqual(1);
  });
});
