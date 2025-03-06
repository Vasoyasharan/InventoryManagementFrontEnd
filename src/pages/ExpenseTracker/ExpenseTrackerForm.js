import React, { useEffect, useState } from "react";
import { Url, config } from "../../Url";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ExpenseTrackerForm = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        expenseName: "",
        expenseDate: "",
        supplierName: "",
        paymentMode: "cash",
        amount: "",
        note: "",
    });

    const [loading, setLoading] = useState(false);

    const URL = Url + "/expense";

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
            setValues({ expenseName: "", expenseDate: "", supplierName: "", paymentMode: "cash", amount: "", note: "" });
            navigate("/expense-tracker");
            toast.success("Expense Created Successfully");
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
            const { userId, _id, createdAt, updatedAt, ...payload } = values;
            await axios.put(`${URL}/${params.id}`, payload, config);
            setValues({ expenseName: "", expenseDate: "", supplierName: "", paymentMode: "", amount: "", note: "" });
            navigate("/expense-tracker");
            toast.success("Expense Updated Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating expense");
        }
    };

    const fetchData = async () => {
        try {
            if (params.id) {
                const response = await axios.get(`${URL}/${params.id}`, config);
                let fetchedData = response?.data?.payload?.expense?.[0];

                if (fetchedData) {
                    // Convert UTC Date to YYYY-MM-DD format for the date input
                    let formattedDate = new Date(fetchedData.expenseDate).toISOString().split("T")[0];

                    setValues({ ...fetchedData, expenseDate: formattedDate });
                }
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
        navigate("/expense-tracker");
    };

    let name = params.type === "add" ? "ADD" : "UPDATE";

    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                    <h3 className="m-0">{name} EXPENSE </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="expenseName" className="required-star">
                                Expense Name<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="expenseName"
                                name="expenseName"
                                placeholder="Enter Expense Name"
                                required
                                onChange={handleInput}
                                value={values.expenseName}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="expenseDate" className="required-star">
                                Expense Date<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="expenseDate"
                                name="expenseDate"
                                required
                                onChange={handleInput}
                                value={values.expenseDate}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="supplierName" className="required-star">
                                Supplier Name<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="supplierName"
                                name="supplierName"
                                placeholder="Enter Supplier Name"
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

export default ExpenseTrackerForm;
