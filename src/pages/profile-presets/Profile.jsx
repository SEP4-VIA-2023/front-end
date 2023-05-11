import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Profile = () => {
  const [profile, setProfile] = useState({
    title: "",
    co2: "",
    humidity: "",
    temperature: ""
  });

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
    // Add your save logic here
    console.log("Saved: ", profile);

    // For example, add the new CO2 value to the graph
    setCo2Data(oldData => [...oldData, {name: profile.title, CO2: parseInt(profile.co2)}]);
  };

  return (
    <div>
      <h2>Select Profile</h2>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={profile.title}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="CO2 Set Value"
        name="co2"
        value={profile.co2}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Humidity Set Value"
        name="humidity"
        value={profile.humidity}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Temperature Set Value"
        name="temperature"
        value={profile.temperature}
        onChange={handleChange}
      />

      <button onClick={handleDiscard}>Discard</button>
      <button onClick={handleSave}>Save</button>

      <h2>CO2 Chart</h2>
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
