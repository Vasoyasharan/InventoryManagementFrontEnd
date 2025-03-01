import React, { useState } from "react";
import axios from "axios";
import { Url } from "../../Url";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./ResetPassword.css";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || ""; // Get email from ForgotPassword.js

    const handleResetPassword = async () => {
        // Check if email exists
        if (!email) {
            toast.error("Error: No email provided.");
            return;
        }

        // Validate passwords
        if (newPassword.length < 3) {
            setErrors({ newPassword: "Password must be at least 3 characters long." });
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match." });
            return;
        }

        try {
            // Send password reset request
            const response = await axios.put(`${Url}/user/reset-password`, {
                email,
                password: newPassword
            });

            if (response.data.success) {
                toast.success("Password reset successfully.");
                navigate("/login");
            } else {
                toast.error(response.data.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error("Error resetting password. Try again.");
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-card">
                <h2>Reset Password</h2>
                <p className="instruction-text">Enter your new password below.</p>

                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        name="newPassword"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {errors.newPassword && (
                        <span className="error-message">{errors.newPassword}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        name="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && (
                        <span className="error-message">{errors.confirmPassword}</span>
                    )}
                </div>

                <button
                    className="btn btn-success w-100"
                    onClick={handleResetPassword}
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
