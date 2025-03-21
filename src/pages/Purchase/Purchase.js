import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Url, config } from "../../Url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./PurchaseBillList.css";

const PurchaseBill = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [vendor, setVendor] = useState("");
    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([
        { product: "", qty: "", unit: "pcs", rate: "", discount: "", GSTPercentage: 0, GSTAmount: 0, amount: 0 },
    ]);
    const [allProducts, setAllProducts] = useState([]);
    const [remarks, setRemarks] = useState("");
    const [applyGST, setApplyGST] = useState(false);
    const [billNo, setBillNo] = useState("");
    const [billDate, setBillDate] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const URL = Url + "/purchase";


    // Fetch Vendors
    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${Url}/vendor`, config);
            setVendors(response.data.payload.vendorData);
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
        fetchVendors();
        fetchProducts();

        // Fetch purchase bill ONLY after products are fetched
        if (params.type === "update" && params.id) {
            setIsUpdating(true);
        }
    }, [params]);

    useEffect(() => {
        if (isUpdating && params.id && allProducts.length > 0) {
            fetchPurchaseBill(params.id);
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
            const selectedProduct = allProducts.find(prod => prod._id === value);
            if (selectedProduct) {
                updatedProducts[index] = {
                    ...updatedProducts[index],
                    product: selectedProduct,
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


    const fetchPurchaseBill = async (id) => {
        try {
            const response = await axios.get(`${URL}/${id}`, config);
            const data = response.data.payload.purchaseBills[0];

            setVendor(data.vendorId?._id ?? null);
            setBillNo(data.billNo);
            setBillDate(new Date(data.billDate).toISOString().split("T")[0]);
            setApplyGST(data.isGSTBill);
            setRemarks(data.remarks);

            if (allProducts.length > 0) {
                const updatedProducts = data.purchaseItems.map((item) => {
                    const foundProduct = allProducts.find(prod => prod._id === item.productId?._id) ?? null;
                    return {
                        product: foundProduct || "",
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
            console.error("Error fetching purchase bill:", error);
            toast.error("Failed to fetch purchase bill details");
        }
    };



    const handleSubmit = async () => {
        const totalGSTAmount = products.reduce((acc, product) => acc + product.GSTAmount, 0);
        const GSTPercentage = products.reduce((acc, product) => acc + Number(product.GSTPercentage), 0);

        const purchaseBill = {
            billNo,
            vendorId: vendor ? vendor : null,
            billDate: new Date(billDate),
            isGSTBill: applyGST,
            totalAmount: netAmount,
            GSTAmount: totalGSTAmount,
            GSTPercentage,
            finalAmount: totalAmount,
            remarks,
            purchaseBillItems: products.map(product => ({
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
        console.log('purchaseBill::: ', purchaseBill);

        try {
            if (isUpdating) {
                await axios.put(`${URL}/${params.id}`, purchaseBill, config);
                toast.success("Purchase Bill Updated Successfully");
            } else {
                await axios.post(URL + "/", purchaseBill, config);
                toast.success("Purchase Bill Created Successfully");
            }
            navigate("/purchase");
        } catch (error) {
            toast.error(error.response.data.errors);
        }
    };

    const handleCancel = () => {
        navigate("/purchase");
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
                        onClick={() => navigate("/purchase")}
                    />
                    {name} PURCHASE BILL
                </h3>
            </div>

            {/* Vendor Section */}
            <div className="row mt-3">
                <div className="col-md-6 mb-3">
                    <label htmlFor="vendor" className="form-label">
                        Vendor <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                        <select
                            className="form-select"
                            id="vendor"
                            value={vendor}
                            onChange={(e) => setVendor(e.target.value)}
                        >
                            <option value="">Select Vendor</option>
                            {vendors.map((vendor) => (
                                <option value={vendor._id} key={vendor._id}>
                                    {vendor.vendorName}
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
                                            value={product.product ? product.product._id : ""}
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

            {/* Remarks and Summary Section */}
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

            {/* Action Buttons */}
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

export default PurchaseBill;