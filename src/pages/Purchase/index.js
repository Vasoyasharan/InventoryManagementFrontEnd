/* eslint-disable react-hooks/exhaustive-deps */
import { faFileCirclePlus, faFilePen, faTrashCan, faEye, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Url, config } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";
import "./PurchaseBillList.css";

const PurchaseBillList = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const URL = Url + "/purchase";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let apiUrl = URL;
                if (filter === "withGST") {
                    apiUrl += "?isGSTBill=true";
                } else if (filter === "withoutGST") {
                    apiUrl += "?isGSTBill=false";
                }
                const response = await axios.get(apiUrl, config);
                if (response.data.payload && response.data.payload.purchaseBills) {
                    setData(response.data.payload.purchaseBills);
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

        fetchData();
    }, [filter]); // Only runs when `filter` changes

    // Function to handle row click
    const handleRowClick = (item) => {
        navigate(`/purchase-bill/${item._id}`, { state: item }); // Navigate to details page with data
    };
    const handleDownloadCSV = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/csv", {
                params: { type: "purchase" }, // Pass type as a query parameter
                headers: { ...config.headers }, // Include config headers (if any)
                responseType: "blob", // Important for handling file download
            });

            // Create a Blob URL for the file
            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link and trigger download
            const a = document.createElement("a");
            a.href = url;
            a.download = "Purchase_Bill.csv"; // File name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Cleanup the blob URL
            window.URL.revokeObjectURL(url);

            toast.success("CSV Downloaded Successfully");
        } catch (error) {
            toast.error("Error downloading CSV");
        }
    };

    const handleDelete = async (purchaseID) => {
        try {
            await axios.delete(`${URL}/${purchaseID}`, config);
            toast.success("Purchase Bill Deleted Successfully");
            setData((prevData) => prevData.filter((item) => item._id !== purchaseID)); // Update state without API call
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting bill");
        }
    };

    const filteredData = (data || []).filter(
        (item) =>
            item.billNo.toString().includes(searchQuery) ||
            (item.vendorId?.vendorName?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.productId?.productName?.toLowerCase().includes(searchQuery.toLowerCase()))
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
                        Add Purchase Bill
                        <FontAwesomeIcon icon={faFileCirclePlus} className="mx-2" />
                    </NavLink>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-between mb-3">
                    <button
                        className={`btn flex-fill mx-1 ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={`btn flex-fill mx-1 ${filter === "withGST" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setFilter("withGST")}
                    >
                        With GST
                    </button>
                    <button
                        className={`btn flex-fill mx-1 ${filter === "withoutGST" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setFilter("withoutGST")}
                    >
                        Without GST
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-2 mb-1">
                    <select
                        className="form-control"
                        value={recordsPerPage}
                        onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                    >
                        <option value={100}>Show 100</option>
                        <option value={50}>Show 50</option>
                        <option value={40}>Show 40</option>
                        <option value={30}>Show 30</option>
                        <option value={20}>Show  20</option>
                        <option value={10}>Show 10</option>
                    </select>
                </div>
                <div className="col-md-3 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Bill No, Vendor"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    className="col-md-1 mb-3 btn"
                    onClick={handleDownloadCSV}
                    style={{ border: "2px solid blue", borderRadius: "8px", padding: "6px 12px", fontWeight: "bold" }}
                >
                    <FontAwesomeIcon icon={faFileExcel} className="me-2" style={{ color: "green", fontSize: "19px" }} /> Export
                </button>



            </div>

            <div className="mt-3">
                <table className="table custom-table">
                    <thead>
                        <tr className="text-center">
                            <th className="text-center">Bill Date</th>
                            <th className="text-center">Bill No.</th>
                            <th className="text-center">Vendor Name</th>
                            <th className="text-center">Bill Type</th>
                            <th className="text-center">Amount (₹)</th>
                            <th className="text-center">GST (%)</th>
                            <th className="text-center">GST (₹)</th>
                            <th className="text-center">Taxable Amount (₹)</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((item) => (
                            <tr key={item._id} onClick={() => handleRowClick(item)} style={{ cursor: "pointer" }}>
                                <td className="text-center">
                                    {new Date(item.billDate).toLocaleDateString("en-GB").replace(/\//g, "-")}
                                </td>
                                <td className="text-center">{item.billNo}</td>
                                <td className="text-center">{item.vendorId ? item.vendorId.vendorName : <em>Unavailable Vendor</em>}</td>
                                <td className="text-center">{item.isGSTBill ? "With GST" : "Without GST"}</td>
                                <td className="text-center">{item.totalAmount}</td>
                                <td className="text-center">{item.isGSTBill ? `${parseFloat(item.GSTPercentage).toFixed(2)}%` : "-"}</td>
                                <td className="text-center">{item.isGSTBill ? `${item.GSTAmount}` : "-"}</td>
                                <td className="text-center">{item.finalAmount}</td>
                                <td className="action-icons text-center" >
                                    <button className="view-icon">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <NavLink to={{ pathname: `update/${item._id}` }} state={item} className="link-primary mx-2" onClick={(e) => e.stopPropagation()}>
                                        <FontAwesomeIcon icon={faFilePen} />
                                    </NavLink>
                                    <NavLink className="link-danger mx-2" onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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

export default PurchaseBillList;
