import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Url, config } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilePen, faTrashCan, faEye, faFileExcel, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./PurchaseBillList.css";

const PurchaseBillList = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [vendorFilter, setVendorFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [billNoFilter, setBillNoFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [appliedFilters, setAppliedFilters] = useState({});
    const URL = Url + "/purchase";
    const navigate = useNavigate();

    // Fetch vendors from the backend
    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${Url}/vendor`, config);
            setVendors(response.data.payload.vendorData);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching vendors");
        }
    };

    // Fetch purchase bills data
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

    useEffect(() => {
        fetchData();
        fetchVendors();
    }, [filter]);

    const handleRowClick = (item) => {
        navigate(`/purchase-bill/${item._id}`, { state: item });
    };

    const handleDownloadCSV = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/csv", {
                params: { type: "purchase" },
                headers: { ...config.headers },
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Purchase_Bill.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
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
            setData((prevData) => prevData.filter((item) => item._id !== purchaseID));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting bill");
        }
    };

    const applyFilters = () => {
        setAppliedFilters({
            vendor: vendorFilter,
            date: dateFilter,
            billNo: billNoFilter,
            sortBy: sortBy,
        });
        setIsFilterBoxOpen(false);
    };

    const resetFilters = () => {
        setVendorFilter("");
        setDateFilter("");
        setBillNoFilter("");
        setSortBy("");
        setAppliedFilters({});
    };

    const filteredData = (data || []).filter(
        (item) =>
            item.billNo.toString().includes(appliedFilters.billNo || "") &&
            (item.vendorId?.vendorName?.toLowerCase().includes((appliedFilters.vendor || "").toLowerCase())) &&
            (item.billDate.includes(appliedFilters.date || ""))
    );

    const sortedData = filteredData.sort((a, b) => {
        if (appliedFilters.sortBy === "date") {
            return new Date(a.billDate) - new Date(b.billDate);
        } else if (appliedFilters.sortBy === "amount") {
            return a.totalAmount - b.totalAmount;
        } else if (appliedFilters.sortBy === "billNo") {
            return a.billNo.localeCompare(b.billNo);
        }
        return 0;
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

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
                        <option value={10}>Show 10</option>
                        <option value={20}>Show 20</option>
                        <option value={30}>Show 30</option>
                        <option value={40}>Show 40</option>
                        <option value={50}>Show 50</option>
                        <option value={100}>Show 100</option>
                    </select>
                </div>
                <div className="col-md-8"></div>
                <div className="col-md-2 d-flex justify-content-end">
                    <div className="position-relative me-2">
                        <div
                            className="filter-icon"
                            onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                height: "48px",
                                padding: "6px 12px",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <FontAwesomeIcon icon={faFilter} style={{ color: "blue", fontSize: "19px" }} />
                            {Object.keys(appliedFilters).length > 0 && (
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="ms-2"
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resetFilters();
                                    }}
                                />
                            )}
                        </div>
                        <div className={`filter-box position-absolute bg-white p-3 shadow rounded mt-2 ${isFilterBoxOpen ? "open" : ""}`}>
                            <div className="form-group mb-3">
                                <label>Vendor</label>
                                <select
                                    className="form-control"
                                    value={vendorFilter}
                                    onChange={(e) => setVendorFilter(e.target.value)}
                                >
                                    <option value="">Select Vendor</option>
                                    {vendors.map((vendor) => (
                                        <option key={vendor._id} value={vendor.vendorName}>
                                            {vendor.vendorName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label>Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Bill No.</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Bill No"
                                    value={billNoFilter}
                                    onChange={(e) => setBillNoFilter(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Sort By</label>
                                <select
                                    className="form-control"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="">Select Sort By</option>
                                    <option value="date">Date</option>
                                    <option value="amount">Amount</option>
                                    <option value="billNo">Bill No.</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-secondary me-2" onClick={resetFilters}>Reset</button>
                                <button className="btn btn-primary" onClick={applyFilters}>Apply</button>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn"
                        onClick={handleDownloadCSV}
                        style={{ border: "2px solid blue", borderRadius: "8px", padding: "6px 12px", fontWeight: "bold" }}
                    >
                        <FontAwesomeIcon icon={faFileExcel} className="me-2" style={{ color: "green", fontSize: "19px" }} /> Export
                    </button>
                </div>
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
                                <td className="action-icons text-center">
                                    <button
                                        className="view-icon"
                                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, margin: "0 4px", fontSize: "1.3rem" }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
                                    >
                                        <FontAwesomeIcon icon={faEye} style={{ color: "#666", transition: "opacity 0.3s", opacity: 1 }} />
                                    </button>
                                    <NavLink
                                        to={{ pathname: `update/${item._id}` }}
                                        state={item}
                                        className="link-primary mx-2"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, margin: "0 4px" }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
                                    >
                                        <FontAwesomeIcon icon={faFilePen} style={{ color: "#666", transition: "opacity 0.3s", opacity: 1 }} />
                                    </NavLink>
                                    <NavLink
                                        className="link-danger mx-2"
                                        onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, margin: "0 4px" }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#666", transition: "opacity 0.3s", opacity: 1 }} />
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