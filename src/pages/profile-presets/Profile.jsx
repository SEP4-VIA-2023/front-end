import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from 'axios';
import "./profile.scss";

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  useEffect(() => {
    axios.get('https://backend-esqp5xwphq-od.a.run.app/api/presets/1', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        setProfiles(response.data);
        setProfile(response.data[0]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const createNewProfile = () => ({
    id: 0,
    name: null,
    minHumidity: 0,
    maxHumidity: 0,
    minCo2: 0,
    maxCo2: 0,
    minTemperature: 0,
    maxTemperature: 0,
    servo: -100,
    deviceId: 1,
    device: null
  });

  const handleSave = () => {
    // if profile is null, create a new profile
    if (!profile) {
      setProfile(createNewProfile());
      return;
    }
  
    const existingProfileIndex = profiles.findIndex((p) => p.id === profile.id);
  
    if (existingProfileIndex >= 0) { // The profile already exists, so we should update it
      axios.put(`https://backend-esqp5xwphq-od.a.run.app/api/presets/${profile.id}`, profile, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          console.log(response.data);
          const updatedProfile = response.data;
          const updatedProfiles = profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p);
          setProfiles(updatedProfiles);
          setProfile(updatedProfile);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else { // The profile does not exist, so we should create it
      axios.post('https://backend-esqp5xwphq-od.a.run.app/api/presets/create', profile, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          console.log(response.data);
          const newProfile = response.data;
          setProfiles(oldProfiles => [...oldProfiles, newProfile]);
          setProfile(newProfile);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleSelect = (event) => {
    const selectedProfileId = parseInt(event.target.value);
    const selectedProfile = profiles.find(profile => profile.id === selectedProfileId);
    setProfile(selectedProfile);
  };

  const handleActivate = (profileToActivate) => {
    setActiveProfile(profileToActivate);
    // TODO: send to backend when we have the endpoint
  };

  const handleDiscard = () => {
    // TODO: send to backend when we have the endpoint
  };
  

  if (profile === null) {
    return <div>No profiles available.</div>;
  } else if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
          <h1 className="profileTitle">PROFILE-PRESETS</h1>
        </div>
        <div className="profileRightBottom">
        <div className="profileSelection">
            <label htmlFor="profileSelect">Select Profile:</label>
            <select
              id="profileSelect"
              className="profileSelect"
              onChange={handleSelect}
              value={profile.id}
            >
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
            <button
              className={`activateButton ${profile.id === activeProfile?.id ? "active" : ""}`}
              onClick={() => handleActivate(profile)}
            >
              Activate
            </button>
          </div>
          <div className="profileInfo">
            <div className="profileInfoItem">
              <label htmlFor="nameInput">Name:</label>
              <input
                type="text"
                id="nameInput"
                name="name"
                value={profile.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profileInfoItem">
              <label htmlFor="minHumidityInput">Min Humidity:</label>
              <input
                type="number"
                id="minHumidityInput"
                name="minHumidity"
                value={profile.minHumidity || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profileInfoItem">
              <label htmlFor="maxHumidityInput">Max Humidity:</label>
              <input
                type="number"
                id="maxHumidityInput"
                name="maxHumidity"
                value={profile.maxHumidity || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profileInfoItem">
              <label htmlFor="minCo2Input">Min CO2:</label>
              <input
                type="number"
                id="minCo2Input"
                name="minCo2"
                value={profile.minCo2 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profileInfoItem">
              <label htmlFor="maxCo2Input">Max CO2:</label>
              <input
                type="number"
                id="maxCo2Input"
                name="maxCo2"
                value={profile.maxCo2 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profileInfoItem">
              <label htmlFor="minTemperatureInput">Min Temperature:</label>
              <input
                type="number"
                id="minTemperatureInput"
                name="minTemperature"
                value={profile.minTemperature || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profileInfoItem">
              <label htmlFor="maxTemperatureInput">Max Temperature:</label>
              <input
                type="number"
                id="maxTemperatureInput"
                name="maxTemperature"
                value={profile.maxTemperature || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profileInfoItem">
              <label htmlFor="servoInput">Servo:</label>
              <input
                type="number"
                id="servoInput"
                name="servo"
                value={profile.servo || ""}
                onChange={handleChange}
                min={-100}
                max={100}
              />
            </div>
          </div>
          <div className="profileButtons">
            <button className="discardButton" onClick={handleDiscard}>
              Discard
            </button>
            <button className="saveButton" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;