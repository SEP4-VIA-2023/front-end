import React from "react";
import "./profile.scss";

const ProfileActions = ({ handleDiscard, handleSave }) => (
  <div className="button-container">
    <button onClick={handleDiscard}>Discard</button>
    <button onClick={handleSave}>Save</button>
  </div>
);

export default ProfileActions;
