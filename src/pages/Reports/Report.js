import React, { useEffect, useState } from "react";
import { Url, config } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faMoneyBillWave, 
    faPercent,
} from "@fortawesome/free-solid-svg-icons";
import "./Report.css";

const Report = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const [showGST, setShowGST] = useState(false);

    const URL = Url + "/reports";

    const fetchReports = async () => {
        try {
            const response = await axios.get(URL, config);
            setTransactions(response.data.payload.transactionData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setError(error);
            setLoading(false);
        }
    };

    const deleteTransaction = async (transactionId) => {
        try {
            await axios.delete(`${URL}/${transactionId}`, config);
            toast.success("Report deleted successfully!");
            fetchReports();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete the report");
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // Filter data based on search query, transaction type, and GST toggle
    const filteredData = transactions.filter((transaction) => {
        const matchesSearchQuery =
            transaction.billNo.toString().includes(searchQuery) ||
            (transaction.vendorId?.vendorName?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (transaction.customerId?.customerName?.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilter =
            filter === "all" ||
            (filter === "purchase" && transaction.transaction_type === "purchase") ||
            (filter === "sale" && transaction.transaction_type === "sale");

        const matchesGST = !showGST || transaction.GSTPercentage > 0;

        return matchesSearchQuery && matchesFilter && matchesGST;
    });

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {/* Header Section */}
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h2 className="m-0">Transaction Reports</h2>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group me-2">
                                <button
                                    className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setFilter("all")}
                                >
                                    All
                                </button>
                                <button
                                    className={`btn ${filter === "purchase" ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setFilter("purchase")}
                                >
                                    Purchase
                                </button>
                                <button
                                    className={`btn ${filter === "sale" ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setFilter("sale")}
                                >
                                    Sale
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="row mt-3">
    <div className="col-md-4 mb-4">
        <div className="card summary-card purchase-card">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faShoppingCart} className="summary-icon" />
                    </div>
                    <div className="ms-3">
                        <h5 className="card-title">Total Purchases</h5>
                        <p className="card-value">
                            ₹{" "}
                            {transactions
                                .filter((t) => t.transaction_type === "purchase")
                                .reduce((sum, t) => sum + t.amount, 0)
                                .toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="col-md-4 mb-4">
        <div className="card summary-card sale-card">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="summary-icon" />
                    </div>
                    <div className="ms-3">
                        <h5 className="card-title">Total Sales</h5>
                        <p className="card-value">
                            ₹{" "}
                            {transactions
                                .filter((t) => t.transaction_type === "sale")
                                .reduce((sum, t) => sum + t.amount, 0)
                                .toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="col-md-4 mb-4">
        <div className="card summary-card gst-card">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faPercent} className="summary-icon" />
                    </div>
                    <div className="ms-3">
                        <h5 className="card-title">Total GST</h5>
                        <p className="card-value">
                            ₹{" "}
                            {transactions
                                .filter((t) => t.GSTPercentage > 0)
                                .reduce((sum, t) => sum + t.GSTAmount, 0)
                                .toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

                    {/* Search and Filters */}
                    <div className="row mt-3 align-items-center">
                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Bill No, Vendor, or Customer"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ borderRadius: "4px" }}
                            />
                        </div>
                    </div>

                    {/* Transaction Table */}
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <div className="card shadow-sm">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="m-0">Transaction Details</h5>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="gstToggle"
                                            checked={showGST}
                                            onChange={() => setShowGST(!showGST)}
                                        />
                                        <label className="form-check-label" htmlFor="gstToggle">
                                            Show GST Only
                                        </label>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Bill No</th>
                                                <th>Type</th>
                                                <th>{filter === "sale" ? "Customer" : "Vendor"}</th>
                                                <th>Amount</th>
                                                <th>GST</th>
                                                <th>Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRecords.map((transaction) => (
                                                <tr key={transaction._id}>
                                                    <td>{transaction.billNo}</td>
                                                    <td>
                                                        <span
                                                            className={`badge ${
                                                                transaction.transaction_type === "purchase" ? "bg-primary" : "bg-success"
                                                            }`}
                                                        >
                                                            {transaction.transaction_type}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {transaction.transaction_type === "purchase"
                                                            ? transaction.vendorId?.vendorName || <em>Unavailable</em>
                                                            : transaction.customerId?.customerName || <em>Unavailable</em>}
                                                    </td>
                                                    <td>₹ {transaction.amount}</td>
                                                    <td>
                                                        {transaction.GSTPercentage > 0
                                                            ? `${transaction.GSTPercentage}% (₹ ${transaction.GSTAmount})`
                                                            : "N/A"}
                                                    </td>
                                                    <td>{new Date(transaction.billDate).toLocaleDateString()}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() => deleteTransaction(transaction._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length} entries
                        </div>
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: Math.ceil(filteredData.length / recordsPerPage) }, (_, i) => (
                                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => paginate(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Report;