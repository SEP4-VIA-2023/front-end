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
  const dashboardTab = screen.getByText(/Dashboard/i);
  const graphsTabElements = screen.getAllByText(/Graphs/i);
  const profileTab = screen.getByText(/Profile/i);
  const logoutTab = screen.getByText(/Logout/i);

  expect(dashboardTab).toBeInTheDocument();
  expect(graphsTabElements).toHaveLength(2); // Adjust this value based on the expected number of elements with "Graphs" text
  expect(profileTab).toBeInTheDocument();
  expect(logoutTab).toBeInTheDocument();
});
