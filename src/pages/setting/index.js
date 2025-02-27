import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url, config } from "../../Url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./SettingsPage.css";
import defaultProfilePicture from "../../images/def_admin_logo.avif";

const SettingsPage = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [shopName, setShopName] = useState("");
    const navigate = useNavigate();

    // Fetch user data on component mount
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${Url}/user`, config);
            const userData = response.data.payload[0];
            if (userData.profileImage) {
                setProfilePicture(`http://localhost:5500${userData.profileImage}`);
            } else setProfilePicture(defaultProfilePicture);
            setEmail(userData.email || "N/A");
            setUsername(userData.username || "N/A");
            setFirstName(userData.firstName || "N/A");
            setLastName(userData.lastName || "N/A");
            setCity(userData.city || "N/A");
            setState(userData.state || "N/A");
            setShopName(userData.shopName || "N/A");
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            toast.error("Failed to load user data.");
        }
    };

    // Call fetchUserData inside useEffect
    useEffect(() => {
        fetchUserData();
    }, []);

    // Handle profile picture update
    const handleUpdateProfilePicture = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("profileImage", file);

            try {
                await axios.put(`${Url}/user/update-profile`, formData, {
                    headers: {
                        ...config.headers,
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Profile picture updated successfully!");
                fetchUserData();
            } catch (error) {
                console.error("Failed to update profile picture:", error);
                toast.error("Failed to update profile picture.");
            }
        }
    };

    // Handle profile update
    const handleUpdateProfile = async () => {
        const updatedData = { username, firstName, lastName, email, city, state, shopName };

        try {
            await axios.put(`${Url}/user/update-profile`, updatedData, config);
            toast.success("Profile updated successfully!");
            setIsEditMode(false);
            fetchUserData();
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error(error.response?.data?.message || "Failed to update profile.");
        }
    };

    // Handle password change
    const handleChangePassword = async () => {
        if (newPassword.length < 3) {
            toast.error("Password must be at least 3 characters long.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await axios.put(`${Url}/user/change-password`, { password: currentPassword, newPassword }, config);
            toast.success("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Failed to update password:", error);
            toast.error(error.response?.data?.message || "Failed to update password.");
        }
    };

    // Handle delete account
    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteAccount = async () => {
        try {
            await axios.delete(`${Url}/user`, config);
            toast.success("Account deleted successfully!");
            localStorage.removeItem("token");
            setTimeout(() => navigate("/signup"), 1000);
        } catch (error) {
            console.error("Failed to delete account:", error);
            toast.error(error.response?.data?.message || "Failed to delete account.");
        }
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>

            {/* Profile Picture Section */}
            <div className="profile-section">
                <div className="profile-picture-container">
                    {/* <img src={profilePicture} alt="Profile" className="profile-picture" /> */}
                    <img src={`${profilePicture}`} alt="Profile" className="profile-picture" />

                    <button className="edit-icon-button" onClick={() => document.querySelector(".profile-picture-upload").click()}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpdateProfilePicture}
                        className="profile-picture-upload"
                        hidden
                    />
                </div>
            </div>

            {/* Personal Info Section */}
            <div className="personal-info-section">
                <div className="section-header">
                    <h2 className="section-title">Personal Info</h2>
                    {!isEditMode ? (
                        <button
                            className="edit-mode-button"
                            onClick={() => setIsEditMode(true)}
                        >
                            <FontAwesomeIcon icon={faEdit} /> Edit Profile
                        </button>
                    ) : (
                        <button
                            className="edit-mode-button cancel-button"
                            onClick={() => setIsEditMode(false)}
                        >
                            <FontAwesomeIcon icon={faTimes} /> Cancel
                        </button>
                    )}
                </div>

                {/* User Info Fields */}
                <div className="info-fields">
                    <div className="info-field">
                        <label>Email</label>
                        {isEditMode ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        ) : (
                            <p>{email}</p>
                        )}
                    </div>
                    <div className="info-field">
                        <label>Username</label>
                        {isEditMode ? (
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        ) : (
                            <p>{username}</p>
                        )}
                    </div>
                    <div className="info-field">
                        <label>First Name</label>
                        {isEditMode ? (
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        ) : (
                            <p>{firstName}</p>
                        )}
                    </div>
                    <div className="info-field">
                        <label>Last Name</label>
                        {isEditMode ? (
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        ) : (
                            <p>{lastName}</p>
                        )}
                    </div>
                    <div className="info-field">
                        <label>City</label>
                        {isEditMode ? (
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        ) : (
                            <p>{city}</p>
                        )}
                    </div>
                    <div className="info-field">
                        <label>State</label>
                        {isEditMode ? (
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        ) : (
                            <p>{state}</p>
                        )}
                    </div>
                    <div className="info-field full-width">
                        <label>Shop Name</label>
                        {isEditMode ? (
                            <input
                                type="text"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                            />
                        ) : (
                            <p>{shopName}</p>
                        )}
                    </div>
                </div>

                {/* Save Button (Visible only in Edit Mode) */}
                {isEditMode && (
                    <div className="save-button">
                        <button className="save-icon-button" onClick={handleUpdateProfile}>
                            <FontAwesomeIcon icon={faSave} /> Save Changes
                        </button>
                    </div>
                )}
            </div>

            {/* Login & Security Section */}
            <div className="login-security-section">
                <h2 className="section-title">Login & Security</h2>
                <div className="password-section">
                    <label>Change Password</label>
                    <div className="password-fields">
                        <input
                            type="password"
                            className="settings-input"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current Password"
                        />
                        <input
                            type="password"
                            className="settings-input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                        />
                        <input
                            type="password"
                            className="settings-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                        />
                        <button className="settings-button" onClick={handleChangePassword}>
                            Update Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Account Section */}
            <div className="delete-account-section">
                <h2 className="section-title">Delete Account</h2>
                <div className="delete-warning">
                    <p>What happens when you delete your account:</p>
                    <ul>
                        <li>All your Products and Bills will be deleted.</li>
                        <li>All associated data will be deleted.</li>
                        <li>None of the above can be reversed.</li>
                    </ul>
                </div>
                <button className="delete-account-button" onClick={handleDeleteAccount}>
                    Delete My Account
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal delete-account-modal">
                    <div className="modal-content">
                        <h2>Are you sure?</h2>
                        <p>Do you really want to delete your account? This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button className="modal-button confirm-button" onClick={confirmDeleteAccount}>
                                Yes, Delete
                            </button>
                            <button className="modal-button cancel-button" onClick={() => setShowDeleteModal(false)}>
                                No, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Toast Notification Container */}
            <ToastContainer />
        </div>
    );
};

export default SettingsPage;