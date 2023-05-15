import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [co2Data, setCo2Data] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/data')
      .then(response => response.json())
      .then(data => {
        setProfiles(data);
        setProfile(data[0]); // Use the first profile as the default
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

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

    fetch('http://localhost:3001/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setProfiles(oldProfiles => [...oldProfiles, profile]);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleSelect = (event) => {
    const selectedProfile = profiles.find(profile => profile.title === event.target.value);
    setProfile(selectedProfile);
  };

  // Only render the component if profiles have been fetched
  if (!profile) {
    return <div>Loading...</div>;
  }

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

      <div className="button-container">
        <button onClick={handleDiscard}>Discard</button>
        <button onClick={handleSave}>Save</button>
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
