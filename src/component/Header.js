import { NavLink, useNavigate } from "react-router-dom";
import "../Css/Sidebar.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import inventoryLogo from "../images/inventoryLogo.png";
import { faRightFromBracket, faFileContract, faShieldAlt, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/CustomModal.css";

const Header = (props) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const userName = (localStorage.getItem("username") || "null").toUpperCase();

    const getCurrentGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return "Good Morning...";
        } else if (currentHour < 18) {
            return "Good Afternoon...";
        } else {
            return "Good Evening...";
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleConfirmLogout = () => {
        localStorage.clear();
        navigate("/login");
        toast.success("Logout Successfully...");
        handleCloseModal();
    };

    const goToTerms = () => {
        navigate("/terms-conditions");
    };

    return (
        <React.Fragment>
            <header className="navbar sticky-top flex-md-nowrap shadow">
                <NavLink className="navbar-brand me-0 px-3" to="/dashboard">
                    <img src={inventoryLogo} alt="logo" style={{ width: "249px", height: "55px" }} />
                </NavLink>
                <div className="navbar-text text-dark ms-3">
                    Hello <u>{userName}</u>, <i>{getCurrentGreeting()}</i>
                </div>
                <div className="navbar-actions ms-auto d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={goToTerms}>
                        <FontAwesomeIcon icon={faFileContract} className="me-1" />
                        Terms & Conditions
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/privacy-policy")}>
                        <FontAwesomeIcon icon={faShieldAlt} className="me-1" />
                        Privacy Policy
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/customer-care")}>
                        <FontAwesomeIcon icon={faHeadset} className="me-1" />
                        Customer Care
                    </button>

                    <div className="logout-btn" onClick={handleShowModal}>
                        LogOut
                        <FontAwesomeIcon icon={faRightFromBracket} size="2x" className="mx-2" />
                    </div>
                </div>
            </header>

            {/* Stylish Modal for Logout Confirmation */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="md" dialogClassName="custom-modal logout-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-content">
                        <p className="modal-text">Are you sure you want to log out?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmLogout}>
                        Log Out
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default Header;
