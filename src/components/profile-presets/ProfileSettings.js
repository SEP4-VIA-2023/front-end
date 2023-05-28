import React from "react";
import "./profile.scss";

const ProfileSettings = ({ profile, handleChange }) => (
  <div>
    <div className="setting-item">
      <label htmlFor="title-input">Name:</label>
      <input
        id="title-input"
        type="text"
        placeholder="Name of your profile"
        name="title"
        value={profile.title}
        onChange={handleChange}
      />
    </div>

    <div className="setting-item">
      <label htmlFor="co2-min-input">CO2 Min Value:</label>
      <input
        id="co2-min-input"
        type="number"
        placeholder="CO2 Min Value"
        name="co2Min"
        value={profile.co2Min || ""}
        onChange={handleChange}
      />
    </div>

    <div className="setting-item">
      <label htmlFor="co2-max-input">CO2 Max Value:</label>
      <input
        id="co2-max-input"
        type="number"
        placeholder="CO2 Max Value"
        name="co2Max"
        value={profile.co2Max || ""}
        onChange={handleChange}
      />
    </div>

    <div className="setting-item">
      <label htmlFor="humidity-min-input">Humidity Min Value:</label>
      <input
        id="humidity-min-input"
        type="number"
        placeholder="Humidity Min Value"
        name="humidityMin"
        value={profile.humidityMin || ""}
        onChange={handleChange}
      />
    </div>

    <div className="setting-item">
      <label htmlFor="humidity-max-input">Humidity Max Value:</label>
      <input
        id="humidity-max-input"
        type="number"
        placeholder="Humidity Max Value"
        name="humidityMax"
        value={profile.humidityMax || ""}
        onChange={handleChange}
      />
    </div>

    <div className="setting-item">
      <label htmlFor="temperature-min-input">Temperature Min Value:</label>
      <input
        id="temperature-min-input"
        type="number"
        placeholder="Temperature Min Value"
        name="temperatureMin"
        value={profile.temperatureMin || ""}
        onChange={handleChange}
      />
    </div>

    <div className="setting-item">
      <label htmlFor="temperature-max-input">Temperature Max Value:</label>
      <input
        id="temperature-max-input"
        type="number"
        placeholder="Temperature Max Value"
        name="temperatureMax"
        value={profile.temperatureMax || ""}
        onChange={handleChange}
      />
    </div>

    <div className="setting-item">
      <label htmlFor="servo-function">Servo Function:</label>
      <input
        id="servo-function"
        type="number"
        placeholder="Input a value between -100 and 100"
        name="servoFunction"
        value={profile.servoFunction || ""}
        onChange={handleChange}
        min="-100"
        max="100"
      />
    </div>
  </div>
);

export default ProfileSettings;
