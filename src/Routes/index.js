import "../Css/Sidebar.css";
import Dashboard from "../pages/home/Dashboard";
import Report from "../pages/Report";
import CustomerList from "../pages/Customer";
import Customer from "../pages/Customer/Customer";
import VendorList from "../pages/Vendor";
import Vendor from "../pages/Vendor/Vendor";
import ProductList from "../pages/Product";
import Product from "../pages/Product/Product";
import PurchaseBillList from "../pages/Purchase";
import PurchaseBill from "../pages/Purchase/Purchase";
import SalesBill from "../pages/Sale/Sales";
import SaleBillList from "../pages/Sale";

const PageRoutes = [
  { path: "/dashboard", element: Dashboard, name: "DASHBOARD" },
  { path: "/purchase", element: PurchaseBillList, name: "PURCHASE BILL" },
  { path: "/purchase/:type/:id?", element: PurchaseBill , name: "PURCHASE BILL" },
  { path: "/sale/", element: SaleBillList, name: "SALES BILL" },
  { path: "/Sales/:type/:id?", element: SalesBill , name: "SALES BILL" },
  { path: "/product", element: ProductList, name: "PRODUCT" },
  { path: "/product/:type/:id?", element: Product },
  { path: "/customer", element: CustomerList, name: "CUSTOMER" },
  { path: "/customer/:type/:id?", element: Customer },
  { path: "/vendor", element: VendorList, name: "VENDOR" },
  { path: "/vendor/:type/:id?", element: Vendor },
  { path: "/report", element: Report, name: "REPORT" },
];

export { PageRoutes };
