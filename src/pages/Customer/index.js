import axios from "axios";
import React, { useEffect, useState } from "react";
import { Url, config } from "../../Url";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faUserPlus, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import './CustomerList.css'; // Import the CSS file

const CustomerList = (props) => {
    const [data, setData] = useState([]);
    const URL = Url + "customer";

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

    const handleDelete = async (customerID) => {
        try {
            await axios.delete(`${URL}/delete/${customerID}`, config);
            fetchData();
            toast.success("Customer Deleted Successfully");
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
                        Add Customer
                        <FontAwesomeIcon icon={faUserPlus} className="mx-2" />
                    </NavLink>
                </div>
            </div>

            <div className="mt-3">
                <table className="custom-table"> {/* Apply the custom table class */}
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Mobile No (+91)</th>
                            <th colSpan="2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((item) => (
                                <tr key={item.customerID}>
                                    <td>{item.customerName}</td>
                                    <td>{item.mobileNo}</td>
                                    <td className="action-icons"> {/* Apply action icons class */}
                                        <NavLink to={{ pathname: `update/${item.customerID}` }} state={item} className="link-primary mx-2">
                                            <FontAwesomeIcon icon={faUserPen} />
                                        </NavLink>
                                        <div className="link-danger mx-2" onClick={() => handleDelete(item.customerID)}>
                                            <FontAwesomeIcon icon={faUserSlash} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default CustomerList;