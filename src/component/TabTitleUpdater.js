import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TabTitleUpdater = () => {
    const location = useLocation();

    useEffect(() => {
        // Extract the route name from the path
        const path = location.pathname;

        // Set the tab title based on the current route
        switch (path) {
            // Static routes
            case "/dashboard":
                document.title = "Dashboard | StockNest";
                break;
            case "/purchase":
                document.title = "Purchase Bill | StockNest";
                break;
            case "/sale":
                document.title = "Sales Bill | StockNest";
                break;
            case "/product":
                document.title = "Product | StockNest";
                break;
            case "/customer":
                document.title = "Customer | StockNest";
                break;
            case "/vendor":
                document.title = "Vendor | StockNest";
                break;
            case "/report":
                document.title = "Report | StockNest";
                break;
            case "/setting":
                document.title = "Setting | StockNest";
                break;
            case "/expense-tracker":
                document.title = "Expense Tracker | StockNest";
                break;
            case "/income":
                document.title = "Income | StockNest";
                break;
            case "/login":
                document.title = "Login | StockNest";
                break;
            case "/signup":
                document.title = "Signup | StockNest";
                break;
            case "/forgot-password":
                document.title = "Forgot Password | StockNest";
                break;
            case "/reset-password":
                document.title = "Reset Password | StockNest";
                break;
            case "/terms-conditions":
                document.title = "Terms & Conditions | StockNest";
                break;
            case "/privacy-policy":
                document.title = "Privacy Policy | StockNest";
                break;
            case "/customer-care":
                document.title = "Customer Care | StockNest";
                break;

            // Dynamic routes
            case path.startsWith("/purchase-bill/") && path:
                document.title = "Purchase Bill Details | StockNest";
                break;
            case path.startsWith("/purchase/") && path:
                document.title = "Purchase Bill | StockNest";
                break;
            case path.startsWith("/sale/") && path:
                document.title = "Sales Bill | StockNest";
                break;
            case path.startsWith("/sale-bill/") && path:
                document.title = "Sales Bill Details | StockNest";
                break;
            case path.startsWith("/product/") && path:
                document.title = "Product | StockNest";
                break;
            case path.startsWith("/customer/") && path:
                document.title = "Customer | StockNest";
                break;
            case path.startsWith("/vendor/") && path:
                document.title = "Vendor | StockNest";
                break;
            case path.startsWith("/setting/") && path:
                document.title = "Setting | StockNest";
                break;
            case path.startsWith("/expense-tracker/") && path:
                document.title = "Expense Tracker | StockNest";
                break;
            case path.startsWith("/income/") && path:
                document.title = "Income | StockNest";
                break;

            // Default title
            default:
                document.title = "StockNest";
                break;
        }
    }, [location.pathname]); // Update title whenever the path changes

    return null; // This component doesn't render anything
};

export default TabTitleUpdater;