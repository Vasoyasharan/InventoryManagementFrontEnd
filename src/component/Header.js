import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faFileAlt,
  faShieldAlt,
  faHeadset,
  faCog,
  faSignOutAlt,
  faShop,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import defaultProfilePicture from "../images/def_admin_logo.avif";
import { useNavigate } from "react-router-dom";
import "../Css/CustomModal.css";
import "../Css/Sidebar.css";
import { Url, config } from "../Url";

const Header = () => {
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [shopName, setShopName] = useState("Company Name");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [todayDate, setTodayDate] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Set today's date
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setTodayDate(formattedDate);

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${Url}/user`, config);
        const userData = response.data.payload[0];
        if (userData?.profileImage) {
          setProfilePicture(`http://localhost:5500${userData.profileImage}`);
        }
        if (userData?.shopName) {
          setShopName(userData.shopName);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    // Fetch low stock notifications
    const fetchLowStockNotifications = async () => {
      try {
        const response = await axios.get(`${Url}/product`, config);
        const lowStockNotifications = response.data.payload.productData
          .filter((item) => item.stock <= 5)
          .map((item) => ({
            message: `Low stock for ${item.productName}. Current stock: ${item.stock}. Please reorder!`,
            productId: item._id,
          }));
        setNotifications(lowStockNotifications);
      } catch (error) {
        console.error("Failed to fetch low stock notifications:", error);
      }
    };

    // Fetch tasks for deadline notifications
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${Url}/task`, config);
        setTasks(response.data.payload.taskData);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchUserData();
    fetchLowStockNotifications();
    fetchTasks();
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

  // Get deadline notifications
  const getDeadlineNotifications = () => {
    const now = new Date();
    const nearDeadlineTasks = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      const timeDiff = taskDate - now;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff >= 1 && daysDiff <= 2;
    });

    return nearDeadlineTasks.map((task) => {
      const taskDate = new Date(task.date);
      const timeDiff = taskDate - now;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return {
        message: `Task "${task.taskName}" is due in ${daysDiff} days.`,
        taskId: task._id,
      };
    });
  };

  // Combine low stock and deadline notifications
  const allNotifications = [...notifications, ...getDeadlineNotifications()];

  return (
    <div className="navbar">
      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </div>

      {/* Navbar Left */}
      <div className="navbar-left">
        <div className="shop-name">
          <FontAwesomeIcon icon={faShop} className="user-icon" />
          <span>{shopName}</span>
        </div>
      </div>

      {/* Navbar Right */}
      <div className={`navbar-right ${isMobileMenuOpen ? "open" : ""}`}>
        {/* Today's Date */}
        <div className="today-date">
          <span>{todayDate}</span>
        </div>

        {/* Notification Icon */}
        <div className="navbar-icon-container" onClick={() => setShowNotifications(!showNotifications)}>
          <FontAwesomeIcon icon={faBell} className="navbar-icon" title="Notifications" />
          {allNotifications.length > 0 && (
            <span className="notification-badge">{allNotifications.length}</span>
          )}
          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                Notifications
              </div>

              {/* Notification Items */}
              {allNotifications.length > 0 ? (
                allNotifications.map((notification, index) => (
                  <div key={index} className="notification-item">
                    <p>{notification.message}</p>
                  </div>
                ))
              ) : (
                <div className="notification-item">
                  <p>No new notifications</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Other Icons */}
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

        {/* Profile Picture */}
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
              <div onClick={() => navigate("/setting")}>
                <FontAwesomeIcon icon={faCog} className="dropdown-icon" />
                Settings
              </div>
              <div onClick={() => setShowLogoutModal(true)}>
                <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-icon" />
                Logout
              </div>
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