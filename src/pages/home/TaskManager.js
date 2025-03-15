import React, { useState, useEffect } from "react";
import { Url, config } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";
import "./TaskManager.css";

const TaskManager = () => {
    const [values, setValues] = useState({
        taskName: "",
        date: "",
        status: "High",
    });
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [filters, setFilters] = useState({
        priority: "All",
    });
    const [sortBy, setSortBy] = useState("dueDate");

    const URL = Url + "/task";

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Fetch tasks list
    const fetchTasks = async () => {
        try {
            const response = await axios.get(URL, config);
            setTasks(response.data.payload.taskData);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    // Handle form submission for adding or updating tasks
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editMode) {
                await axios.put(`${URL}/${currentTaskId}`, values, config);
                toast.success("Task Updated Successfully");
            } else {
                await axios.post(URL, values, config);
                toast.success("Task Created Successfully");
            }
            setValues({ taskName: "", date: "", status: "High" });
            setEditMode(false);
            setCurrentTaskId(null);
            await fetchTasks(); // Ensure tasks are fetched after the operation
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    // Handle form cancel action
    const handleCancel = () => {
        setValues({ taskName: "", date: "", status: "High" });
        setEditMode(false);
        setCurrentTaskId(null);
    };

    // Fetch task data for editing
    const fetchData = async (taskId) => {
        try {
            const response = await axios.get(`${URL}/${taskId}`, config);
            const taskData = response.data.payload.taskData[0];
            const formattedDate = new Date(taskData.date).toISOString().split('T')[0];
            setValues({
                taskName: taskData.taskName,
                date: formattedDate,
                status: taskData.status,
            });
            setEditMode(true);
            setCurrentTaskId(taskId);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    // Delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${URL}/${taskId}`, config);
            toast.success("Task Deleted Successfully");
            await fetchTasks(); // Ensure tasks are fetched after deletion
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    // Apply priority-based styling
    const getTaskClass = (task) => {
        if (task.status === "High") {
            return "task-high-priority";
        } else if (task.status === "Medium") {
            return "task-medium-priority";
        } else if (task.status === "Low") {
            return "task-low-priority";
        }
        return "";
    };

    // Filter and sort tasks
    const filteredTasks = tasks.filter((task) => {
        const matchesPriority = filters.priority === "All" || task.status === filters.priority;
        return matchesPriority;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortBy === "dueDate") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortBy === "priority") {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.status] - priorityOrder[b.status];
        } else if (sortBy === "createdAt") {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return 0;
    });

    return (
        <main className="col-md-9 ms-sm-auto col-lg-12 px-md-4">
            <div className="form-container">
                <h2>{editMode ? "Update" : "Add"} Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="taskName" className="required-star">
                                    Task Name
                                    <span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="taskName"
                                    placeholder="Please Add Task"
                                    name="taskName"
                                    required
                                    onChange={handleInput}
                                    value={values.taskName}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="date">
                                    Date<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    onChange={handleInput}
                                    value={values.date}
                                />
                            </div>
                        </div>
                        <div className="filter-sort-container">
                            <div className="filter-group">
                                <label>Priority:</label>
                                <select
                                    value={filters.priority}
                                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                                >
                                    <option value="All">All</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Sort By:</label>
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="dueDate">Due Date</option>
                                    <option value="priority">Priority</option>
                                    <option value="createdAt">Created At</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="btn btn-primary" type="submit">
                            {editMode ? "Update" : "Add"}
                        </button>
                        <button className="btn btn-danger" type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Task List Section */}
            <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 style={{ color: "#06795e" }}>Task List</h3>
                    <div className="filter-sort-container">
                        <div className="filter-group">
                            <label>Priority:</label>
                            <select
                                value={filters.priority}
                                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                            >
                                <option value="All">All</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Sort By:</label>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="dueDate">Due Date</option>
                                <option value="priority">Priority</option>
                                <option value="createdAt">Created At</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="task-grid">
                    {sortedTasks.map((task) => (
                        <div key={task._id} className={`task-card ${getTaskClass(task)}`}>
                            <div className="task-details">
                                <strong>{task.taskName.toUpperCase()}</strong> <br />
                                <small>
                                    <i>Date: </i>
                                    <b>{new Date(task.date).toDateString()}</b>
                                </small>{" "}
                                <br />
                                <small>
                                    <i>Status: </i>
                                    <b>{task.status}</b>
                                </small>
                            </div>
                            <div className="task-actions">
                                <button className="task-btn edit-btn" onClick={() => fetchData(task._id)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="task-btn delete-btn" onClick={() => deleteTask(task._id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default TaskManager;