import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import { Url } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
    const [values, setValues] = useState({
        username: "", // Updated to use "username" instead of "name"
        password: "",
    });

    const URL = Url + "/user/signup";

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
                // Updated to use "username" instead of "name"
                const res = await axios.post(URL, values);
                console.log("response received", res);

                if (res.data.success) {
                    console.log("New User Created:", res.data.payload.newUser);
                    navigate("/");
                    return toast.success("Signup Successfully");
                } else {
                    alert("Signup failed");
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
                <h2>Sign-Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username">
                            <strong>Username</strong>
                        </label>
                        <input type="text" placeholder="Enter Username" name="username" className="form-control rounded-0" onChange={handleInput} value={values.username} />
                        {errors.username && <span className="text-danger">{errors.username}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder="Enter Password" name="password" className="form-control rounded-0" onChange={handleInput} value={values.password} />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-outline-success w-100 rounded-0">
                        <strong>Sign Up</strong>
                    </button>
                    <p>You are agree to our terms and policies</p>
                    <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Login
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Signup;