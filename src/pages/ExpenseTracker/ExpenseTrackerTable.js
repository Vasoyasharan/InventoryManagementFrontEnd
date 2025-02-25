import { faFileCirclePlus, faFilePen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Url, config } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";
import "./ExpenseTracker.css"; // Import the CSS file

const ExpenseTrackerTable = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Default records per page
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const URL = Url + "/expense";

    const fetchData = async () => {
        try {
            const response = await axios.get(URL, config);
            setData(response.data.payload.expenseData);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (expenseID) => {
        try {
            await axios.delete(`${URL}/${expenseID}`, config);
            fetchData();
            toast.success("Expense Deleted Successfully");
        } catch (error) {
            return toast.error(error.response.data.message);
        }
    };

    // Filter data based on search query
    const filteredData = data.filter((item) =>
        item.expenseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.paymentMode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                <h3 className="m-0">Expense Tracker</h3>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <NavLink to="add" className="btn btn-md btn-outline-dark">
                        Add Expense
                        <FontAwesomeIcon icon={faFileCirclePlus} className="mx-2" />
                    </NavLink>
                </div>
            </div>

            {/* Search and Records Per Page */}
            <div className="row mt-3">
                <div className="col-md-6 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Expense Name, Vendor, or Payment Mode"
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
            </div>

            {/* Table */}
            <div className="mt-3">
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th>Expense Name</th>
                            <th>Vendor Name</th>
                            <th>Payment Mode</th>
                            <th>Amount (₹)</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((item) => (
                            <tr key={item._id}>
                                <td>{item.expenseName}</td>
                                <td>{item.vendorName}</td>
                                <td>{item.paymentMode}</td>
                                <td>{item.amount}</td>
                                <td>{item.note}</td>
                                <td className="action-icons">
                                    <NavLink to={{ pathname: `update/${item._id}` }} state={item} className="link-primary mx-2">
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

export default ExpenseTrackerTable;