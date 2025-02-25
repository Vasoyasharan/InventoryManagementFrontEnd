import axios from "axios";
import React, { useEffect, useState } from "react";
import { Url, config } from "../../Url";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faUserPlus, faEye, faUserSlash, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./CustomerList.css";

const CustomerList = (props) => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Default records per page
    const [currentPage, setCurrentPage] = useState(1);
    const URL = Url + "/customer";

    const fetchData = async () => {
        try {
            const response = await axios.get(URL, config);
            setData(response.data.payload.customerData);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (customerID) => {
        try {
            await axios.delete(`${URL}/${customerID}`, config);
            fetchData();
            toast.success("Customer Deleted Successfully");
        } catch (error) {
            return toast.error(error.response.data.message);
        }
    };

    // Filter data based on search query
    const filteredData = data.filter((item) => {
        const customerName = item.customerName || "";
        const mobileNo = item.mobileNo || "";
        const city = item.city || "";
        const state = item.state || "";

        return (
            customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mobileNo.includes(searchQuery) ||
            city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            state.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                <h3 className="m-0">{props.name}</h3>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <NavLink to="add" className="btn btn-md btn-outline-dark">
                        Add Customer
                        <FontAwesomeIcon icon={faUserPlus} className="mx-2" />
                    </NavLink>
                </div>
            </div>

            {/* Search and Records Per Page */}
            <div className="row mt-3">
                <div className="col-md-4 mb-3">
                    <div className="search-box">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name, Mobile, City, or State"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="entries-selector">
                        <span>Show</span>
                        <select
                            className="form-control"
                            value={recordsPerPage}
                            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="mt-3">
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Mobile No (+91)</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((item) => (
                            <tr key={item._id}>
                                <td>{item.customerName}</td>
                                <td>{item.mobileNo}</td>
                                <td>{item.city || "-"}</td>
                                <td>{item.state || "-"}</td>
                                <td className="action-icons">
                                    <button
                                        className="view-icon"
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <NavLink
                                        to={{ pathname: `update/${item._id}` }}
                                        state={item}
                                        className="link-primary mx-2"
                                    >
                                        <FontAwesomeIcon icon={faUserPen} />
                                    </NavLink>
                                    <div
                                        className="link-danger mx-2"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <FontAwesomeIcon icon={faUserSlash} />
                                    </div>
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

export default CustomerList;