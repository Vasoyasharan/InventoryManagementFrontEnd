import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../CustomerCare/CustomerCare.css";

const CustomerCare = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/dashboard");  // Redirect to the home or dashboard page
    };

    return (
        <div className="customer-care-container">
            <button className="back-button" onClick={handleBack}>
         Back
            </button>
            
            <h1 className="customer-care-title">Customer Care</h1>
            <p className="customer-care-text">
                We are here to help you with any questions or concerns you may have. 
                Please feel free to reach out to us via the following methods:
            </p>
            
            <div className="customer-care-info">
                <div className="contact-method">
                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                    <h3>Email Us:</h3>
                    <p>
                         <a href="mailto:vananihardik8553@gmail.com">vananihardik8553@gmail.com</a> <br />
                        <a href="mailto:sharanvasoya@proton.me">sharanvasoya@proton.me</a> <br />
                        <a href="mailto:hiraparapiyu@gmail.com">hiraparapiyu@gmail.com</a> <br />
                        <a href="mailto:vaghasiyadhruv2004@gmail.com">vaghasiyadhruv2004@gmail.com</a>
                    </p>
                </div>
                
                <div className="contact-method">
                    <FontAwesomeIcon icon={faPhoneAlt} size="2x" />
                    <h3>Call Us:</h3>
                    <p>
                        <a href="tel:+918866220515">+91 88662 20515</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerCare;
