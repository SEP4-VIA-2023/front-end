import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Sidebar from "./Sidebar";




it("renders Sidebar component", () => {
  render(
    <HashRouter>
      <Sidebar />
    </HashRouter>
  );
  const dashboardTab = screen.getByText(/Dashboard/i);
  expect(dashboardTab).toBeInTheDocument();
});

it("renders Sidebar component with all tabs", () => {
  render(
    <HashRouter>
      <Sidebar />
    </HashRouter>
  );
  const dashboardTitle = screen.getByText(/front-end SEP4/i);
  const dashboardTab = screen.getByText(/Dashboard/i);
  const profileTab = screen.getByText(/Profile/i);
  const logoutTab = screen.getByText(/Logout/i);

  expect(dashboardTitle).toBeInTheDocument();
  expect(dashboardTab).toBeInTheDocument();
  expect(profileTab).toBeInTheDocument();
  expect(logoutTab).toBeInTheDocument();
});
