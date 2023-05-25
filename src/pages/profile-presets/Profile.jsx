import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.scss";

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
    // Remove profile from the local state
    const remainingProfiles = profiles.filter(p => p.title !== profile.title);
    setProfiles(remainingProfiles);
  
    // Check if there are remaining profiles
    if (remainingProfiles.length > 0) {
      // Select the first one from the remaining profiles
      setProfile(remainingProfiles[0]);
    } else {
      // Set the profile state to null if no profiles are left
      setProfile(null);
    }
  
    // Delete the profile from the server
    fetch(`http://localhost:3001/data/${profile.title}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
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
  if (profile === null) {
    return <div>No profiles available.</div>;
  } else if (!profile) {
    return <div>Loading...</div>;
  }


  return (
    <div className="profile">
      <Sidebar className="sidebar" /> {/* This is the sidebar component */}

      <div className="settings-container">
        <div className="profileContainer">
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

          <div className="button-container">
            <button onClick={handleDiscard}>Discard</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
