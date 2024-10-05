import "../Css/Sidebar.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faFileInvoice, faReceipt, faBoxOpen, faUsers, faTruck, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const sidebarItems = [
    { to: "/dashboard", icon: faTachometerAlt, text: "Dashboard" },
    { to: "/purchase", icon: faFileInvoice, text: "Purchase Bill" },
    { to: "/sale", icon: faReceipt, text: "Sales Bill" },
    { to: "/product", icon: faBoxOpen, text: "Products" },
    { to: "/customer", icon: faUsers, text: "Customers" },
    { to: "/vendor", icon: faTruck, text: "Vendors" },
    { to: "/report", icon: faChartLine, text: "Report" },
    { to: "/setting", icon: faChartLine, text: "setting" },
];

const Sidebar = () => {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                {sidebarItems.map((item, index) => (
                                    <li key={index} className="nav-item">
                                        <NavLink className="nav-link" to={item.to}>
                                            <FontAwesomeIcon icon={item.icon} /> <span className="nav-text">{item.text}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Sidebar;
