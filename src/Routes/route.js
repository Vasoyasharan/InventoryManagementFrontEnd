import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import axios from "axios";
import { Url, config } from "../Url";

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
    const [reload, setReload] = useState(false); // ✅ Add a state to trigger re-fetch

    // ✅ Define fetchUserData to update the profile picture
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${Url}/user`, config);
            const userData = response.data.payload[0];
            if (userData.profileImage) {
                setProfilePicture(`http://localhost:5500${userData.profileImage}`);
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };
useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            fetchUserData(); // ✅ Fetch on mount and when `reload` changes
        }
    }, [navigate, reload]); // ✅ Trigger update when `reload` changes

    return (
        <div className="routes-page">
            <Sidebar fetchUserData={fetchUserData} profilePicture={profilePicture} />
            <div className="w-100">
                <Header />
                <Cmp name={props.name} fetchUserData={fetchUserData} />
            </div>
        </div>
    );
};

export { ProtectedRoute, AuthProtected };
