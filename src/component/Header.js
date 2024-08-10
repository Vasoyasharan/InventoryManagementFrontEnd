import { NavLink, useNavigate } from "react-router-dom";
import "../Css/Sidebar.css";
import React from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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

    return (
        <React.Fragment>
            <header className="navbar sticky-top flex-md-nowrap shadow">
                <NavLink className="navbar-brand me-0 px-3" to="/dashboard">
                    <img src={`${process.env.PUBLIC_URL}/inventoryLogo.png`} alt="logo" style={{ width: "249px", height: "55px" }} />
                </NavLink>
                <div className="navbar-text text-dark ms-3">
                    Hello <u>{userName}</u>, <i>{getCurrentGreeting()}</i>
                </div>

                {/* Button combo  */}
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2" style={{marginLeft:'600px'}}>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary">
                                terms & Conditions
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">
                                Privacy Policy
                            </button>
                        </div>
                    </div>
                </div>

                <div className="navbar-nav ms-auto">
                    <div className="link-lg link-dark" style={{ cursor: "pointer", padding: "6px 10px" }} onClick={handleLogout}>
                        LogOut
                        <FontAwesomeIcon icon={faRightFromBracket} size="2x" className="mx-2" />
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;
