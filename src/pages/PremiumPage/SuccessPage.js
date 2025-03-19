import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const location = useLocation();
    const { paymentId, amount, status } = location.state || {};
    const navigate = useNavigate();

    // Confetti Animation Script
    useEffect(() => {

    }, []);

    return (
        <center> <div>
            <div className="container">
                <h2 className="animate__animated animate__fadeIn">🎉 Payment Successful 🎉</h2>
                <p className="text-center animate__animated animate__fadeIn animate__delay-1s">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>

                <div className="row">
                    <div className="col-md-4 animate__animated animate__fadeInUp animate__delay-1s">
                        <div className="info-box">
                            <h3>Payment Details</h3>
                            <p>
                                <strong>Payment ID:</strong> {paymentId}
                            </p>
                            <p>
                                <strong>Amount Paid:</strong> ₹{amount}
                            </p>
                            <p>
                                <strong>Payment Status:</strong> success
                            </p>
                            <p>
                                <strong>Payment Date:</strong> {new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 animate__animated animate__fadeInRight animate__delay-1s">
                        <div className="info-box">
                            <h3>User Details</h3>
                            <p>
                                <strong>Name:</strong> Test User
                            </p>
                            <p>
                                <strong>Email:</strong> test@example.com
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/premium")} // Redirect to history page
                    className="btn-back animate__animated animate__fadeIn animate__delay-2s"
                >
                    Done 
                </button>
            </div>
        </div>
        </center>
    );
};

export default SuccessPage;