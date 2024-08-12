import React from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./Dashboard.css";
import TaskManager from "./TaskManager";

const Dashboard = () => {
    const data = [
        { name: 'Jan', orders: 2100, sales: 2500 },
        { name: 'Feb', orders: 2000, sales: 2200 },
        { name: 'Mar', orders: 2200, sales: 2400 },
        { name: 'Apr', orders: 2300, sales: 2600 },
        { name: 'May', orders: 2400, sales: 2700 },
        { name: 'Jun', orders: 2500, sales: 2900 },
    ];

    const productPerformance = [
        { name: 'Products A', uv: 3000, pv: 2400 },
        { name: 'Products B', uv: 2000, pv: 2000 },
        { name: 'Products C', uv: 4000, pv: 2400 },
        { name: 'Products D', uv: 3000, pv: 2200 },
        { name: 'Products E', uv: 2000, pv: 1500 },
        { name: 'Products F', uv: 1000, pv: 1200 },
    ];

    const customerData = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <main className="dashboard-main col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                            Share
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                            Export
                        </button>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                </div>
            </div>

            {/* Card Section */}
            <section className="dashboard-content">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="card shadow card-line card-line-primary">
                            <div className="card-body">
                                <div className="card-title">Total Orders</div>
                                <div className="card-text">1,234</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="card shadow card-line card-line-success">
                            <div className="card-body">
                                <div className="card-title">Total Sales</div>
                                <div className="card-text">$12,345</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="card shadow card-line card-line-warning">
                            <div className="card-body">
                                <div className="card-title">New Customers</div>
                                <div className="card-text">123</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="card shadow card-line card-line-danger">
                            <div className="card-body">
                                <div className="card-title">Pending Issues</div>
                                <div className="card-text">5</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales Overview and Product Performance */}
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header">
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
                                        <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header">
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

                {/* Customer Distribution */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h4 className="card-title">Customer Distribution</h4>
                            </div>
                            <div className="card-body">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={customerData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {customerData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Interesting Element */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h4 className="card-title">Performance Comparison</h4>
                            </div>
                            <div className="card-body">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Task Manager */}
                <div className="row">
                    <div className="col-12 mb-4">
                        <TaskManager />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
