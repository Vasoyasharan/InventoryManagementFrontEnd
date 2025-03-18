import "../Css/Sidebar.css";
import Dashboard from "../pages/home/Dashboard";
import Report from "../pages/Reports/Report";
import CustomerList from "../pages/Customer";
import Customer from "../pages/Customer/Customer";
import VendorList from "../pages/Vendor";
import Vendor from "../pages/Vendor/Vendor";
import ProductList from "../pages/Product";
import Product from "../pages/Product/Product";
import PurchaseBillList from "../pages/Purchase";
import PurchaseBill from "../pages/Purchase/Purchase";
import PurchaseData from "../pages/Purchase/PurchaseData"
import SaleBillList from "../pages/Sale";
import SalesBill from "../pages/Sale/Sales";
import SaleBillDetails from "../pages/Sale/SaleBillDetails"
import setting from "../pages/setting";
import ExpenseTrackerTable from "../pages/ExpenseTracker/ExpenseTrackerTable";
import ExpenseTrackerForm from "../pages/ExpenseTracker/ExpenseTrackerForm";
import IncomeForm from "../pages/Income/IncomeForm";
import IncomeList from "../pages/Income/IncomeTable";
import PremiumPage from "../pages/PremiumPage/PremiumPage";

const PageRoutes = [
    { path: "/dashboard", element: Dashboard, name: "DASHBOARD" },
    { path: "/purchase", element: PurchaseBillList, name: "PURCHASE BILL" },
    { path: "/purchase-bill/:id?", element: PurchaseData, name: "PURCHASE BILL" },
    { path: "/purchase/:type/:id?", element: PurchaseBill, name: "PURCHASE BILL" },
    { path: "/sale", element: SaleBillList, name: "SALES BILL" },
    { path: "/sale/:type/:id?", element: SalesBill, name: "SALES BILL" },
    { path: "/sale-bill/:id", element: SaleBillDetails, name: "SALES BILL DETAILS" },
    { path: "/product", element: ProductList, name: "PRODUCT" },
    { path: "/product/:type/:id?", element: Product },
    { path: "/customer", element: CustomerList, name: "CUSTOMER" },
    { path: "/customer/:type/:id?", element: Customer },
    { path: "/vendor", element: VendorList, name: "VENDOR" },
    { path: "/vendor/:type/:id?", element: Vendor },
    { path: "/report", element: Report, name: "REPORT" },
    { path: "/setting/:type/:id?", element: setting },
    { path: "/setting", element: setting, name: "SETTING" },
    { path: "/expense-tracker", element: ExpenseTrackerTable, name: "EXPENSE TRACKER" },
    { path: "/expense-tracker/:type/:id?", element: ExpenseTrackerForm },
    { path: "/income", element: IncomeList, name: "INCOME" },
    { path: "/income/:type/:id?", element: IncomeForm },
    { path: "/premium", element: PremiumPage, name: "GO PREMIUM" },
];

export { PageRoutes };
