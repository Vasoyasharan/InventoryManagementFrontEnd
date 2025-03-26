import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import { Url } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Form.css";
import signUpImage from "../../images/SignupImage.png";

const Signup = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const URL = Url + "/user/signup";

    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        try {
            if (!errors.username && !errors.password && !errors.email) {
                const res = await axios.post(URL, values);

                if (res.data.success) {
                    console.log("New User Created:", res.data.payload.newUser);
                    navigate("/");
                    return toast.success("Signup Successfully");
                } else {
                    alert("Signup failed");
                    setValues({ username: "", email: "", password: "" });
                }
            }
        } catch (error) {
            console.log(error);
            setValues({ username: "", email: "", password: "" });
            return toast.error(error.response.data.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="signup-image">
                    <img
                        src={signUpImage}
                        alt="Signup Illustration"
                        className="img-fluid"
                    />
                </div>
                <div className="signup-form">
                    <form onSubmit={handleSubmit}>
                        <h6>Your Nest for Smarter Stock Management</h6>
                        <h2>Sign-Up</h2>
                        <hr />

                        {/* Username Input */}
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                name="username"
                                className="form-control"
                                onChange={handleInput}
                                value={values.username}
                            />
                            {errors.username && (
                                <span className="error-message">{errors.username}</span>
                            )}
                        </div>

                        {/* Email Input */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                className="form-control"
                                onChange={handleInput}
                                value={values.email}
                            />
                            {errors.email && (
                                <span className="error-message">{errors.email}</span>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="form-group password-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    name="password"
                                    className="form-control"
                                    onChange={handleInput}
                                    value={values.password}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                    />
                                </button>
                            </div>
                            {errors.password && (
                                <span className="error-message">{errors.password}</span>
                            )}
                        </div>

                        {/* Terms and Conditions Checkbox */}
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="terms">
                                I agree to the terms and conditions
                            </label>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="btn-signup"
                            disabled={!isChecked}
                        >
                            Sign Up
                        </button>

                        {/* Login Link */}
                        <Link to="/login" className="btn-login-link">
                            Already have an account? Login
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;