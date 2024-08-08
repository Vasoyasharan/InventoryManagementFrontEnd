import { NavLink, useNavigate } from "react-router-dom";
import "../Css/Sidebar.css";
import React from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import companyLogo from "../../public/inventoryLogo.png"

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
                <NavLink className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/dashboard">
                    <img src={`${process.env.PUBLIC_URL}/inventoryLogo.png`} alt="logo" style={{ width: "250px", height: "55px" }} />
                </NavLink>
                <div className="navbar-text text-dark ms-3">
                    Hello {userName}, {getCurrentGreeting()}
                </div>
                <div className="navbar-nav ms-auto">
                    <div className="link-lg link-dark me-3" style={{ cursor: "pointer" }} onClick={handleLogout}>
                        LogOut
                        <FontAwesomeIcon icon={faRightFromBracket} size="2x" className="mx-2" />
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;
