import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import { Url } from "../../Url";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [values, setValues] = useState({
        // username: "kminchelle",
        // password: "0lelplR",
        username: "",
        password: "",
        // expiresInMins: 1,
    });

    const URL = Url + "login";
    // const URL = "https://dummyjson.com/auth/login";

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        try {
            if (!errors.username && !errors.password) {
                const res = await axios.post(URL, values);
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
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
        <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
            <div className="bg-white p-3 rounded w-25">
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username">
                            <strong>User Name</strong>
                        </label>
                        <input type="text" placeholder="Enter User Name" name="username" className="form-control rounded-0" onChange={handleInput} value={values.username} />
                        {errors.username && <span className="text-danger">{errors.username}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder="Enter Password" name="password" className="form-control rounded-0" onChange={handleInput} value={values.password} />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <p>You are agree to our terms and policies</p>
                    <button type="submit" className="btn btn-outline-success w-100 rounded-0 mb-3">
                        <strong>Log in</strong>
                    </button>
                    <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
