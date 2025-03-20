import React from "react";
import "./ExpiryPopup.css";

const ExpiryPopup = ({ onClose }) => {
  return (
    <div className="expiry-popup-overlay">
      <div className="expiry-popup">
        <h2>Your Plan Has Expired</h2>
        <p>Please upgrade to a premium plan to continue using the service.</p>
        <button onClick={onClose} className="expiry-popup-button">
          OK
        </button>
      </div>
    </div>
  );
};

export default ExpiryPopup;