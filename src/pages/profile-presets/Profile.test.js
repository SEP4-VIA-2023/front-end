import { render, screen, waitFor } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Profile from "./Profile";
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  axios.get.mockReset();
});

it("renders Profile component with PROFILE-PRESETS title", async () => {
  // Mock the axios.get method
  axios.get.mockResolvedValueOnce({
    data: [
      {
        id: 1,
        name: "Profile 1",
        // include other properties as per your profile object
      },
    ],
  });

  render(
    <HashRouter>
      <Profile />
    </HashRouter>
  );

  await waitFor(async () => {
    // Wait for the "PROFILE-PRESETS" title to appear
    const profilePresetsTitle = await screen.findByText(/PROFILE-PRESETS/i);

    // Test if PROFILE-PRESETS title is in the document
    expect(profilePresetsTitle).toBeInTheDocument();
  });
});
