import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ExpenseTrackerForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        expenseName: "",
        vendorName: "",
        paymentMode: "cash",
        amount: "",
        note: "",
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!values.expenseName || !values.vendorName || !values.amount) {
            toast.error("Please fill in all required fields.");
            return;
        }
        console.log("Expense Data:", values); // Log the expense data
        toast.success("Expense added successfully!");
        navigate("/expense-tracker"); // Redirect back to the table view
    };

    return (
        <div className="container mt-4">
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label htmlFor="expenseName" className="required-star">
                                Expense Name<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="expenseName"
                                placeholder="Enter Expense Name"
                                name="expenseName"
                                required
                                onChange={handleInput}
                                value={values.expenseName}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label htmlFor="vendorName" className="required-star">
                                Vendor Name<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="vendorName"
                                placeholder="Enter Vendor Name"
                                name="vendorName"
                                required
                                onChange={handleInput}
                                value={values.vendorName}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label htmlFor="paymentMode" className="required-star">
                                Payment Mode<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                            </label>
                            <select
                                className="form-control"
                                id="paymentMode"
                                name="paymentMode"
                                required
                                onChange={handleInput}
                                value={values.paymentMode}
                            >
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="online">Online</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label htmlFor="amount" className="required-star">
                                Amount<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="amount"
                                placeholder="Enter Amount"
                                name="amount"
                                required
                                onChange={handleInput}
                                value={values.amount}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <div className="form-group">
                            <label htmlFor="note">Note</label>
                            <textarea
                                className="form-control"
                                id="note"
                                placeholder="Add Note"
                                name="note"
                                onChange={handleInput}
                                value={values.note}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-3 button-group">
                    <button className="btn btn-primary me-3" type="submit">
                        Save
                    </button>
                     <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => navigate("/expense-tracker")} // Correct path
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseTrackerForm;