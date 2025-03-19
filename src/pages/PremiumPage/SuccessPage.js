import React from "react";
import { useNavigate } from "react-router-dom";
import "./PremiumPage.css"; // New CSS file for the modal

const SuccessPage = ({ paymentId, amount, status, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header with Icon and Title */}
        <div className="modal-header">
          <div className="icon-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#27ae60"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="modal-title">Payment Successful!</h2>
        </div>

        {/* Payment Details */}
        <div className="payment-details">
          <div className="detail-item">
            <span className="detail-label">Payment ID:</span>
            <span className="detail-value">{paymentId}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Amount Paid:</span>
            <span className="detail-value">₹{amount}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className="detail-value status-success">{status}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Date:</span>
            <span className="detail-value">{new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            onClose(); // Close the modal
            navigate("/premium"); // Navigate to the premium page
          }}
          className="close-button"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;