import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import inventoryLogo from "../images/inventoryLogo.png";
import { faFileContract, faShieldAlt, faHeadset } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
    const navigate = useNavigate();
    const userName = (localStorage.getItem("username") || "null").toUpperCase();

    const getCurrentGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <header className="navbar sticky-top flex-md-nowrap shadow">
            <NavLink className="navbar-brand me-0 px-3" to="/dashboard">
                <img src={inventoryLogo} alt="logo" style={{ width: "249px", height: "55px" }} />
            </NavLink>
            <div className="navbar-text text-dark ms-3">
                <i>{getCurrentGreeting()}</i> <u>{userName}</u>
            </div>
            <div className="navbar-actions ms-auto d-flex align-items-center">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate("/terms-conditions")}
                >
                    <FontAwesomeIcon icon={faFileContract} className="me-1" />
                    Terms & Conditions
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate("/privacy-policy")}
                >
                    <FontAwesomeIcon icon={faShieldAlt} className="me-1" />
                    Privacy Policy
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate("/customer-care")}
                >
                    <FontAwesomeIcon icon={faHeadset} className="me-1" />
                    Customer Care
                </button>
            </div>
        </header>
    );
};

export default Header;