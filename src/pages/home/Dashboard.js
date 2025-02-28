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
    const data = [
        { name: "Jan", orders: 2100, sales: 2500 },
        { name: "Feb", orders: 2000, sales: 2200 },
        { name: "Mar", orders: 2200, sales: 2400 },
        { name: "Apr", orders: 2300, sales: 2600 },
        { name: "May", orders: 2400, sales: 2700 },
        { name: "Jun", orders: 2500, sales: 2900 },
    ];

    const productPerformance = [
        { name: "Pencil", uv: 3000, pv: 2400 },
        { name: "Notebook", uv: 2000, pv: 2000 },
        { name: "Pen", uv: 4000, pv: 2400 },
        { name: "Glue Stick", uv: 3000, pv: 2200 },
        { name: "Stapler", uv: 2000, pv: 1500 },
        { name: "Piano", uv: 1000, pv: 1200 },
    ];

    const [customerCount, setCustomerCount] = useState(0);
    const [vendorCount, setVendorCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [purchaseCount, setPurchaseCount] = useState(0);
    const [saleCount, setSaleCount] = useState(0);

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

    useEffect(() => {
        fetchCounts();
    }, []);

    const cardData = [
        {
            title: "Vendors",
            value: vendorCount,
            icon: faStore,
            iconColor: "#097066", // Teal
            addRoute: "/vendor/add", // Route for adding a vendor
        },
        {
            title: "Customers",
            value: customerCount,
            icon: faUsers,
            iconColor: "#3f4add", // Blue
            addRoute: "/customer/add", // Route for adding a customer
        },
        {
            title: "Products",
            value: productCount,
            icon: faCubes,
            iconColor: "#df4b26", // Red
            addRoute: "/product/add", // Route for adding a product
        },
        {
            title: "Purchase Bills",
            value: purchaseCount,
            icon: faFileInvoiceDollar,
            iconColor: "#c9cc1b", // Yellow
            addRoute: "/purchase/add", // Route for adding a purchase bill
        },
        {
            title: "Sale Bills",
            value: saleCount,
            icon: faMoneyBillWave,
            iconColor: "#72ee72", // Green
            addRoute: "/sale/add", // Route for adding a sale bill
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
                               {/* "+" Icon */}
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

                {/* Sales Overview and Product Performance */}
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header bg-white">
                                <h4 className="card-title">Sales Overview</h4>
                            </div>
                            <div className="card-body">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} />
                                        <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header bg-white">
                                <h4 className="card-title">Product Performance</h4>
                            </div>
                            <div className="card-body">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={productPerformance}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="uv" fill="#8884d8" />
                                        <Bar dataKey="pv" fill="#82ca9d" />
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