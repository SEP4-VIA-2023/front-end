import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from 'axios';
import "./profile.scss";

//constants
const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`handleChange event - name: ${name}, value: ${value}`); // Added log
    setProfile(prevProfile => {
      const updatedProfile = { ...prevProfile, [name]: value };
      console.log('Updated profile in handleChange:', updatedProfile); // Added log
      return updatedProfile;
    });
  };

  //connects to backend and gets all profiles following the structure under it, since this is what the backend returns
  useEffect(() => {
    console.log('useEffect triggered'); // Added log
    axios.get('https://backend-esqp5xwphq-od.a.run.app/api/presets/1', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('Axios get response:', response.data); // Added log
        setProfiles(response.data);
        setProfile(response.data[0]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const createNewProfile = () => {
    console.log('Creating new profile'); // Added log
    return {
      id: 0,
      name: '',
      minHumidity: 0,
      maxHumidity: 0,
      minCo2: 0,
      maxCo2: 0,
      minTemperature: 0,
      maxTemperature: 0,
      servo: -100,
      deviceId: 1,
      device: null
    };
  };

  //Handles the add of a new profile to the backend
  const handleAdd = () => {
    if (!profile) return;
    const newProfile = { ...profile };
    axios.post('https://backend-esqp5xwphq-od.a.run.app/api/presets/create', newProfile, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        const addedProfile = response.data;
        setProfiles(oldProfiles => [...oldProfiles, addedProfile]);
        setProfile(addedProfile);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  //Handles the save to the backend
  const handleSave = () => {
    console.log('Saving profile:', profile); // Added log
    // if profile is null, create a new profile
    if (!profile) {
      setProfile(createNewProfile());
      return;
    }

    // Here we create a copy of the profile object to ensure that it has the most recent changes
    const profileToUpdate = {...profile};

    const existingProfileIndex = profiles.findIndex((p) => p.id === profile.id);
  
    if (existingProfileIndex >= 0) { // The profile already exists, so we should update it
      axios.put(`https://backend-esqp5xwphq-od.a.run.app/api/presets/${profile.id}`, profileToUpdate, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          console.log('Axios put response:', response.data); // Added log
          const updatedProfile = response.data;
          const updatedProfiles = profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p);
          setProfiles(updatedProfiles);
          setProfile(updatedProfile);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else { // The profile does not exist, so we should create it
      axios.post('https://backend-esqp5xwphq-od.a.run.app/api/presets/create', profileToUpdate, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          console.log('Axios post response:', response.data); // Added log
          const newProfile = response.data;
          setProfiles(oldProfiles => [...oldProfiles, newProfile]);
          setProfile(newProfile);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  //Handles the selecting from the backend using a dropdown menu
  const handleSelect = (event) => {
    const selectedProfileId = parseInt(event.target.value);
    console.log(`handleSelect event - selected profile id: ${selectedProfileId}`); // Added log
    const selectedProfile = profiles.find(profile => profile.id === selectedProfileId);
    setProfile(selectedProfile);
  };

  //Handles the activation of the profile, should send the id of the profile to the backend
  const handleActivate = (profileToActivate) => {
    console.log('Activating profile:', profileToActivate); // Added log
    setActiveProfile(profileToActivate);
    // TODO: send to backend when we have the endpoint
  };

  //Handles the deletion of the profile, should request the deletion from the backend on the same endpoint as the GET
  const handleDiscard = () => {
    console.log('Discard button clicked'); // Added log
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
        <button className="addButton" onClick={handleAdd}>
          Add
        </button>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
