import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./CustomerCare.css";

const CustomerCare = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="customer-care-container">
            <div className="back-arrow" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>

            <div className="customer-care-content">
                <h1 className="customer-care-title">Customer Care</h1>
                <p className="customer-care-text">
                    We are here to help you with any questions or concerns you may have. 
                    Please feel free to reach out to us via the following methods:
                </p>

                <div className="customer-care-info">
                    <div className="contact-method">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faEnvelope} size="3x" />
                        </div>
                        <h3>Email Us</h3>
                        <p>
                            <a href="mailto:stock.tracker@email.com">stock.tracker@email.com</a>
                        </p>
                    </div>

                    <div className="contact-method">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faPhoneAlt} size="3x" />
                        </div>
                        <h3>Call Us</h3>
                        <p>
                            <a href="tel:+918866220515">+91 88662 20055</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerCare;