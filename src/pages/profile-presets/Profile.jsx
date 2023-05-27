import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.scss";
import axios from 'axios';


const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/data')
      .then(response => {
        setProfiles(response.data);
        setProfile(response.data[0]);
      })
      .catch(error => {
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
    if (profiles.length <= 1) {
      alert("Stop, you are going to remain with no profiles at all if you delete the only one you have");
    } else {
      axios.delete(`http://localhost:3001/data/${profile.title}`)
        .then(response => {
          console.log(response.data);
          const remainingProfiles = profiles.filter(p => p.title !== profile.title);
          setProfiles(remainingProfiles);

          if (remainingProfiles.length > 0) {
            setProfile(remainingProfiles[0]);
          } else {
            setProfile(null);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleSave = () => {
    const existingProfileIndex = profiles.findIndex((p) => p.title === profile.title);

    if (existingProfileIndex >= 0) {
      const existingProfile = profiles[existingProfileIndex];
      if (JSON.stringify(existingProfile) === JSON.stringify(profile)) {
        alert("Profile with the same name and the same values already exists");
      } else {
        axios.put(`http://localhost:3001/data/${profile.title}`, profile)
          .then(response => {
            console.log(response.data);
            const updatedProfiles = [...profiles];
            updatedProfiles[existingProfileIndex] = response.data.updatedProfile;
            setProfiles(updatedProfiles);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    } else {
      axios.post('http://localhost:3001/data', profile)
        .then(response => {
          console.log(response.data);
          setProfiles(oldProfiles => [...oldProfiles, profile]);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleSelect = (event) => {
    const selectedProfileTitle = event.target.value;
    const selectedProfile = profiles.find(profile => profile.title === selectedProfileTitle);
    setProfile(selectedProfile);
  };

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
