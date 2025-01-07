import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFileAlt, faShieldAlt, faHeadset, faSignOutAlt, faCog, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning, Michel");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon, Michel");
    } else {
      setGreeting("Good Evening, Michel");
    }
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-left">
        {/* Greeting */}
        <div className="greeting">
    <FontAwesomeIcon icon={faUser} className="user-icon" />
          <span>{greeting}</span>
        </div>
      </div>
      {/* Search Bar */}
      <div className="navbar-center">
        <input type="text" className="search-bar" placeholder="Search..." />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      {/* Navbar Icons */}
      <div className="navbar-right">
        <FontAwesomeIcon icon={faBell} className="navbar-icon" title="Notifications" />
        <FontAwesomeIcon icon={faFileAlt} className="navbar-icon" title="Terms & Conditions" />
        <FontAwesomeIcon icon={faShieldAlt} className="navbar-icon" title="Privacy Policy" />
        <FontAwesomeIcon icon={faHeadset} className="navbar-icon" title="Customer Care" />
        <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon" title="Sign Out" />
        <FontAwesomeIcon icon={faCog} className="navbar-icon spin-icon" title="Settings" />
      </div>
    </div>
  );
};

export default Header;
