import React, { useState, useEffect } from "react";
import axios from "axios";
import { Url, config } from "../Url"
import { NavLink } from "react-router-dom";
import defaultProfilePicture from "../images/def_admin_logo.avif"

const Sidebar = () => {
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);

  const userName = (localStorage.getItem("username") || "null").toUpperCase();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${Url}/user`, config);
      const userData = response.data.payload[0];
      if (userData?.profileImage) {
        setProfilePicture(`http://localhost:5500${userData.profileImage}`);
      } else {
        setProfilePicture(defaultProfilePicture)
      }

    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="theme-cyan">
      <aside id="leftsidebar" className="sidebar">
        {/* Branding */}
        <NavLink
          className="navbar-brand d-flex align-items-center px-3"
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <i
            className="fas fa-store"
            style={{
              fontSize: "24px",
              color: "#007bff",
              marginRight: "8px",
            }}
          ></i>
          <span style={{ fontSize: "17px", fontWeight: "500" }}>
            Inventory Management
          </span>
        </NavLink>

        {/* User Info */}
        <div className="user-info text-center my-3">
          <div className="image">
            <NavLink to="/profile">
              <img
                src={`${profilePicture}`}
                alt="User"
                style={{
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
            </NavLink>
          </div>
          <div className="detail mt-2">
            <h4><u>{userName}</u></h4>
          </div>
        </div>

        {/* Menu */}
        <div className="menu">
          <ul className="list-unstyled px-3">
            <li>
              <NavLink to="/dashboard" className="d-flex align-items-center py-2">
                <i className="fas fa-home me-3"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/purchase"
                className="d-flex align-items-center py-2"
              >
                <i className="fas fa-file-alt me-3"></i>
                <span>Purchase Bill</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sale"
                className="d-flex align-items-center py-2"
              >
                <i className="fas fa-receipt me-3"></i>
                <span>Sales Bill</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/product"
                className="d-flex align-items-center py-2"
              >
                <i className="fas fa-box me-3"></i>
                <span>Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customer"
                className="d-flex align-items-center py-2"
              >
                <i className="fas fa-users me-3"></i>
                <span>Customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/vendor" className="d-flex align-items-center py-2">
                <i className="fas fa-truck me-3"></i>
                <span>Vendors</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/expense-tracker"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="fas fa-wallet me-3"></i>
                <span>Expense Tracker</span>
              </NavLink>
            </li><li>
              <NavLink
                to="/income"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {/* <i className="fas fa-money-bill me-3"></i> */}
                <i className="fas fa-coins me-3"></i>
                <span>Income</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/report" className="d-flex align-items-center py-2">
                <i className="fas fa-chart-line me-3"></i>
                <span>Reports</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
