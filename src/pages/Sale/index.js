/* eslint-disable react-hooks/exhaustive-deps */
import { faFileCirclePlus, faFilePen, faTrashCan, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Url, config } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";
import "../Purchase/PurchaseBillList.css";

const SaleBillList = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const URL = Url + "/sale";

    const fetchData = async (filterType = "all") => {
        try {
            let apiUrl = URL;
            if (filterType === "withGST") {
                apiUrl += "?isGSTBill=true";
            } else if (filterType === "withoutGST") {
                apiUrl += "?isGSTBill=false";
            }
            const response = await axios.get(apiUrl, config);
            if (response.data.payload && response.data.payload.result) {
                setData(response.data.payload.result);
            } else {
                toast.error("Invalid data format received from the server");
                setData([]);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(filter);
    }, [filter]);

    const handleDelete = async (saleID) => {
        try {
            await axios.delete(`${URL}/${saleID}`, config);
            fetchData(filter);
            toast.success("Sale Bill Deleted Successfully");
        } catch (error) {
            return toast.error(error.response?.data?.message || "Error deleting sale bill");
        }
    };

    const filteredData = (data || []).filter((item) =>
        item.billNo.toString().includes(searchQuery) ||
        (item.customerId?.customerName?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                <h3 className="m-0">{props.name}</h3>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <NavLink to="add" className="btn btn-md btn-outline-dark">
                        Add Sales Bill
                        <FontAwesomeIcon icon={faFileCirclePlus} className="mx-2" />
                    </NavLink>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-between mb-3">
                    <button className={`btn flex-fill mx-1 ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFilter("all")}>All</button>
                    <button className={`btn flex-fill mx-1 ${filter === "withGST" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFilter("withGST")}>With GST</button>
                    <button className={`btn flex-fill mx-1 ${filter === "withoutGST" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFilter("withoutGST")}>Without GST</button>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" placeholder="Search by Bill No, Customer, or Product" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="col-md-3 mb-3">
                    <select className="form-control" value={recordsPerPage} onChange={(e) => setRecordsPerPage(Number(e.target.value))}>
                        <option value={10}>10 records</option>
                        <option value={20}>20 records</option>
                        <option value={30}>30 records</option>
                        <option value={40}>40 records</option>
                    </select>
                </div>
            </div>

            <div className="mt-3">
                <table className="table custom-table">
                    <thead>
                        <tr className="text-center">
                            <th>Bill Date</th>
                            <th>Bill No.</th>
                            <th>Customer Name</th>
                            <th>Bill Type</th>
                            <th>Amount (₹)</th>
                            <th>GST (%)</th>
                            <th>GST (₹)</th>
                            <th>Taxable Amount (₹)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((item) => (
                            <tr key={item._id}>
                                <td className="text-center">{new Date(item.billDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</td>
                                <td className="text-center">{item.billNo}</td>
                                <td className="text-center">{item.customerId?.customerName || <em>Unavailable</em>}</td>
                                <td className="text-center">{item.isGSTBill ? "With GST" : "Without GST"}</td>
                                <td className="text-center">{item.totalAmount}</td>
                                <td className="text-center">{item.isGSTBill ? `${parseFloat(item.GSTPercentage).toFixed(2)}%` : "-"}</td>
                                <td className="text-center">{item.isGSTBill ? `${item.GSTAmount}` : "-"}</td>
                                <td className="text-center">{item.finalAmount}</td>
                                <td className="text-center action-icons">
                                    <button className="view-icon">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <NavLink to={{ pathname: `/update/${item._id}` }} state={item} className="link-primary mx-2">
                                        <FontAwesomeIcon icon={faFilePen} />
                                    </NavLink>
                                    <NavLink className="link-danger mx-2" onClick={() => handleDelete(item._id)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length} entries
                </div>
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(filteredData.length / recordsPerPage) }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                <button className="page-link" onClick={() => paginate(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </main>
    );
};

export default SaleBillList;
