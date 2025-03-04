import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Url, config } from "../../Url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./SaleBillDetails.css";

const SalesBill = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [customer, seCustomer] = useState("");
    const [customers, seCustomers] = useState([]);
    const [products, setProducts] = useState([
        { product: "", qty: "", unit: "pcs", rate: "", discount: "", GSTPercentage: 0, GSTAmount: 0, amount: 0 },
    ]);
    const [allProducts, setAllProducts] = useState([]);
    const [remarks, setRemarks] = useState("");
    const [applyGST, setApplyGST] = useState(false);
    const [billNo, setBillNo] = useState("");
    const [billDate, setBillDate] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const URL = Url + "/sale";


    // Fetch customers
    const fetchcustomers = async () => {
        try {
            const response = await axios.get(`${Url}/customer`, config);
            seCustomers(response.data.payload.customerData);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // Fetch Products
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${Url}/product`, config);
            setAllProducts(response.data.payload.productData);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // useEffect to call the functions on mount
    useEffect(() => {
        fetchcustomers();
        fetchProducts(); // Fetch allProducts first

        // Fetch sale bill ONLY after products are fetched
        if (params.type === "update" && params.id) {
            setIsUpdating(true);
        }
    }, [params]);

    // New useEffect to update products once `allProducts` is available
    useEffect(() => {
        if (isUpdating && params.id && allProducts.length > 0) {
            fetchsaleBill(params.id);
        }
    }, [isUpdating, params.id, allProducts]);



    const handleAddProduct = () => {
        setProducts([...products, { product: "", qty: "", unit: "pcs", rate: "", discount: "", GSTPercentage: 0, GSTAmount: 0, amount: 0 }]);
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];

        if (field === "product") {
            // Find the selected product from allProducts
            const selectedProduct = allProducts.find(prod => prod._id === value);
            if (selectedProduct) {
                updatedProducts[index] = {
                    ...updatedProducts[index],
                    product: selectedProduct,  // Store the entire product object
                };
            }
        } else {
            updatedProducts[index][field] = value;
        }

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


    const fetchsaleBill = async (id) => {
        try {
            const response = await axios.get(`${URL}/${id}`, config);
            const data = response.data.payload.saleBills[0];
            console.log('data::: ', data);

            seCustomer(data.customerId?._id ?? null);
            setBillNo(data.billNo);
            setBillDate(new Date(data.billDate).toISOString().split("T")[0]);
            setApplyGST(data.isGSTBill);
            setRemarks(data.remarks);

            // Ensure products are set only after `allProducts` is fetched
            if (allProducts.length > 0) {
                const updatedProducts = data.saleItems.map((item) => {
                    const foundProduct = allProducts.find(prod => prod._id === item.productId?._id) ?? null;
                    return {
                        product: foundProduct || "",  // Ensure a valid product object
                        qty: item.qty,
                        unit: item.unit,
                        rate: item.rate,
                        GSTPercentage: item.GSTPercentage,
                        GSTAmount: item.GSTAmount,
                        amount: item.amount + item.GSTAmount,
                    };
                });

                setProducts(updatedProducts);
            }
        } catch (error) {
            console.error("Error fetching sale bill:", error);
            toast.error("Failed to fetch sale bill details");
        }
    };



    const handleSubmit = async () => {
        const totalGSTAmount = products.reduce((acc, product) => acc + product.GSTAmount, 0);
        const GSTPercentage = products.reduce((acc, product) => acc + Number(product.GSTPercentage), 0);

        const saleBill = {
            billNo,
            customerId: customer ? customer : null,
            billDate: new Date(billDate),
            isGSTBill: applyGST,
            totalAmount: netAmount,
            GSTAmount: totalGSTAmount,
            GSTPercentage,
            finalAmount: totalAmount,
            remarks,
            saleItems: products.map(product => ({
                productId: product.product?._id || "",
                qty: product.qty,
                unit: product.unit,
                rate: product.rate,
                GSTPercentage: product.GSTPercentage,
                GSTAmount: product.GSTAmount,
                amount: Number(product.amount) - Number(product.GSTAmount),
                totalAmount: product.amount,
            })),
        };
        try {
            if (isUpdating) {
                await axios.put(`${URL}/${params.id}`, saleBill, config);
                toast.success("sale Bill Updated Successfully");
            } else {
                await axios.post(URL + "/", saleBill, config);
                toast.success("sale Bill Created Successfully");
            }
            navigate("/sale");
        } catch (error) {
            toast.error(error.response.data.errors.message);
        }
    };

    const handleCancel = () => {
        navigate("/sale");
    };

    const totalQty = products.reduce((sum, product) => sum + (parseFloat(product.qty) || 0), 0);
    const netAmount = products.reduce((sum, product) => sum + (product.amount || 0), 0);
    const totalGST = products.reduce((sum, product) => sum + (product.GSTAmount || 0), 0);
    const totalAmount = netAmount + totalGST;


    let name = "";
    if (params.type === "add") {
        name = "ADD";
    } else {
        name = "UPDATE";
    }

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ marginBottom: "100px" }}>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                <h3 className="m-0">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="me-2 fa-sm text-secondary"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/sale")}
                    />
                    {name} SALE BILL
                </h3>
            </div>

            {/* customer Section */}
            <div className="row mt-3">
                <div className="col-md-6 mb-3">
                    <label htmlFor="customer" className="form-label">
                        customer <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                        <select
                            className="form-select"
                            id="customer"
                            value={customer}
                            onChange={(e) => seCustomer(e.target.value)}
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
                                        <th>Select GST %</th>
                                        <th>GST Amount</th>
                                    </>
                                )}
                                <th>Amount (₹)</th>
                                {applyGST && (
                                    <>
                                        <th> Taxable Amount(₹)</th>
                                    </>
                                )}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={product.product ? product.product._id : ""}  // Ensure it gets the product ID
                                            onChange={(e) => handleProductChange(index, "product", e.target.value)}
                                        >
                                            <option value="" disabled>Select Product</option>
                                            {allProducts.map((prod) => (
                                                <option value={prod._id} key={prod._id}>
                                                    {prod.productName}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={product.qty}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value >= 0 || value === "") {
                                                    handleProductChange(index, "qty", value);
                                                }
                                            }}
                                        />
                                    </td>

                                    <td>
                                        <select
                                            className="form-select"
                                            value={product.unit}
                                            onChange={(e) => handleProductChange(index, "unit", e.target.value)}
                                        >
                                            <option value="pcs">Pcs</option>
                                            <option value="kg">kg</option>
                                            <option value="meter">Mtr</option>
                                            <option value="litre">Ltr</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={product.rate}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value >= 0 || value === "") {
                                                    handleProductChange(index, "rate", value);
                                                }
                                            }}
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
                                                    <option value="" >Select GST Percentage</option>
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
                                    {
                                        applyGST && (
                                            <>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={(product.amount + product.GSTAmount).toFixed(2)}
                                                        readOnly
                                                    />
                                                </td>
                                            </>
                                        )
                                    }


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

            {/* Remarks and Summary Section (Side by Side) */}
            <div className="row mt-3">
                <div className="col-md-6">
                    <label htmlFor="remarks" className="form-label">
                        Remark
                    </label>
                    <textarea
                        className="form-control"
                        id="remarks"
                        rows="2"
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
                    <button className="btn cancel-btn me-2" onClick={handleCancel} >
                        Cancel
                    </button>
                    <button className="btn submit-btn" onClick={handleSubmit}>{isUpdating ? "Update" : "Submit"}</button>
                </div>
            </div>
        </main>
    );
};

export default SalesBill;