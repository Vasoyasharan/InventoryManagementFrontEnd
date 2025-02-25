import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faFileAlt,
  faShieldAlt,
  faHeadset,
  faSignOutAlt,
  faCog,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Css/CustomModal.css";

// Username fetching from api
    const userName = (localStorage.getItem("username") || "null").toUpperCase();
const Header = () => {
  const [greeting, setGreeting] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning,");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon,");
    } else {
      setGreeting("Good Evening,");
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setShowLogoutModal(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        {/* Greeting */}
        <div className="greeting">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          <span>{greeting} {userName}</span>
        </div>
      </div>
      {/* Search Bar */}
      {/* <div className="navbar-center">
        <input type="text" className="search-bar" placeholder="Search..." />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div> */}
      {/* Navbar Icons */}
      <div className="navbar-right">
        <FontAwesomeIcon icon={faBell} className="navbar-icon" title="Notifications" />
        <FontAwesomeIcon
          icon={faFileAlt}
          className="navbar-icon"
          title="Terms & Conditions"
          onClick={() => navigate("/terms-conditions")}
        />
        <FontAwesomeIcon
          icon={faShieldAlt}
          className="navbar-icon"
          title="Privacy Policy"
          onClick={() => navigate("/privacy-policy")}
        />
        <FontAwesomeIcon
          icon={faHeadset}
          className="navbar-icon"
          title="Customer Care"
          onClick={() => navigate("/customer-care")}
        />
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="navbar-icon"
          title="Sign Out"
          onClick={() => setShowLogoutModal(true)} // Show the modal
        />
        <FontAwesomeIcon icon={faCog} className="navbar-icon spin-icon" title="Settings" 
        onClick={() => navigate("/setting")}/>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Logout</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleLogout} // Handle logout
              >
                Logout
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowLogoutModal(false)} // Close the modal
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;