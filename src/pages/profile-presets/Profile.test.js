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
  fetch.mockResponseOnce(JSON.stringify([{}]));

  render(
    <HashRouter>
      <Profile />
    </HashRouter>
  );

  // Wait for the "Settings" title to appear
  const settingsTitle = await screen.findByText(/Settings/i);

  //Labels

  const selectProfile = screen.getByText(/Select Profile/i);
  const discardButton = screen.getByText(/Discard/i);
  const saveButton = screen.getByText(/Save/i);

  expect(settingsTitle).toBeInTheDocument();
  expect(selectProfile).toBeInTheDocument();
  expect(discardButton).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();

  //sensors data labels
  const co2Min = screen.getByLabelText(/CO2 Min Value/i);
  const co2Max = screen.getByLabelText(/CO2 Max Value/i);
  const humidityMin = screen.getByLabelText(/Humidity Min Value/i);
  const humidityMax = screen.getByLabelText(/Humidity Max Value/i);
  const temperatureMin = screen.getByLabelText(/Temperature Min Value/i);
  const temperatureMax = screen.getByLabelText(/Temperature Max Value/i);

  expect(co2Min).toBeInTheDocument();
  expect(co2Max).toBeInTheDocument();
  expect(humidityMin).toBeInTheDocument();
  expect(humidityMax).toBeInTheDocument();
  expect(temperatureMin).toBeInTheDocument();
  expect(temperatureMax).toBeInTheDocument();
});
