import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url, config } from "../../Url";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

import "./SettingsPage.css";

const SettingsPage = ({ userID }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    const validatePassword = () => {
        if (newPassword.length < 5) {
            toast.error("Password must be at least 5 characters long.");
            return false;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return false;
        }
        return true;
    };

    const handleChangePassword = async () => {
        const URL = Url + "/user";
        if (validatePassword()) {
            try {
                // Make API request to update the password
                await axios.put(
                    `${URL}`,
                    {
                        password: newPassword, // Send the new password in the request body
                    },
                    config
                );

                toast.success("Password updated successfully!");
                // Optionally: You can navigate the user to a different page after a delay
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            } catch (error) {
                console.log(error);
                // Handle any errors during the API call
                toast.error(error.response?.data?.message || "Failed to update password.");
            }
        }
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteAccount = async () => {
        try {
            const URL = Url + "/user";
            // Make API request to delete the user account
            const response = await axios.delete(`${URL}`, config);

            console.log("RESPONSE : ", response);

            toast.success("Account deleted successfully!");
            localStorage.removeItem("token");

            // Optionally: You can navigate the user to a different page after a delay
            setTimeout(() => {
                navigate("/signup");
            }, 1000);
        } catch (error) {
            console.log(error);
            // Handle any errors during the API call
            toast.error(error.response?.data?.message || "Failed to delete account.");
        }
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Account Settings</h1>

            {/* Password Section */}
            <div className="settings-section">
                <label>Change Password</label>
                <input type="password" className="settings-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
                <input type="password" className="settings-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" />
                <button className="settings-button" onClick={handleChangePassword}>
                    Update Password
                </button>
            </div>

            {/* Delete Account Section */}
            <div className="settings-section delete-section">
                <label>Delete Account</label>

                {/* Warning Section */}
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
