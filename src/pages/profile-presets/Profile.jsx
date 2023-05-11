import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Profile = () => {
  const profiles = [
    { title: "Profile 1", co2: "400", humidity: "50", temperature: "20" },
    { title: "Profile 2", co2: "500", humidity: "55", temperature: "22" },
    // Add more profiles...
  ];

  const [profile, setProfile] = useState(profiles[0]);
  const [co2Data, setCo2Data] = useState([]);

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleDiscard = () => {
    setProfile({
      title: "",
      co2: "",
      humidity: "",
      temperature: ""
    });
  };

  const handleSave = () => {
    console.log("Saved: ", profile);
    setCo2Data(oldData => [...oldData, { name: profile.title, CO2: parseInt(profile.co2) }]);
  };

  const handleSelect = (event) => {
    const selectedProfile = profiles.find(profile => profile.title === event.target.value);
    setProfile(selectedProfile);
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <div className="profile-selection">
        <label htmlFor="profile-select">Select Profile:</label>
        <select id="profile-select" onChange={handleSelect} value={profile.title}>
          {profiles.map((profile, index) => (
            <option key={index} value={profile.title}>{profile.title}</option>
          ))}
        </select>
      </div>

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
        <label htmlFor="co2-input">CO2 Set Trigger Value:</label>
        <input
          id="co2-input"
          type="number"
          placeholder="CO2 Write Value"
          name="co2"
          value={profile.co2}
          onChange={handleChange}
        />
      </div>

      <div className="setting-item">
        <label htmlFor="humidity-input">Humidity Set Trigger Value:</label>
        <input
          id="humidity-input"
          type="number"
          placeholder="Humidity Write Value"
          name="humidity"
          value={profile.humidity}
          onChange={handleChange}
        />
      </div>

      <div className="setting-item">
        <label htmlFor="temperature-input">Temperature Set Trigger Value:</label>
        <input
          id="temperature-input"
          type="number"
          placeholder="Temperature Write Value"
          name="temperature"
          value={profile.temperature}
          onChange={handleChange}
        />
      </div>

      <div className="button-group">
        <button className="discard-button" onClick={handleDiscard}>Discard</button>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>

      <h2 className="chart-title">CO2 Chart</h2>
      <LineChart width={500} height={300} data={co2Data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="CO2" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Profile;
