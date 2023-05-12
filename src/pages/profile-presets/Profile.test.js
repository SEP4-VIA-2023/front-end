import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Profile from "./Profile";

it("renders Profile component with all the UI elements rendered", () => {
  render(
    <HashRouter>
      <Profile />
    </HashRouter>
  );
  const settingsTitle = screen.getByText(/Settings/i);
  const co2Chart = screen.getByText(/CO2 Chart/i);
  const selectProfile = screen.getByText(/Select Profile/i);
  const discardButton = screen.getByText(/Discard/i);
  const saveButton = screen.getByText(/Save/i);

  expect(settingsTitle).toBeInTheDocument();
  expect(co2Chart).toBeInTheDocument();
  expect(selectProfile).toBeInTheDocument();
  expect(discardButton).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});
