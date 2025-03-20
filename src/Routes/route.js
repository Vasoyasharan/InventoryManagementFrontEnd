import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import axios from "axios";
import { Url, config } from "../Url";
import ExpiryPopup from "../component/ExpiryPopup"; // Import the custom popup
import moment from "moment";

const AuthProtected = (props) => {
    const Cmp = props.element;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    return <Cmp />;
};

const ProtectedRoute = (props) => {
    const Cmp = props.element;
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(null);
    const [reload, setReload] = useState(false);
    const [showExpiryPopup, setShowExpiryPopup] = useState(false); // State to control expiry popup

    // Fetch user data and check plan expiry
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${Url}/user`, config);
            const userData = response.data.payload[0];

            // Set profile picture
            if (userData.profileImage) {
                setProfilePicture(`http://localhost:5500${userData.profileImage}`);
            }

            // Check if the plan has expired
            const today = moment();
            const expiryDate = moment(userData.expiryDate);
            const isPlanExpired = today.isAfter(expiryDate);

            if (isPlanExpired && userData.plan.includes("Expired")) {
                setShowExpiryPopup(true); // Show expiry popup
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            fetchUserData();
        }
    }, [navigate, reload]);

    // Handle expiry popup close
    const handleExpiryPopupClose = () => {
        setShowExpiryPopup(false);
        navigate("/premium"); // Redirect to premium page
    };

    return (
        <div className="routes-page">
            <Sidebar fetchUserData={fetchUserData} profilePicture={profilePicture} />
            <div className="w-100">
                <Header />
                <Cmp name={props.name} fetchUserData={fetchUserData} />
            </div>

            {/* Expiry Popup */}
            {showExpiryPopup && (
                <ExpiryPopup onClose={handleExpiryPopupClose} />
            )}
        </div>
    );
};

export { ProtectedRoute, AuthProtected };