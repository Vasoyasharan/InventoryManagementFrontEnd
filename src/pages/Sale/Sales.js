import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Url, config } from "../../Url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const SalesBill = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState("");
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([
        { product: "", hsnCode: "", qty: "", unit: "Pcs", rate: "", discount: "", GSTPercentage: 0, GSTAmount: 0, amount: 0 },
    ]);
    const [allProducts, setAllProducts] = useState([]);
    const [remarks, setRemarks] = useState("");
    const [applyGST, setApplyGST] = useState(false);
    const [billNo, setBillNo] = useState("");
    const [billDate, setBillDate] = useState("");

    // Fetch Customers
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${Url}/customer`, config);
                setCustomers(response.data.payload.customerData);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchCustomers();
    }, []);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${Url}/product`, config);
                setAllProducts(response.data.payload.productData);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        setProducts([...products, { product: "", hsnCode: "", qty: "", unit: "Pcs", rate: "", discount: "", GSTPercentage: 0, GSTAmount: 0, amount: 0 }]);
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;

        // Calculate amount if rate or quantity changes
        if (field === "rate" || field === "qty") {
            const qty = parseFloat(updatedProducts[index].qty) || 0;
            const rate = parseFloat(updatedProducts[index].rate) || 0;
            const discount = parseFloat(updatedProducts[index].discount) || 0;
            updatedProducts[index].amount = qty * rate - discount;
        }

        // Calculate GST Amount if GST Percentage changes
        if (field === "GSTPercentage") {
            const GSTPercentage = parseFloat(value) || 0;
            updatedProducts[index].GSTAmount = (updatedProducts[index].amount * GSTPercentage) / 100;
        }

        setProducts(updatedProducts);
    };

    const handleSubmit = () => {
        // Handle form submission
        const salesBill = {
            userId: "67bf33d26c6d875a5ffa9740", // Replace with actual user ID
            customerId: customer,
            billNo: billNo,
            billDate: new Date(billDate).toISOString(),
            products: products.map((product) => ({
                productId: product.product,
                hsnCode: product.hsnCode,
                qty: product.qty,
                unit: product.unit,
                rate: product.rate,
                discount: product.discount,
                GSTPercentage: product.GSTPercentage,
                GSTAmount: product.GSTAmount,
                amount: product.amount,
            })),
            totalAmount: netAmount,
            finalAmount: totalAmount,
            isGSTBill: applyGST,
            remarks: remarks,
        };

        console.log("Sales Bill Data:", salesBill);
        toast.success("Sales Bill Created Successfully");
        navigate("/sales");
    };

    const handleCancel = () => {
        navigate("/sales");
    };

    const totalQty = products.reduce((sum, product) => sum + (parseFloat(product.qty) || 0), 0);
    const netAmount = products.reduce((sum, product) => sum + (product.amount || 0), 0);
    const totalGST = products.reduce((sum, product) => sum + (product.GSTAmount || 0), 0);
    const totalAmount = netAmount + totalGST;

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ marginBottom: "100px" }}>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                <h3 className="m-0">Add Sales Bill</h3>
            </div>

            {/* Customer Section */}
            <div className="row mt-3">
                <div className="col-md-6 mb-3">
                    <label htmlFor="customer" className="form-label">
                        Customer <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                        <select
                            className="form-select"
                            id="customer"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                        >
                            <option value="">Select Customer</option>
                            {customers.map((customer) => (
                                <option value={customer._id} key={customer._id}>
                                    {customer.customerName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6 mb-3 d-flex align-items-end">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="applyGST"
                            checked={applyGST}
                            onChange={(e) => setApplyGST(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="applyGST">
                            Apply GST
                        </label>
                    </div>
                </div>
            </div>

            {/* Bill No and Bill Date Section */}
            <div className="row mt-3">
                <div className="col-md-6 mb-3">
                    <label htmlFor="billNo" className="form-label">
                        Bill No <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="billNo"
                        value={billNo}
                        onChange={(e) => setBillNo(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="billDate" className="form-label">
                        Bill Date <span className="text-danger">*</span>
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="billDate"
                        value={billDate}
                        onChange={(e) => setBillDate(e.target.value)}
                    />
                </div>
            </div>

            {/* Products Section */}
            <div className="row mt-3">
                <div className="col-12">
                    <h5>Products</h5>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product <span className="text-danger">*</span></th>
                                <th>Qty <span className="text-danger">*</span></th>
                                <th>Unit <span className="text-danger">*</span></th>
                                <th>Rate (₹) <span className="text-danger">*</span></th>
                                {applyGST && (
                                    <>
                                        <th>GST %</th>
                                        <th>GST Amount</th>
                                    </>
                                )}
                                <th>Amount (₹)</th>
                                <th>Taxable Ammount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={product.product}
                                            onChange={(e) => handleProductChange(index, "product", e.target.value)}
                                        >
                                            <option value="">Select Product</option>
                                            {allProducts.map((prod) => (
                                                <option value={prod._id} key={prod._id}>
                                                    {prod.productName}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    {/* <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={product.hsnCode}
                                            onChange={(e) => handleProductChange(index, "hsnCode", e.target.value)}
                                        />
                                    </td> */}
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={product.qty}
                                            onChange={(e) => handleProductChange(index, "qty", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={product.unit}
                                            onChange={(e) => handleProductChange(index, "unit", e.target.value)}
                                        >
                                            <option value="Pcs">Pcs</option>
                                            <option value="kg">kg</option>
                                            <option value="Mtr">Mtr</option>
                                            <option value="Ltr">Ltr</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={product.rate}
                                            onChange={(e) => handleProductChange(index, "rate", e.target.value)}
                                        />
                                    </td>
                                    {applyGST && (
                                        <>
                                            <td>
                                                <select
                                                    className="form-control"
                                                    value={product.GSTPercentage}
                                                    onChange={(e) => handleProductChange(index, "GSTPercentage", e.target.value)}
                                                >
                                                    <option value="" disabled selected>Select GST Percentage</option>
                                                    <option value="0.00">GST 0.00%</option>
                                                    <option value="0.25">GST 0.25%</option>
                                                    <option value="1">GST 1%</option>
                                                    <option value="1.50">GST 1.50%</option>
                                                    <option value="3">GST 3%</option>
                                                    <option value="5">GST 5%</option>
                                                    <option value="6">GST 6%</option>
                                                    <option value="7.5">GST 7.5%</option>
                                                    <option value="12">GST 12%</option>
                                                    <option value="18">GST 18%</option>
                                                    <option value="28">GST 28%</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={product.GSTAmount.toFixed(2)}
                                                    readOnly
                                                />
                                            </td>
                                        </>
                                    )}
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={product.amount.toFixed(2)}
                                            readOnly
                                        />
                                    </td>
                                    <td>
    <input
        type="number"
        className="form-control"
        value={(product.amount + (applyGST ? product.GSTAmount : 0)).toFixed(2)}
        readOnly
    />
</td>
                                    <td>
                                        <button
                                            className="btn btn-link text-danger"
                                            onClick={() => handleRemoveProduct(index)}
                                        >
                                            <FontAwesomeIcon icon={faMinusCircle} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-end">
                        <button className="btn add-product-btn" onClick={handleAddProduct}>
                            + ADD PRODUCT
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-6">
                    <label htmlFor="remarks" className="form-label">
                        Remark
                    </label>
                    <textarea
                        className="form-control"
                        id="remarks"
                        rows="3"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                        <div className="d-flex justify-content-between">
                            <span>Total Qty:</span>
                            <span>{totalQty}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Net Amount:</span>
                            <span>₹ {netAmount.toFixed(2)}</span>
                        </div>
                        {applyGST && (
                            <div className="d-flex justify-content-between">
                                <span>Total GST:</span>
                                <span>₹ {totalGST.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="d-flex justify-content-between">
                            <span>Total Amount:</span>
                            <span className="total-amount">₹ {totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons (Fixed Width and Spacing) */}
            <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-end">
                    <button className="btn cancel-btn me-2" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="btn submit-btn" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </main>
    );
};

export default SalesBill;