import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Profile from "./Profile";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

it("renders Profile component with all the UI elements rendered", async () => {
  fetch.mockResponseOnce(
    JSON.stringify([
      { title: "Profile 1", co2: "300", humidity: "30", temperature: "20" },
      { title: "Profile 2", co2: "400", humidity: "40", temperature: "25" },
    ])
  );


  render(
    <HashRouter>
      <Profile />
    </HashRouter>
  );

  await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));


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
