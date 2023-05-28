import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import "../../components/profile-presets/profile.scss";
import ProfileSelector from "../../components/profile-presets/ProfileSelector";
import ProfileSettings from "../../components/profile-presets/ProfileSettings";
import ProfileActions from "../../components/profile-presets/ProfileActions";

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };
  
  useEffect(() => {
    axios.get('http://localhost:3001/data')
      .then(response => {
        setProfiles(response.data);
        setProfile(response.data[0]);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    axios.get('http://localhost:3001/activeProfile')
      .then(response => {
        setActiveProfile(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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

  const handleActivate = (profileToActivate) => {
    setActiveProfile(profileToActivate);

    axios.post('http://localhost:3001/activeProfile', profileToActivate)
      .then(response => {
        console.log(response.data);
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
      <Sidebar className="sidebar" />

      <div className="settings-container">
        <div className="profileContainer">
          <h2 className="settings-title">Settings</h2>

          <ProfileSelector
              profiles={profiles}
              profile={profile}
              activeProfile={activeProfile}
              handleSelect={handleSelect}
              handleActivate={handleActivate}
          />

          <ProfileSettings
            profile={profile}
            handleChange={handleChange}
          />

          <ProfileActions
            handleDiscard={handleDiscard}
            handleSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;