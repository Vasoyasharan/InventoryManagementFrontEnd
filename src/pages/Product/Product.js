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
            setValues({ productName: "" });
            navigate("/product");
            toast.success("Product Created Successfully");
        } catch (error) {
            console.log(error);
            setValues({ productName: "" });
            toast.error(error.response.data.message);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (!params.id) return;
        try {
            await axios.put(`${URL}/${params.id}`, values, config);
            setValues({ productName: "" });
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
                                    Product<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    placeholder="Please Add Product"
                                    name="productName"
                                    required
                                    onChange={handleInput}
                                    value={values.productName}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        {!params.id ? (
                            <button className="btn btn-outline-primary me-3 fw-bold" type="submit">
                                Save
                            </button>
                        ) : (
                            <button className="btn btn-outline-primary me-3 fw-bold" type="submit" onClick={handleUpdate}>
                                Update
                            </button>
                        )}
                        <button className="btn btn-outline-danger fw-bold" type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Product;
