/* eslint-disable react-hooks/exhaustive-deps */
import { faFileCirclePlus, faFilePen, faTrashCan, faEye, faFileExcel, faFilter, faTimes, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Url, config } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";
import "../Purchase/PurchaseBillList.css";
import { printSaleBill } from "./PrintSaleBill";  // Import the PrintSaleBill component

const SaleBillList = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
    const [customers, setCustomers] = useState([]); // State to store customers
    const [customerFilter, setCustomerFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [billNoFilter, setBillNoFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [appliedFilters, setAppliedFilters] = useState({}); // Track applied filters
    const URL = Url + "/sale";
    const navigate = useNavigate();

    // Fetch customers from the backend
    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${Url}/customer`, config);
            setCustomers(response.data.payload.customerData);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching customers");
        }
    };

    // Fetch sale bills data
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
            if (response.data.payload && response.data.payload.saleBills) {
                setData(response.data.payload.saleBills);
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
        fetchCustomers(); // Fetch customers when the component mounts
    }, [filter]);

    const handleRowClick = (item) => {
        navigate(`/sale-bill/${item._id}`, { state: item });
    };

    const handleDownloadCSV = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/csv", {
                params: { type: "sale" },
                headers: { ...config.headers },
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Sale_Bill.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            toast.success("CSV Downloaded Successfully");
        } catch (error) {
            toast.error("Error downloading CSV");
        }
    };

    const handleDelete = async (saleID) => {
        try {
            await axios.delete(`${URL}/${saleID}`, config);
            toast.success("Sale Bill Deleted Successfully");
            setData((prevData) => prevData.filter((item) => item._id !== saleID));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting bill");
        }
    };

    const applyFilters = () => {
        setAppliedFilters({
            customer: customerFilter,
            date: dateFilter,
            billNo: billNoFilter,
            sortBy: sortBy,
        });
        setIsFilterBoxOpen(false); // Close the filter box after applying filters
    };

    const resetFilters = () => {
        setCustomerFilter("");
        setDateFilter("");
        setBillNoFilter("");
        setSortBy("");
        setAppliedFilters({}); // Clear applied filters
    };

    const filteredData = (data || []).filter(
        (item) =>
            item.billNo.toString().includes(appliedFilters.billNo || "") &&
            (item.customerId?.customerName?.toLowerCase().includes((appliedFilters.customer || "").toLowerCase())) &&
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
                        Add Sales Bill
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
                <div className="col-md-8"></div> {/* Spacer to push buttons to the right */}
                <div className="col-md-2 d-flex justify-content-end">
                    <div className="position-relative me-2">
                        <div
                            className="filter-icon"
                            onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}
                            style={{
                                border: "1px solid #ddd", // Slight grey border
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
                                        e.stopPropagation(); // Prevent dropdown toggle
                                        resetFilters();
                                    }}
                                />
                            )}
                        </div>
                        <div className={`filter-box position-absolute bg-white p-3 shadow rounded mt-2 ${isFilterBoxOpen ? "open" : ""}`}>
                            <div className="form-group mb-3">
                                <label>Customer</label>
                                <select
                                    className="form-control"
                                    value={customerFilter}
                                    onChange={(e) => setCustomerFilter(e.target.value)}
                                >
                                    <option value="">Select Customer</option>
                                    {customers.map((customer) => (
                                        <option key={customer._id} value={customer.customerName}>
                                            {customer.customerName}
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
                            <th className="text-center">Customer Name</th>
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
                                <td className="text-center">{item.customerId ? item.customerId.customerName : <em>Unavailable Customer</em>}</td>
                                <td className="text-center">{item.isGSTBill ? "With GST" : "Without GST"}</td>
                                <td className="text-center">{item.totalAmount}</td>
                                <td className="text-center">{item.isGSTBill ? `${parseFloat(item.GSTPercentage).toFixed(2)}%` : "-"}</td>
                                <td className="text-center">{item.isGSTBill ? `${item.GSTAmount}` : "-"}</td>
                                <td className="text-center">{item.finalAmount}</td>
                                <td className="action-icons text-center">
                                    <button
                                        className="print-icon"
                                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, margin: "0 4px", fontSize: "1.3rem" }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            printSaleBill(item); // Call the printSaleBill function with the current bill data
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPrint} style={{ color: "#666", transition: "opacity 0.3s", opacity: 1 }} />
                                    </button>
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

export default SaleBillList;