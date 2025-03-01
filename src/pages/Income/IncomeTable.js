import { faFileCirclePlus, faFilePen, faTrashCan, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Url, config } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";

const IncomeTable = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const URL = Url + "/income";

    const fetchData = async () => {
        try {
            const response = await axios.get(URL, config);
            setData(response.data.payload.income);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (incomeID) => {
        try {
            await axios.delete(`${URL}/${incomeID}`, config);
            fetchData();
            toast.success("Income Deleted Successfully");
        } catch (error) {
            return toast.error(error.response.data.message);
        }
    };

    const handleDownloadCSV = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/csv", {
                params: { type: "income" }, // Pass type as a query parameter
                headers: { ...config.headers }, // Include config headers (if any)
                responseType: "blob", // Important for handling file download
            });

            // Create a Blob URL for the file
            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link and trigger download
            const a = document.createElement("a");
            a.href = url;
            a.download = "Income_Bill.csv"; // File name
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

    const filteredData = data.filter((item) =>
        item.incomeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplierName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.paymentMode?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                <h3 className="m-0">Income</h3>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <NavLink to="add" className="btn btn-md btn-outline-dark">
                        Add Income
                        <FontAwesomeIcon icon={faFileCirclePlus} className="mx-2" />
                    </NavLink>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-6 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Income Name, supplierName, or Payment Mode"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <select
                        className="form-control"
                        value={recordsPerPage}
                        onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                    >
                        <option value={10}>10 records</option>
                        <option value={20}>20 records</option>
                        <option value={30}>30 records</option>
                        <option value={40}>40 records</option>
                    </select>
                </div>

                <div className="col-md-2 mb-3"></div>
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
                        <tr>
                            <th>Income Date</th>
                            <th>Income Category</th>
                            <th>supplierName</th>
                            <th>Payment Mode</th>
                            <th>Amount (₹)</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((item) => (
                            <tr key={item._id}>
                                <td>{new Date(item.incomeDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</td>
                                <td>{item.incomeName}</td>
                                <td>{item.supplierName}</td>
                                <td>{item.paymentMode}</td>
                                <td>{item.amount}</td>
                                <td className="truncate-text">{item.note}</td>
                                <td className="action-icons text-center">
                                    <NavLink
                                        to={{ pathname: `update/${item._id}` }}
                                        state={item}
                                        className="link-primary mx-2"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, margin: "0 4px", fontSize: "1.3rem" }}
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

export default IncomeTable;
