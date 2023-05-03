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
  const dashboardSubTitleMAIN = screen.getByText(/MAIN/i);
  const dashboardTab = screen.getByText(/Dashboard/i);
  const dashboardSubTitleGRAPHS = screen.getByText(/GRAPHS VIEW/i);
  const graphsTabElements = screen.getAllByText(/Graphs/i);
  const dashboardSubTitleUSER = screen.getByText(/USER/i);
  const profileTab = screen.getByText(/Profile/i);
  const logoutTab = screen.getByText(/Logout/i);

  expect(dashboardTitle).toBeInTheDocument();
  expect(dashboardSubTitleMAIN).toBeInTheDocument();
  expect(dashboardTab).toBeInTheDocument();
  expect(dashboardSubTitleGRAPHS).toBeInTheDocument();
  expect(graphsTabElements).toHaveLength(2); // this value can be adjusted based on the number of "Graphs" elements
  expect(dashboardSubTitleUSER).toBeInTheDocument();
  expect(profileTab).toBeInTheDocument();
  expect(logoutTab).toBeInTheDocument();
});
