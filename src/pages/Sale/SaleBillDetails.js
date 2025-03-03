import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBuilding, faPhone, faMapMarkerAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./SaleBillDetails.css";

const SaleBillDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bill = location.state;

    if (!bill) {
        return <div className="no-bill">No bill data found.</div>;
    }

    return (
        <div className="bill-container">
            <div className="bill-header">
                <h2 className="summary-title">
                    <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" onClick={() => navigate("/sale")} /> Summary
                </h2>
            </div>

            {/* Bill & Customer Details */}
            <div className="bill-vendor-container">
                <div className="vendor-info">
                    <p className="vendor-label">To:</p>
                    <div className="vendor-details">
                        <div className="vendor-name-container">
                            <FontAwesomeIcon icon={faBuilding} className="vendor-icon" />
                            <h4 className="vendor-name">{bill.customerId.customerName}</h4>
                        </div>
                        <p>
                            <FontAwesomeIcon icon={faPhone} className="detail-icon" />
                            {bill.customerId.mobileNo}
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="detail-icon" />
                            {bill.customerId.city}, {bill.customerId.state}
                        </p>
                    </div>
                </div>

                <div className="bill-info">
                    <p><strong>Bill No:</strong> <span className="bill-no">{bill.billNo}</span></p>
                    <div className="bill-row">
                        <div className="bill-field">
                            <p><strong>Bill Date:</strong></p>
                            <p className="bill-date">{new Date(bill.billDate).toLocaleDateString()}</p>
                        </div>
                        <div className="bill-field">
                            <p><strong>Bill Type:</strong></p>
                            <p className="bill-type">{bill.isGSTBill ? "With Tax" : "Without Tax"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="bill-section">
                <h3>Product Details</h3>
                <div className="table-container">
                    <table className="bill-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>HSN Code</th>
                                <th>Qty.</th>
                                <th>Rate</th>
                                <th>Units</th>
                                {bill.isGSTBill && <th>GST (%)</th>}
                                {bill.isGSTBill && <th>GST (₹)</th>}
                                <th>Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bill.saleItems.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.productId.productName}</td>
                                    <td>{item.productId.hsnCode}</td>
                                    <td>{item.qty}</td>
                                    <td>₹{item.rate}</td>
                                    <td>{item.unit}</td>
                                    {bill.isGSTBill && <td>{parseFloat(item.GSTPercentage).toFixed(2)}%</td>}
                                    {bill.isGSTBill && <td>₹{parseFloat(item.GSTAmount).toFixed(2)}</td>}
                                    <td>₹{(item.qty * item.rate).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bill Summary */}
            <div className="bill-summary">
                <div className="summary-details">
                    <p>
                        <strong>Total Qty.:</strong>
                        <span className="summary-value">{bill.saleItems.reduce((sum, item) => sum + item.qty, 0)}</span>
                    </p>
                    <p>
                        <strong>Net Amount:</strong>
                        <span className="summary-value">₹{bill.totalAmount}</span>
                    </p>

                    {bill.isGSTBill && (
                        <p className="tax">
                            <strong>Tax Amount:</strong>
                            <span className="tax-value">₹{parseFloat(bill.GSTAmount).toFixed(2)} ({parseFloat(bill.GSTPercentage).toFixed(2)}%)</span>
                        </p>
                    )}

                    <p className="total-amount">
                        <strong>Final Amount</strong>
                        <span className="final-value">₹{parseFloat(bill.finalAmount).toFixed(2)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SaleBillDetails;