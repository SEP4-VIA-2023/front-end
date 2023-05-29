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
    console.log(`handleChange event - name: ${name}, value: ${value}`);  
    setProfile(prevProfile => {
      const updatedProfile = { ...prevProfile, [name]: value };
      console.log('Updated profile in handleChange:', updatedProfile);  
      return updatedProfile;
    });
  };

  //connects to backend and gets all profiles following the structure under it, since this is what the backend returns
  useEffect(() => {
    console.log('useEffect triggered');  
    axios.get('https://backend-esqp5xwphq-od.a.run.app/api/presets/1', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('Axios get response:', response.data);  
        setProfiles(response.data);
        setProfile(response.data[0]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const createNewProfile = (name, minHumidity, maxHumidity, minCo2, maxCo2, minTemperature, maxTemperature, servo) => {
    console.log('Creating new profile');
    return {
      id: 0,
      name: name,
      minHumidity: minHumidity,
      maxHumidity: maxHumidity,
      minCo2: minCo2,
      maxCo2: maxCo2,
      minTemperature: minTemperature,
      maxTemperature: maxTemperature,
      servo: servo,
      deviceId: 1,
      device: null
    };
  };
  
  
  const handleAdd = () => {
    console.log('Creating new profile');
    const newProfile = createNewProfile(
      profile.name,
      profile.minHumidity,
      profile.maxHumidity,
      profile.minCo2,
      profile.maxCo2,
      profile.minTemperature,
      profile.maxTemperature,
      profile.servo
    );
  
    axios
      .post("https://backend-esqp5xwphq-od.a.run.app/api/presets/create", newProfile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        // Refetch the profiles after a successful create
        axios
          .get("https://backend-esqp5xwphq-od.a.run.app/api/presets/1", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log("Axios get response:", response.data);
            setProfiles(response.data);
            const newlyCreatedProfile = response.data.find(
              (p) => p.name === profile.name
            );
            setProfile(newlyCreatedProfile);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  
  
  

  //Handles the save to the backend
  const handleSave = () => {
    console.log('Saving profile:', profile);
  
    if (!profile) {
      console.log("No profile selected to save.");
      return;
    }
  
    const profileToUpdate = {...profile};
  
    const existingProfileIndex = profiles.findIndex((p) => p.id === profile.id);
  
    if (existingProfileIndex >= 0) { 
      axios.put(`https://backend-esqp5xwphq-od.a.run.app/api/presets/${profile.id}`, profileToUpdate, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          console.log('Axios put response:', response.data);
          
          // Refetch the profiles after a successful save
          axios.get('https://backend-esqp5xwphq-od.a.run.app/api/presets/1', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(response => {
              console.log('Axios get response:', response.data);  
              setProfiles(response.data);
              const updatedProfile = response.data.find(p => p.id === profile.id); // find the updated profile in the list
              setProfile(updatedProfile);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.log("No matching profile found to update.");
    }
  };
  
  

  //Handles the selecting from the backend using a dropdown menu
  const handleSelect = (event) => {
    const selectedProfileId = parseInt(event.target.value);
    console.log(`handleSelect event - selected profile id: ${selectedProfileId}`);
    const selectedProfile = profiles.find((profile) => profile.id === selectedProfileId);
    setProfile(selectedProfile);
  };

  //Handles the activation of the profile, should send the id of the profile to the backend
  const handleActivate = (profileToActivate) => {
    console.log('Activating profile:', profileToActivate);
    setActiveProfile(profileToActivate);
    // TODO: send to backend when we have the endpoint
  };

  //Handles the deletion of the profile, should request the deletion from the backend on the same endpoint as the GET
  const handleDiscard = () => {
    console.log('Discarding profile:', profile);
  
    if (!profile) {
      console.log("No profile selected to discard.");
      return;
    }
  
    axios.delete(`https://backend-esqp5xwphq-od.a.run.app/api/presets/${profile.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log('Axios delete response:', response.data);  
        const remainingProfiles = profiles.filter(p => p.id !== profile.id);
        setProfiles(remainingProfiles);
        
        if (remainingProfiles.length > 0) {
          setProfile(remainingProfiles[0]);  // sets the first profile from the remaining profiles
        } else {
          setProfile(null);
        }
  
        if (activeProfile?.id === profile.id) {
          setActiveProfile(null);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
