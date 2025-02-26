import React, { useEffect, useState } from "react";
import { Url, config } from "../../Url";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const IncomeForm = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        incomeName: "",
        incomeDate: "",
        supplierName: "",
        paymentMode: "cash",
        amount: "",
        note: "",
    });

    const [loading, setLoading] = useState(true);

    const URL = Url + "/income";

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
            setValues({ incomeName: "", incomeDate: "", supplierName: "", paymentMode: "cash", amount: "", note: "" });
            navigate("/income");
            toast.success("Income Recorded Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error recording income");
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (!params.id) return;
        try {
            const { userId, _id, createdAt, updatedAt, ...payload } = values;
            await axios.put(`${URL}/${params.id}`, payload, config);
            setValues({ incomeName: "", incomeDate: "", supplierName: "", paymentMode: "", amount: "", note: "" });
            navigate("/income");
            toast.success("Income Updated Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating income");
        }
    };

    const fetchData = async () => {
        try {
            if (params.id) {
                const response = await axios.get(`${URL}/${params.id}`, config);
                let fetchedData = response?.data?.payload?.income?.[0];

                if (fetchedData) {
                    let formattedDate = new Date(fetchedData.incomeDate).toISOString().split("T")[0];
                    setValues({ ...fetchedData, incomeDate: formattedDate });
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching income data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.id]);

    const handleCancel = () => {
        navigate("/income");
    };

    let name = params.type === "add" ? "ADD" : "UPDATE";

    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                    <h3 className="m-0">{name} INCOME</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="incomeName" className="required-star">
                                Income Name<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="incomeName"
                                name="incomeName"
                                placeholder="Enter Income Name"
                                required
                                onChange={handleInput}
                                value={values.incomeName}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="incomeDate" className="required-star">
                                Income Date<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="incomeDate"
                                name="incomeDate"
                                required
                                onChange={handleInput}
                                value={values.incomeDate}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="supplierName" className="required-star">
                                Source Name<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="supplierName"
                                name="supplierName"
                                placeholder="Enter Source Name"
                                required
                                onChange={handleInput}
                                value={values.supplierName}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="paymentMode" className="required-star">
                                Payment Mode<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                                className="form-control"
                                id="paymentMode"
                                name="paymentMode"
                                required
                                onChange={handleInput}
                                value={values.paymentMode}
                            >
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="online">Online</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="amount" className="required-star">
                                Amount (₹)<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="amount"
                                name="amount"
                                placeholder="Enter Amount"
                                required
                                onChange={handleInput}
                                value={values.amount}
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="note">Note</label>
                            <textarea
                                className="form-control"
                                id="note"
                                name="note"
                                placeholder="Add Note"
                                onChange={handleInput}
                                value={values.note}
                            />
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

export default IncomeForm;
