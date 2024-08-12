import React, { useEffect, useState } from "react";
import axios from "axios";
import { Url, config } from "../../Url";
import "./Dashboard.css";

const Dashboard = () => {
    const [customerCount, setCustomerCount] = useState(0);
    const [vendorCount, setVendorCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [purchaseCount, setPurchaseCount] = useState(0);
    const [saleCount, setSaleCount] = useState(0);

    const fetchCustomerCount = async () => {
        try {
            setCustomerCount(
                (await axios.get(`${Url}/customer`, config)).data.count
            );
        } catch (error) {
            console.error("Error fetching customer count:", error);
        }
    };

    const fetchVendorCount = async () => {
        try {
            setVendorCount(
                (await axios.get(`${Url}/vendor`, config)).data.count
            );
        } catch (error) {
            console.error("Error fetching vendor count:", error);
        }
    };

    const fetchProductCount = async () => {
        try {
            setProductCount(
                (await axios.get(`${Url}/product`, config)).data.count
            );
        } catch (error) {
            console.error("Error fetching product count:", error);
        }
    };

    const fetchPurchaseCount = async () => {
        try {
            setPurchaseCount(
                (await axios.get(`${Url}/purchase`, config)).data.count
            );
        } catch (error) {
            console.error("Error fetching purchase count: ", error);
        }
    };

    const fetchSaleCount = async () => {
        try {
            setSaleCount((await axios.get(`${Url}/sale`, config)).data.count);
        } catch (error) {
            console.error("Error fetching sale count: ", error);
        }
    };

    useEffect(() => {
        fetchCustomerCount();
        fetchVendorCount();
        fetchProductCount();
        fetchPurchaseCount();
        fetchSaleCount();
    }, []);

    const cardData = [
        {
            title: "Total Vendors",
            value: vendorCount,
            className: "card-line-primary",
        },
        {
            title: "Total Customers",
            value: customerCount,
            className: "card-line-success",
        },
        {
            title: "Total Products",
            value: productCount,
            className: "card-line-danger",
        },
        {
            title: "Total Purchase Bill",
            value: purchaseCount,
            className: "card-line-warning",
        },
        {
            title: "Total Sale Bill",
            value: saleCount,
            className: "card-line-danger",
        },
    ];

    return (
        <main className="dashboard-main col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>

            {/* Card Section */}
            <section className="dashboard-content">
                <div className="row">
                    {cardData.map((card, index) => (
                        <div
                            key={index}
                            className="col-12 col-md-6 col-lg-3 mb-4"
                        >
                            <div
                                className={`card shadow card-line ${card.className}`}
                            >
                                <div className="card-body">
                                    <u>
                                        <div className="card-title">
                                            {card.title}
                                        </div>
                                    </u>
                                    <div className="card-text">
                                        {card.value}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
