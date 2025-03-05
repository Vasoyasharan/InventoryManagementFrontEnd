import React from "react";
import { NavLink } from "react-router-dom";
import "../Css/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <aside id="leftsidebar" className="sidebar">
        {/* Branding */}
        <div className="sidebar-brand">
          <NavLink to="/dashboard" className="navbar-brand">
            <i className="fas fa-store"></i>
            <span>StockNest</span>
          </NavLink>
        </div>

        {/* Menu */}
        <div className="sidebar-menu">
          <ul>
            <li>
              <NavLink to="/dashboard" className="menu-item">
                <i className="fas fa-home"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/purchase" className="menu-item">
                <i className="fas fa-file-alt"></i>
                <span>Purchase Bill</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/sale" className="menu-item">
                <i className="fas fa-receipt"></i>
                <span>Sales Bill</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/product" className="menu-item">
                <i className="fas fa-box"></i>
                <span>Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/customer" className="menu-item">
                <i className="fas fa-users"></i>
                <span>Customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/vendor" className="menu-item">
                <i className="fas fa-truck"></i>
                <span>Vendors</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/expense-tracker" className="menu-item">
                <i className="fas fa-wallet"></i>
                <span>Expense Tracker</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/income" className="menu-item">
                <i className="fas fa-coins"></i>
                <span>Income</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/report" className="menu-item">
                <i className="fas fa-chart-line"></i>
                <span>Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/setting" className="menu-item">
                <i className="fas fa-cogs"></i>
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;