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
            fetchReports()
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
                  <div
                    key={transaction._id}
                    className="col-md-6 mb-3"
                  >
                    <div
                      className="card"
                      style={{
                        backgroundColor:
                          transaction.transaction_type === "Purchase"
                            ? "#a25e5e"
                            : "#6e956e",
                        color: "white", // Ensure text is readable on the background
                      }}
                    >
                      <div className="card-body">
                        <h3>{transaction.productID.productName}</h3>
                        <p>Transaction Type: <span className="transaction_type">{transaction.transaction_type}</span></p>
                        <p>Quantity: {transaction.qty}</p>
                        <p>Price: ₹{transaction.price}</p>
                        <p>Amount: ₹{transaction.amount}</p>
                        {transaction.transaction_type === "Sale" ? (
                          <>
                            <p>Customer: {transaction.customerID.customerName}</p>
                            <p>Mobile: {transaction.customerID.mobileNo}</p>
                          </>
                        ) : (
                          <>
                            <p>Vendor: {transaction.vendorID.vendorName}</p>
                            <p>Mobile: {transaction.vendorID.mobileNo}</p>
                          </>
                        )}
                        <p>Date: {new Date(transaction.transaction_date).toLocaleDateString()}</p>
                        <button 
                          className="btn btn-danger mt-3"
                          onClick={() => deleteTransaction(transaction._id)}
                        >
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
