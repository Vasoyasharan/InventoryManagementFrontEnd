import { faFileCirclePlus, faFilePen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Url, config } from "../../Url";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import './PurchaseBillList.css'; // Import the CSS file

const PurchaseBillList = (props) => {
    const [data, setData] = useState([]);
    const URL = Url + "purchase";

    const fetchData = async () => {
        try {
            const response = await axios.get(URL, config);
            setData(response.data.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (purchaseID) => {
        try {
            await axios.delete(`${URL}/delete/${purchaseID}`, config);
            fetchData();
            toast.success("Purchase Bill Deleted Successfully");
        } catch (error) {
            return toast.error(error.response.data.message);
        }
    };

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                <h3 className="m-0">{props.name}</h3>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <NavLink to="add" className="btn btn-md btn-outline-dark">
                        Add Purchase Bill
                        <FontAwesomeIcon icon={faFileCirclePlus} className="mx-2" />
                    </NavLink>
                </div>
            </div>

            <div className="mt-3">
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th>Bill No.</th>
                            <th>Vendor Name</th>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Qty.</th>
                            <th>Price (₹)</th>
                            <th>Amount (₹)</th>
                            <th colSpan="2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((item) => {
                                var n = new Date(item.date);
                                const date = n.toISOString().split("T")[0];
                                return (
                                    <tr key={item.purchaseID}>
                                        <td>{item.billNo}</td>
                                        <td>{item.vendor.vendorName}</td>
                                        <td>{date}</td>
                                        <td>{item.product.productName}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.price}</td>
                                        <td>{item.amount}</td>
                                        <td className="action-icons">
                                            <NavLink to={{ pathname: `update/${item.purchaseID}` }} state={item} className="link-primary mx-2">
                                                <FontAwesomeIcon icon={faFilePen} />
                                            </NavLink>
                                            <NavLink className="link-danger mx-2" onClick={() => handleDelete(item.purchaseID)}>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </NavLink>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default PurchaseBillList;
