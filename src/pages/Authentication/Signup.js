import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import { Url } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";
import signUpImage from "../../images/SignupImage.png";

const Signup = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false); // State for checkbox
    const navigate = useNavigate();
    const URL = Url + "/user/signup";

    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked); // Track checkbox state
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values)); // Ensure validation includes email
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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-4 rounded d-flex container shadow-lg">
                <div className="w-50 d-flex justify-content-center align-items-center pe-4">
                    <img
                        src={signUpImage}
                        alt="Signup Illustration"
                        className="img-fluid"
                    />
                </div>
                <div className="w-50 ps-4">
                    <form onSubmit={handleSubmit}>
                        <h6>Join the Revolution – It All Starts with You!</h6>
                        <div className="mb-3">
                            <h2 style={{ color: "rgb(21 151 35)" }}>Sign-Up</h2>
                            <hr />
                            <label htmlFor="username">
                                <strong>Username</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                name="username"
                                className="form-control rounded-2"
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
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                className="form-control rounded-2"
                                onChange={handleInput}
                                value={values.email}
                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email}
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
                                type="checkbox"
                                className="form-check-input"
                                id="terms"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="terms"
                            >
                                I agree to the terms and conditions
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-success w-100 rounded-1 mb-3"
                            disabled={!isChecked} // Disable button if not checked
                        >
                            <strong>Sign Up</strong>
                        </button>
                        <Link
                            to="/"
                            className="btn w-100 loginButton text-decoration-none"
                        >
                            Login
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
