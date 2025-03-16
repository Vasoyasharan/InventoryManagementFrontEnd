import React, { useEffect, useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { Url, config } from "../../Url";
import "./Dashboard.css";
import TaskManager from "./TaskManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCubes, faFileInvoiceDollar, faMoneyBillWave, faStore, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Chatbot from "../../component/Chatbot";

const Dashboard = () => {
    const navigate = useNavigate();
    const [customerCount, setCustomerCount] = useState(0);
    const [vendorCount, setVendorCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [purchaseCount, setPurchaseCount] = useState(0);
    const [saleCount, setSaleCount] = useState(0);
    const [transactionData, setTransactionData] = useState([]);

    // Fetch counts for cards
    const fetchCounts = async () => {
        try {
            setCustomerCount((await axios.get(`${Url}/customer`, config)).data.count);
            setVendorCount((await axios.get(`${Url}/vendor`, config)).data.count);
            setProductCount((await axios.get(`${Url}/product`, config)).data.count);
            setPurchaseCount((await axios.get(`${Url}/purchase`, config)).data.count);
            setSaleCount((await axios.get(`${Url}/sale`, config)).data.count);
        } catch (error) {
            console.error("Error fetching counts:", error);
        }
    };

    // Fetch transaction data for charts
    const fetchTransactionData = async () => {
        try {
            const response = await axios.get(`${Url}/reports`, config);
            const data = response.data.payload.transactionData;

            // Prepare data for the charts
            const barData = data.reduce((acc, transaction) => {
                const date = new Date(transaction.billDate).toLocaleDateString();
                if (!acc[date]) {
                    acc[date] = { date, purchase: 0, sale: 0 };
                }
                if (transaction.transaction_type === "purchase") {
                    acc[date].purchase += transaction.amount;
                } else {
                    acc[date].sale += transaction.amount;
                }
                return acc;
            }, {});

            setTransactionData(Object.values(barData));
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    };

    useEffect(() => {
        fetchCounts();
        fetchTransactionData();
    }, []);

    const cardData = [
        {
            title: "Vendors",
            value: vendorCount,
            icon: faStore,
            iconColor: "#097066",
            addRoute: "/vendor/add",
        },
        {
            title: "Customers",
            value: customerCount,
            icon: faUsers,
            iconColor: "#3f4add",
            addRoute: "/customer/add",
        },
        {
            title: "Products",
            value: productCount,
            icon: faCubes,
            iconColor: "#df4b26",
            addRoute: "/product/add",
        },
        {
            title: "Purchase Bills",
            value: purchaseCount,
            icon: faFileInvoiceDollar,
            iconColor: "#c9cc1b",
            addRoute: "/purchase/add",
        },
        {
            title: "Sale Bills",
            value: saleCount,
            icon: faMoneyBillWave,
            iconColor: "#72ee72",
            addRoute: "/sale/add",
        },
    ];

    return (
        <main className="dashboard-main col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>

            {/* Cards Section */}
            <section className="dashboard-content">
                <div className="row">
                    {cardData.map((card, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
                            <div className="card shadow position-relative">
                                <div className="add-icon" onClick={() => navigate(card.addRoute)} title={`Add ${card.title}`}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>

                                <div className="card-body d-flex align-items-center">
                                    <FontAwesomeIcon
                                        icon={card.icon}
                                        size="2x"
                                        className="me-3"
                                        style={{ color: card.iconColor }}
                                    />
                                    <div>
                                        <h2 className="card-value">{card.value}</h2>
                                        <p className="card-title">{card.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Task Manager */}
                <div className="row">
                    <div className="col-12 mb-4">
                        <TaskManager />
                    </div>
                </div>

                {/* Overview Graphs */}
                <div className="row mb-4">
                    {/* Sales Overview */}
                    <div className="col-12 mb-4">
                        <div className="card shadow">
                            <div className="card-header bg-white">
                                <h4 className="card-title">Sales Overview</h4>
                            </div>
                            <div className="card-body">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={transactionData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis
                                            domain={[0, 'auto']} // Automatically adjust the domain based on the data
                                            tick={{ fontSize: 12 }} // Adjust font size if needed
                                            padding={{ top: 10, bottom: 10 }} // Add padding to the top and bottom of the Y-axis
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="purchase" stroke="#8884d8" strokeWidth={2} />
                                        <Line type="monotone" dataKey="sale" stroke="#82ca9d" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Overview */}
                    <div className="col-12 mb-4">
                        <div className="card shadow">
                            <div className="card-header bg-white">
                                <h4 className="card-title">Transactions Overview</h4>
                            </div>
                            <div className="card-body">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={transactionData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis
                                            domain={[0, 'auto']} // Automatically adjust the domain based on the data
                                            tick={{ fontSize: 12 }} // Adjust font size if needed
                                            padding={{ top: 10, bottom: 10 }} // Add padding to the top and bottom of the Y-axis
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="purchase" fill="#8884d8" />
                                        <Bar dataKey="sale" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Chatbot />
        </main>
    );
};

export default Dashboard;