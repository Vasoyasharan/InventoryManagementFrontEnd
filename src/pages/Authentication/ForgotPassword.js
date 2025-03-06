import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Url } from "../../Url";
import { toast } from "react-toastify";
import "./ForgotPassword.css";
import loginImage from "../../images/loginImage.png";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        if (!email || !email.includes("@")) {
            setErrors({ email: "Please enter a valid email address." });
            return;
        }

        try {
            const response = await axios.post(`${Url}/user/send-otp`, { email });
            if (response.data.success) {
                setOtpSent(true);
                toast.success("OTP sent to your email.");
            } else {
                toast.error("Email does not exist.");
            }
        } catch (error) {
            console.error("Failed to send OTP:", error);
            toast.error("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 4) {
            setErrors({ otp: "Please enter a valid 4-digit OTP." });
            return;
        }

        try {
            const response = await axios.post(`${Url}/user/verify-otp`, { email, otp });
            if (response.data.success) {
                setIsVerified(true);
                toast.success("OTP verified successfully.");
            } else {
                toast.error("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("Failed to verify OTP:", error);
            toast.error("Failed to verify OTP. Please try again.");
        }
    };

    const handleResetPassword = async () => {
        navigate("/reset-password", { state: { email } });
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-card">
                <div className="forgot-password-image">
                    <img
                        src={loginImage}
                        alt="Forgot Password Illustration"
                        className="img-fluid"
                    />
                </div>
                <div className="forgot-password-form">
                    <h2>Forgot Password</h2>
                    <p className="instruction-text">
                        Enter your email address to receive an OTP and reset your password.
                    </p>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={otpSent}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    {!otpSent ? (
                        <button
                            className="btn btn-primary w-100"
                            onClick={handleSendOtp}
                        >
                            Send OTP
                        </button>
                    ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="otp">OTP</label>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    name="otp"
                                    className="form-control"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    disabled={isVerified}
                                />
                                {errors.otp && (
                                    <span className="error-message">{errors.otp}</span>
                                )}
                            </div>

                            {!isVerified ? (
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={handleVerifyOtp}
                                >
                                    Verify OTP
                                </button>
                            ) : (
                                <button
                                    className="btn btn-success w-100"
                                    onClick={handleResetPassword}
                                >
                                    Reset Password
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;