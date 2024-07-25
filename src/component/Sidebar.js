import "../Css/Dashboard.css"
import React from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faFileInvoice, faBoxOpen, faUsers, faTruck, faChartLine, faPhone, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-info sidebar">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/dashboard">
                    <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/purchase">
                    <FontAwesomeIcon icon={faFileInvoice} /> Purchase Bill
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/product">
                    <FontAwesomeIcon icon={faBoxOpen} /> Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/customer">
                    <FontAwesomeIcon icon={faUsers} /> Customers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/vendor">
                    <FontAwesomeIcon icon={faTruck} /> Vendors
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/report">
                    <FontAwesomeIcon icon={faChartLine} /> Report
                  </NavLink>
                </li>
              </ul>
              <div className="sidebar-footer">
                <h5>Customer Care</h5>
                <div className="contact-icons">
                  <FontAwesomeIcon icon={faPhone} size="lg" /> &nbsp;
                  <FontAwesomeIcon icon={faEnvelope} size="lg" /> &nbsp;
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Sidebar
