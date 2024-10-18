import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

const AuthProtected = (props) => {
    const Cmp = props.element;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <>
            <Cmp />
        </>
    );
};

const ProtectedRoute = (props) => {
    const Cmp = props.element;
    const navigate = useNavigate();

    useEffect(() => {
        !localStorage.getItem("token") ? navigate("/login") : navigate(props.path);
    }, [navigate]);

    return (
        <div className="routes-page">
            <Sidebar />
            <div className="w-100">
                <Header />
                <Cmp name={props.name} />
            </div>
        </div>
    );
};

export { ProtectedRoute, AuthProtected };
