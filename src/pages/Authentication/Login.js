import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import { Url } from "../../Url";
import { toast } from "react-toastify";
import "./Form.css";
import loginImage from "../../images/loginImage.png";

const Login = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const [isChecked, setIsChecked] = useState(false); // Checkbox state
    const [errors, setErrors] = useState({});
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
        <div className="d-flex justify-content-center align-items-center bg-white vh-100">
            <div className="bg-white p-4 rounded d-flex container shadow-lg">
                <div className="w-50 d-flex justify-content-center align-items-center pe-4">
                    <img
                        src={loginImage}
                        alt="Login Illustration"
                        className="img-fluid"
                    />
                </div>
                <div className="w-50 ps-4">
                    <form action="" onSubmit={handleSubmit}>
                        <h6>Welcome back !!</h6>
                        <div className="mb-3">
                            <h2 style={{ color: "rgb(53 53 186)" }}>
                                Login on Stock Tracker
                            </h2>
                            <hr />
                            <label htmlFor="username">
                                <strong>User Name</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter User Name"
                                name="username"
                                className="form-control rounded-2 input-username"
                                onChange={handleInput}
                                value={values.username}
                            />
                            {errors.username && (
                                <span className="text-danger">
                                    {errors.username}
                                </span>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">
                                <strong>Password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                className="form-control rounded-2"
                                onChange={handleInput}
                                value={values.password}
                            />
                            {errors.password && (
                                <span className="text-danger">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="agreeTerms"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="agreeTerms">
                                I agree to the terms and conditions
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-outline-success w-100 rounded-1 mb-3"
                            disabled={!isChecked} // Disable button if not checked
                        >
                            <strong>Log in</strong>
                        </button>
                        <Link to="/signup" className="btn w-100 createACbutton">
                            Create Account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;