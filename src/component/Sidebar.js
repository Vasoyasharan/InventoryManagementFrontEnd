import "../Css/Sidebar.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faFileInvoice, faReceipt, faBoxOpen, faUsers, faTruck, faChartLine, faCog, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/CustomModal.css";

const sidebarItems = [
    { to: "/dashboard", icon: faTachometerAlt, text: "Dashboard" },
    { to: "/purchase", icon: faFileInvoice, text: "Purchase Bill" },
    { to: "/sale", icon: faReceipt, text: "Sales Bill" },
    { to: "/product", icon: faBoxOpen, text: "Products" },
    { to: "/customer", icon: faUsers, text: "Customers" },
    { to: "/vendor", icon: faTruck, text: "Vendors" },
    { to: "/report", icon: faChartLine, text: "Report" },
    { to: "/setting", icon: faCog, text: "Settings" },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const userName = (localStorage.getItem("username") || "null").toUpperCase();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleConfirmLogout = () => {
        localStorage.clear();
        navigate("/login");
        toast.success("Logout Successfully...");
        handleCloseModal();
    };

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                {sidebarItems.map((item, index) => (
                                    <li key={index} className="nav-item">
                                        <NavLink className="nav-link" to={item.to}>
                                            <FontAwesomeIcon icon={item.icon} /> <span className="nav-text">{item.text}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                            <div className="user-info d-flex align-items-center mt-3">
                                <FontAwesomeIcon icon={faUser} className="user-icon" />
                                <span className="username">{userName}</span>
                                <div className="logout-btn ms-auto" onClick={handleShowModal}>
                                    <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

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

export default Sidebar;
