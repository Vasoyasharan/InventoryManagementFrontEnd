import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
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

                {/* Recent Activity Feed */}
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card shadow">
                            <div className="card-header">
                                <h4 className="card-title">Recent Activity Feed</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-unstyled">
                                    <li>
                                        <strong>User1</strong> added a new product <span className="text-muted">2 hours ago</span>
                                    </li>
                                    <li>
                                        <strong>User2</strong> updated an order status <span className="text-muted">5 hours ago</span>
                                    </li>
                                    {/* Add more recent activities here */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar View */}
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card shadow">
                            <div className="card-header">
                                <h4 className="card-title">Calendar View</h4>
                            </div>
                            <div className="card-body">
                                <div className="calendar">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sun</th>
                                                <th>Mon</th>
                                                <th>Tue</th>
                                                <th>Wed</th>
                                                <th>Thu</th>
                                                <th>Fri</th>
                                                <th>Sat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>28</td>
                                                <td>29</td>
                                                <td>30</td>
                                                <td>31</td>
                                                <td>1</td>
                                                <td>2</td>
                                                <td>3</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>5</td>
                                                <td>6</td>
                                                <td>7</td>
                                                <td>8</td>
                                                <td>9</td>
                                                <td>10</td>
                                            </tr>
                                            <tr>
                                                <td>11</td>
                                                <td>12</td>
                                                <td>13</td>
                                                <td>14</td>
                                                <td>15</td>
                                                <td>16</td>
                                                <td>17</td>
                                            </tr>
                                            <tr>
                                                <td>18</td>
                                                <td>19</td>
                                                <td>20</td>
                                                <td>21</td>
                                                <td>22</td>
                                                <td>23</td>
                                                <td>24</td>
                                            </tr>
                                            <tr>
                                                <td>25</td>
                                                <td>26</td>
                                                <td>27</td>
                                                <td>28</td>
                                                <td>29</td>
                                                <td>30</td>
                                                <td>1</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Activity Matrix */}
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card shadow">
                            <div className="card-header">
                                <h4 className="card-title">User Activity Matrix</h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Login</th>
                                            <th>Orders</th>
                                            <th>Sales</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>User1</td>
                                            <td>5</td>
                                            <td>10</td>
                                            <td>$200</td>
                                        </tr>
                                        <tr>
                                            <td>User2</td>
                                            <td>3</td>
                                            <td>7</td>
                                            <td>$150</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card shadow">
                            <div className="card-header">
                                <h4 className="card-title">Top Products</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-unstyled">
                                    <li>
                                        <strong>Product A</strong> - $500
                                    </li>
                                    <li>
                                        <strong>Product B</strong> - $300
                                    </li>
                                    <li>
                                        <strong>Product C</strong> - $200
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
