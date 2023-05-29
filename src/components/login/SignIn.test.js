import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignIn from "./SignIn";

describe("<SignIn />", () => {
  it("renders the SignIn component", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address *")).toBeInTheDocument();
    expect(screen.getByLabelText("Password *")).toBeInTheDocument();
    expect(screen.getByText("Remember me")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Don't have an account? Sign Up")
    ).toBeInTheDocument();
  });
});
