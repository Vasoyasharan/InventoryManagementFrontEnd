import React, { useEffect, useState } from "react";
import { Url, config } from "../../Url";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Product = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        productName: "",
        stock: "",
        unit: "",
        hsnCode: "",
    });

    const [loading, setLoading] = useState(true);

    const URL = Url + "/product";

    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(URL + "/", values, config);
            setValues({ productName: "", stock: "", unit: "", hsnCode: "" });
            navigate("/product");
            toast.success("Product Created Successfully");
        } catch (error) {
            console.log(error);
            setValues({ productName: "", stock: "", unit: "", hsnCode: "" });
            toast.error(error.response.data.message);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (!params.id) return;
        try {
            await axios.put(`${URL}/${params.id}`, values, config);
            setValues({ productName: "", stock: "", unit: "", hsnCode: "" });
            navigate("/product");
            toast.success("Product Updated Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const fetchData = async () => {
        try {
            if (params.id) {
                const response = await axios.get(`${URL}/${params.id}`, config);
                setValues(response.data.payload.productData[0]);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.id]);

    const handleCancel = () => {
        navigate("/product");
    };

    let name = "";
    if (params.type === "add") {
        name = "ADD";
    } else {
        name = "UPDATE";
    }

    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                    <h3 className="m-0">{name} PRODUCT</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="productName" className="required-star">
                                    Product Name<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    placeholder="Enter Product Name"
                                    name="productName"
                                    required
                                    onChange={handleInput}
                                    value={values.productName}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="stock" className="required-star">
                                    Stock<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="stock"
                                    placeholder="Enter Stock Quantity"
                                    name="stock"
                                    required
                                    onChange={handleInput}
                                    value={values.stock}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="unit" className="required-star">
                                    Unit<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <select
                                    className="form-control"
                                    id="unit"
                                    name="unit"
                                    required
                                    onChange={handleInput}
                                    value={values.unit}
                                >
                                    <option value="">Select Unit</option>
                                    <option value="Pcs">Pcs</option>
                                    <option value="Kg">Kg</option>
                                    <option value="Ltr">Ltr</option>
                                    <option value="Meter">Meter</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="hsnCode" className="required-star">
                                    HSN Code<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="hsnCode"
                                    placeholder="Enter HSN Code"
                                    name="hsnCode"
                                    required
                                    onChange={handleInput}
                                    value={values.hsnCode}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 button-group">
    {!params.id ? (
        <button className="btn btn-primary me-3 fw-bold" type="submit" style={{ width: "120px" }}>
            Save
        </button>
    ) : (
        <button className="btn btn-primary me-3 fw-bold" type="submit" onClick={handleUpdate} style={{ width: "120px" }}>
            Update
        </button>
    )}
    <button className="btn btn-danger fw-bold" type="button" onClick={handleCancel} style={{ width: "120px" }}>
        Cancel
    </button>
</div>
                </form>
            </main>
        </>
    );
};

export default Product;