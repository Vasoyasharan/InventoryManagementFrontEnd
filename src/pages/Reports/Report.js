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
            toast.error(error.response?.data?.message || "An error occurred");
            setError(error);
            setLoading(false);
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
        <div>
          {transactions.map((transaction) => (
            <div key={transaction._id} className="card">
              <h3>{transaction.productID.productName}</h3>
              <p>Transaction Type: {transaction.transaction_type}</p>
              <p>Quantity: {transaction.qty}</p>
              <p>Price: ₹{transaction.price}</p>
              <p>Amount: ₹{transaction.amount}</p>
              {transaction.transaction_type === 'Sale' ? (
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
            </div>
          ))}
        </div>
      );
};

export default Report;
