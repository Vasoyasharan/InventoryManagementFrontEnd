import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import { Url } from "../../Url";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Form.css";
import loginImage from "../../images/loginImage.png";

const Login = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const [isChecked, setIsChecked] = useState(false); // Checkbox state
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const URL = Url + "/user/signin";

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
            if (!errors.username && !errors.password) {
                const res = await axios.post(URL, values);
                if (res.data.payload.token) {
                    localStorage.setItem("token", res.data.payload.token);
                    localStorage.setItem("username", res.data.payload.name);
                    navigate("/dashboard");
                    return toast.success("Login Successfully");
                } else {
                    alert("No record exists");
                    setValues({ username: "", password: "" });
                }
            }
        } catch (error) {
            console.log(error);
            setValues({ username: "", password: "" });
            return toast.error(error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-image">
                    <img
                        src={loginImage}
                        alt="Login Illustration"
                        className="img-fluid"
                    />
                </div>
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <h6>Welcome back !!</h6>
                        <h2>Login on StockNest</h2>
                        <hr />

                        {/* Username Input */}
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input
                                type="text"
                                placeholder="Enter User Name"
                                name="username"
                                className="form-control"
                                onChange={handleInput}
                                value={values.username}
                            />
                            {errors.username && (
                                <span className="error-message">{errors.username}</span>
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
                                id="agreeTerms"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="agreeTerms">
                                I agree to the terms and conditions
                            </label>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="btn-login"
                            disabled={!isChecked}
                        >
                            Log in
                        </button>

                        {/* Create Account Link */}
                        <Link to="/signup" className="btn-create-account">
                            Create Account
                        </Link>

                        {/* Forgot Password Link */}
                        <div className="forgot-password">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;