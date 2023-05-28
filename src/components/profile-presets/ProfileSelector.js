import React from "react";
import "./profile.scss";

const ProfileSelector = ({
  profiles,
  profile,
  activeProfile,
  handleSelect,
  handleActivate,
}) => {
  return (
    <div className="profile-selection">
      <label htmlFor="profile-select">Select Profile:</label>
      <select
        id="profile-select"
        onChange={handleSelect}
        value={profile ? profile.title : ""}
      >
        {profiles.map((profile, index) => (
          <option key={index} value={profile.title}>
            {profile.title}
            {profile.title === activeProfile?.title ? " (Active)" : ""}
          </option>
        ))}
      </select>
      <button
        onClick={() => handleActivate(profile)}
        className={`button ${
          profile && profile.title === activeProfile?.title ? "active" : ""
        }`}
      >
        Activate
      </button>
    </div>
  );
};

export default ProfileSelector;
