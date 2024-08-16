import React, { useEffect, useState } from "react";
import { Url, config } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";
import "./Report.css";

const Report = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    <div className="row">
                        {transactions.map((transaction) => (
                            <div key={transaction._id} className="col-md-6 mb-4">
                                <div
                                    className="card"
                                    style={{
                                        background: "#f7f7f7",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <div
                                        className="d-flex justify-content-between align-items-center p-3"
                                        style={{
                                            backgroundColor: transaction.transaction_type === "Purchase" ? "rgb(187 110 110)" : "rgb(90 114 90)",
                                            borderRadius: "12px 12px 0 0",
                                            color: "#fff",
                                        }}
                                    >
                                        <h5 className="m-0">{transaction.productID.productName}</h5>
                                        <span className="badge bg-light text-dark">{transaction.transaction_type}</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="mb-1">
                                                    <strong>Quantity:</strong> {transaction.qty}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>Price:</strong> ₹ {transaction.price}
                                                </p>
                                            </div>
                                        <div className="mb-2">
                                            <strong>Amount:</strong> ₹ {transaction.amount}
                                        </div>

                                            
                                            <div className="text-end">
                                                <p className="mb-1">
                                                    <strong>{transaction.transaction_type === "Purchase" ? "Vendor" : "Customer"}:</strong> {transaction.transaction_type === "Purchase" ? transaction.vendorID.vendorName : transaction.customerID.customerName}
                                                </p>
                                                <p className="text-muted">{new Date(transaction.transaction_date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer text-end" style={{backgroundColor:'gainsboro'}}>
                                        <button className="btn btn-outline-danger" style={{width:'100px'}} onClick={() => deleteTransaction(transaction._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Report;
