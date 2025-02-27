import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ResetPassword.css";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (newPassword.length < 5) {
            setErrors({ newPassword: "Password must be at least 5 characters long." });
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match." });
            return;
        }

        // Simulate password reset
        toast.success("Password reset successfully.");
        navigate("/login");
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-card">
                <h2>Reset Password</h2>
                <p className="instruction-text">
                    Enter your new password below.
                </p>

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