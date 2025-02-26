import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url, config } from "../../Url";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import "./SettingsPage.css";
import defaultProfilePicture from "../../images/def_admin_logo.avif"; // Correct path

const SettingsPage = ({ userID }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [profilePicture, setProfilePicture] = useState(defaultProfilePicture); // Set default image
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [shopName, setShopName] = useState("");
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const navigate = useNavigate();
    const params = useParams();


    // Fetch user data on component mount
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${Url}/user`, config);
            if (response.data.profilePicture) {
                setProfilePicture(response.data.payload[0]); // Update profile picture if available
            }
            setEmail(response.data.payload[0].email || "N/A");
            setUsername(response.data.payload[0].username || "N/A");
            setFirstName(response.data.payload[0].firstName || "N/A");
            setLastName(response.data.payload[0].lastName || "N/A");
            setCity(response.data.payload[0].city || "N/A");
            setState(response.data.payload[0].state || "N/A");
            setShopName(response.data.payload[0].shopName || "N/A");
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
            formData.append("profilePicture", file);

            try {
                const response = await axios.put(`${Url}/user/profile-picture`, formData, {
                    headers: {
                        ...config.headers,
                        "Content-Type": "multipart/form-data",
                    },
                });
                setProfilePicture(response.data.profilePicture); // Update profile picture in state
                toast.success("Profile picture updated successfully!");
            } catch (error) {
                console.error("Failed to update profile picture:", error);
                toast.error("Failed to update profile picture.");
            }
        }
    };

    // Handle email update
    const handleUpdateEmail = async () => {
        // event.preventDefault();
        const updatedData = { username, firstName, lastName, email, city, state, shopName };
        if (!email || !email.includes("@")) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            await axios.put(`${Url}/user/update-profile`, updatedData, config);
            toast.success("User updated successfully!");
            fetchUserData();
        } catch (error) {
            console.error("Failed to update email:", error);
            toast.error(error.response?.data?.message || "Failed to update email.");
        }
    };

    // Handle password change
    const handleChangePassword = async () => {
        if (newPassword.length < 5) {
            toast.error("Password must be at least 5 characters long.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await axios.put(
                `${Url}/user`,
                { currentPassword, newPassword },
                config
            );
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
            <div className="settings-section">
                <div className="profile-picture-container">
                    <img src={profilePicture} alt="Profile" className="profile-picture" />
                    <button className="edit-icon-button" onClick={() => document.querySelector(".profile-picture-upload").click()} >
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
            <div className="settings-section">
                <h2 className="section-title">Personal Info</h2>

                {/* Toggle Edit Mode Button */}
                <div className="edit-mode-toggle">
                    <button
                        className="edit-mode-button"
                        onClick={() => setIsEditMode(!isEditMode)}
                    >
                        {isEditMode ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                {/* First Name and Last Name (Side by Side) */}
                <div className="row">
                    <div className="info-field">
                        <label>Email</label>
                        <div className="field-value">
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className="info-field">
                        <label>User Name</label>
                        <div className="field-value">
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
                    </div>
                    <div className="info-field">
                        <label>First Name</label>
                        <div className="field-value">
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
                    </div>
                    <div className="info-field">
                        <label>Last Name</label>
                        <div className="field-value">
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
                    </div>
                </div>

                {/* City and State (Side by Side) */}
                <div className="row">
                    <div className="info-field">
                        <label>City</label>
                        <div className="field-value">
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
                    </div>
                    <div className="info-field">
                        <label>State</label>
                        <div className="field-value">
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
                    </div>
                </div>

                {/* Shop Name (Full Width) */}
                <div className="info-field full-width">
                    <label>Shop Name</label>
                    <div className="field-value">
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
                        <button className="save-icon-button" onClick={handleUpdateEmail}>
                            <FontAwesomeIcon icon={faSave} /> Save Changes
                        </button>
                    </div>
                )}
            </div>



            {/* Login & Security Section */}
            <div className="settings-section">
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
            <div className="settings-section delete-section">
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