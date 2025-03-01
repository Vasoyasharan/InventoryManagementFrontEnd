import React from 'react';
import { useLocation } from 'react-router-dom';

const PurchaseBillDetails = () => {
    const location = useLocation();
    const bill = location.state; // Access the passed item

    if (!bill) {
        return <div>No bill data found.</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Purchase Bill Details</h2>

            {/* Bill Header */}
            <div style={styles.section}>
                <p><strong>Bill No:</strong> {bill.billNo}</p>
                <p><strong>Bill Date:</strong> {new Date(bill.billDate).toLocaleDateString()}</p>
                <p><strong>Bill Type:</strong> {bill.isGSTBill ? 'With Tax' : 'Without Tax'}</p>
            </div>

            {/* Vendor Details */}
            <div style={styles.section}>
                <h3>Vendor Details</h3>
                <p><strong>Vendor Name:</strong> {bill.vendorId.vendorName}</p>
                <p><strong>Mobile No:</strong> {bill.vendorId.mobileNo}</p>
                <p><strong>Address:</strong> {bill.vendorId.city}, {bill.vendorId.state}</p>
            </div>

            {/* Product Details */}
            <div style={styles.section}>
                <h3>Product Details</h3>
                <table style={styles.table}>
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
                        {bill.purchaseItems.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productId.productName}</td>
                                <td>{item.productId.hsnCode}</td>
                                <td>{item.qty}</td>
                                <td>₹{item.rate}</td>
                                <td>{item.unit}</td>
                                {bill.isGSTBill && <td>{parseFloat(item.GSTPercentage).toFixed(2)}%</td>}
                                {bill.isGSTBill && <td>₹{parseFloat(item.GSTAmount).toFixed(2)}</td>}

                                <td>₹{parseFloat(item.amount).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bill Summary */}
            <div style={styles.section}>
                <h3>Bill Summary</h3>
                <p><strong>Total Qty.:</strong> {bill.purchaseItems.reduce((sum, item) => sum + item.qty, 0)}</p>
                <p><strong>Net Amount:</strong> ₹{bill.totalAmount}</p>
                {bill.isGSTBill && <p><strong>Tax Amount:</strong> ₹{parseFloat(bill.GSTAmount).toFixed(2)} ({parseFloat(bill.GSTPercentage).toFixed(2)}%)</p>}
                <p><strong>Final Amount:</strong> ₹{parseFloat(bill.finalAmount).toFixed(2)}</p>
            </div>
        </div>
    );

};

const styles = {
    container: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    section: {
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '16px',
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        backgroundColor: '#f2f2f2',
        textAlign: 'left',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
    },
};

export default PurchaseBillDetails;