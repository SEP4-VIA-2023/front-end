import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

it("renders Sidebar component", () => {
  render(
    <HashRouter>
      <Sidebar />
    </HashRouter>
  );
  const dashboardTabs = screen.queryAllByText(/Dashboard/i);
  expect(dashboardTabs.length).toBeGreaterThan(0);
});

it("renders Sidebar component with all tabs", () => {
  render(
    <HashRouter>
      <Sidebar />
    </HashRouter>
  );
  const dashboardTitle = screen.getByText(/Sep4 Group 1/i);
  const dashboardTabs = screen.queryAllByText(/Dashboard/i);
  const profileTabs = screen.queryAllByText(/Profile/i);
  const logoutTabs = screen.queryAllByText(/Logout/i);

  expect(dashboardTitle).toBeInTheDocument();
  expect(dashboardTabs.length).toBeGreaterThan(0);
  expect(profileTabs.length).toBeGreaterThan(0);
  expect(logoutTabs.length).toBeGreaterThan(0);
});
