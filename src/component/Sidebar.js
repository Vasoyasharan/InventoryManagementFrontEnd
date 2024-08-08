import "../Css/Sidebar.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileInvoice, faBoxOpen, faUsers, faTruck, faChartLine, faPhone, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/dashboard">
                    <FontAwesomeIcon icon={faTachometerAlt} /> <span className="nav-text">Dashboard</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/purchase">
                    <FontAwesomeIcon icon={faFileInvoice} /> <span className="nav-text">Purchase Bill</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/product">
                    <FontAwesomeIcon icon={faBoxOpen} /> <span className="nav-text">Products</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/customer">
                    <FontAwesomeIcon icon={faUsers} /> <span className="nav-text">Customers</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/vendor">
                    <FontAwesomeIcon icon={faTruck} /> <span className="nav-text">Vendors</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/report">
                    <FontAwesomeIcon icon={faChartLine} /> <span className="nav-text">Report</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
