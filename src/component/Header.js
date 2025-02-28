import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faFileAlt,
  faShieldAlt,
  faHeadset,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import defaultProfilePicture from "../images/def_admin_logo.avif";
import { useNavigate } from "react-router-dom";
import "../Css/CustomModal.css";
import "../Css/Sidebar.css";
import { Url, config } from "../Url";

// Username fetching from API
const userName = (localStorage.getItem("username") || "null").toUpperCase();

const Header = () => {
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [greeting, setGreeting] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setShowLogoutModal(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar">
      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </div>

      {/* Navbar Left (Greeting) */}
      <div className="navbar-left">
        <div className="greeting">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          <span>
            {greeting} {userName}
          </span>
        </div>
      </div>

      {/* Navbar Right (Icons and Profile) */}
      <div className={`navbar-right ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="navbar-icon-container" onClick={() => setShowNotifications(!showNotifications)}>
          <FontAwesomeIcon icon={faBell} className="navbar-icon" title="Notifications" />
          {showNotifications && (
            <div className="notifications-dropdown">
              <p>No new notifications</p>
            </div>
          )}
        </div>
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
        <div
          className="navbar-profile-picture-container"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img
            src={profilePicture}
            alt="Profile"
            className="navbar-profile-picture"
          />
          {showDropdown && (
            <div className="profile-dropdown">
              <div onClick={() => navigate("/setting")}>Settings</div>
              <div onClick={() => setShowLogoutModal(true)}>Logout</div>
            </div>
          )}
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
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowLogoutModal(false)}
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