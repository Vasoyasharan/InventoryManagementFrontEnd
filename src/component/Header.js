import { NavLink, useNavigate } from "react-router-dom";
import "../Css/Dashboard.css";
import React from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const navigate = useNavigate();

  // Username stored in local storage
  const userName = localStorage.getItem('userName') || 'Hardik';

  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to Log Out")) {
      localStorage.clear();
      navigate("/login");
      return toast.success("Logout Successfully");
    }
  };

  return (
    <React.Fragment>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap shadow">
        <NavLink className="navbar-brand bg-dark col-md-3 col-lg-2 me-0 px-3" to="/dashboard">
          Your Own Shop
        </NavLink>
        <div className="navbar-text text-light   ms-3">
          Hello {userName}, {getCurrentGreeting()}
        </div>
        <div className="navbar-nav ms-auto">
          <div className="link-lg link-light me-3" style={{ cursor: "pointer" }} onClick={handleLogout}>
            LogOut<FontAwesomeIcon icon={faRightFromBracket} size="2x" className="mx-2" />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;

