import { NavLink, useNavigate } from "react-router-dom";
import "../Css/Sidebar.css";
import React from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faFileContract, faShieldAlt } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
    const navigate = useNavigate();

    // Username stored in local storage
    const userName = localStorage.getItem("userName") || "null";

    const getCurrentGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return "Good Morning";
        } else if (currentHour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to Log Out")) {
            localStorage.clear();
            navigate("/login");
            return toast.success("Logout Successfully");
        }
    };

    const goToTerms = () => {
        navigate("/terms-conditions");
    };

    return (
        <React.Fragment>
            <header className="navbar sticky-top flex-md-nowrap shadow">
                <NavLink className="navbar-brand me-0 px-3" to="/dashboard">
                    <img src={`${process.env.PUBLIC_URL}/inventoryLogo.png`} alt="logo" style={{ width: "249px", height: "55px" }} />
                </NavLink>
                <div className="navbar-text text-dark ms-3">
                    Hello <u>{userName}</u>, <i>{getCurrentGreeting()}</i>
                </div>

                <div className="navbar-actions ms-auto d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={goToTerms}>
                        <FontAwesomeIcon icon={faFileContract} className="me-1" />
                        Terms & Conditions
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/privacy-policy")}>
                        <FontAwesomeIcon icon={faShieldAlt} className="me-1" />
                        Privacy Policy
                    </button>

                    <div className="logout-btn" onClick={handleLogout}>
                        LogOut
                        <FontAwesomeIcon icon={faRightFromBracket} size="2x" className="mx-2" />
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;
