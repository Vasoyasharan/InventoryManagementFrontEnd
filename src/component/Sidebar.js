import { NavLink } from "react-router-dom";
import defaultImage from "../images/def_admin_logo.avif";

const Sidebar = () => {
  const userName = (localStorage.getItem("username") || "null").toUpperCase();

  // Retrieve the user image from localStorage or use the default image
  const userImage = localStorage.getItem("userImage") || defaultImage;

  return (
    <div className="theme-cyan">
      <aside id="leftsidebar" className="sidebar">
        {/* Branding */}
        <NavLink
          className="navbar-brand d-flex align-items-center px-3"
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <i
            className="fas fa-store"
            style={{
              fontSize: "24px",
              color: "#007bff",
              marginRight: "8px",
            }}
          ></i>
          <span style={{ fontSize: "17px", fontWeight: "500" }}>
            Inventory Management
          </span>
        </NavLink>

        {/* User Info */}
        <div className="user-info text-center my-3">
          <div className="image">
            <NavLink to="/profile">
              <img
                src={userImage}
                alt="User"
                style={{
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
            </NavLink>
          </div>
          <div className="detail mt-2">
            <h4><u>{userName}</u></h4>
          </div>
        </div>

        {/* Menu */}
        <div className="menu">
          <ul className="list-unstyled px-3">
            <li>
              <NavLink to="/dashboard" className="d-flex align-items-center py-2">
                <i className="fas fa-home me-3"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/purchase"
                className="d-flex align-items-center py-2"
              >
                <i className="fas fa-file-alt me-3"></i>
                <span>Purchase Bill</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sales"
                className="d-flex align-items-center py-2"
              >
                <i className="fas fa-receipt me-3"></i>
                <span>Sales Bill</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="d-flex align-items-center py-2"
              >
                <i className="fas fa-box me-3"></i>
                <span>Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customers"
                className="d-flex align-items-center py-2"
              >
                <i className="fas fa-users me-3"></i>
                <span>Customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/vendors" className="d-flex align-items-center py-2">
                <i className="fas fa-truck me-3"></i>
                <span>Vendors</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className="d-flex align-items-center py-2">
                <i className="fas fa-chart-line me-3"></i>
                <span>Reports</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
