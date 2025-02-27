import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFileAlt, faShieldAlt, faHeadset, faSignOutAlt, faCog, faSearch, faUser, } from "@fortawesome/free-solid-svg-icons";
import defaultProfilePicture from "../images/def_admin_logo.avif"
import { useNavigate } from "react-router-dom";
import "../Css/CustomModal.css";
// import "../Css/Header.css"
import { Url, config } from "../Url"

// Username fetching from api
const userName = (localStorage.getItem("username") || "null").toUpperCase();
const Header = () => {
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [greeting, setGreeting] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set greeting based on time
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning,");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon,");
    } else {
      setGreeting("Good Evening,");
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${Url}/user`, config);
        const userData = response.data.payload[0];
        if (userData?.profileImage) {
          setProfilePicture(`http://localhost:5500${userData.profileImage}`);
        } else {
          setProfilePicture(defaultProfilePicture);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []); // Runs once on component mount

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
        <FontAwesomeIcon icon={faFileAlt} className="navbar-icon" title="Terms & Conditions" onClick={() => navigate("/terms-conditions")} />
        <FontAwesomeIcon icon={faShieldAlt} className="navbar-icon" title="Privacy Policy" onClick={() => navigate("/privacy-policy")} />
        <FontAwesomeIcon icon={faHeadset} className="navbar-icon" title="Customer Care" onClick={() => navigate("/customer-care")} />
        <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon" title="Sign Out" onClick={() => setShowLogoutModal(true)} />
        <FontAwesomeIcon icon={faCog} className="navbar-icon spin-icon" title="Settings" onClick={() => navigate("/setting")} />
        <div
          className="profile-picture-container"
          onClick={() => navigate("/setting")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            marginLeft: "12px", // Space between last icon and image
          }}
        >
          <img
            src={profilePicture}
            alt="Profile"
            className="profile-picture"
            style={{
              width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", border: "2px solid #007bff", transition: "transform 0.2s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
        </div>

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