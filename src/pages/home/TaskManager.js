/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
    const [filterPriority, setFilterPriority] = useState("All");

    const URL = Url + "/task";

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
                console.log("Updating task with ID:", currentTaskId);
                console.log("Data being sent:", values);
                await axios.put(`${URL}/${currentTaskId}`, values, config);
                toast.success("Task Updated Successfully");
            } else {
                console.log("Creating new task with data:", values);
                await axios.post(URL, values, config);
                toast.success("Task Created Successfully");
            }
            setValues({ taskName: "", date: "", status: "High" });
            setEditMode(false);
            setCurrentTaskId(null);
            fetchTasks();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

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

    // Fetch task data for editing
    const fetchData = async (taskId) => {
        try {
            const response = await axios.get(`${URL}/${taskId}`, config);
            const taskData = response.data.payload.taskData[0];

            // Format the date to YYYY-MM-DD
            const formattedDate = new Date(taskData.date).toISOString().split('T')[0];

            // Ensure the task data matches the structure of the `values` state
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
            fetchTasks();
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Handle form cancel action
    const handleCancel = () => {
        setValues({ taskName: "", date: "", status: "High" });
        setEditMode(false);
        setCurrentTaskId(null);
    };

    // Filter tasks by priority
    const filteredTasks = tasks.filter((task) => {
        if (filterPriority === "All") return true;
        return task.status === filterPriority;
    });

    // Determine the form action name based on mode
    let actionName = editMode ? "Update" : "Add";

    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-12 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                    <h2 style={{ color: "#06795e" }} className="m-0">
                        {actionName} Task
                    </h2>
                </div>
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
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="status">
                                    Priority<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <select
                                    className="form-control"
                                    id="status"
                                    name="status"
                                    onChange={handleInput}
                                    value={values.status}
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 button-group">
                        <button className="btn btn-primary fw-bold" type="submit" style={{ width: "120px" }}>
                            {actionName}
                        </button>
                        <button className="btn btn-danger fw-bold" type="button" onClick={handleCancel} style={{ width: "120px" }}>
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Task List Section */}
                <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 style={{ color: "#06795e" }}>Task List</h3>
                        <div className="form-group">
                            <label htmlFor="filterPriority">Filter by Priority:</label>
                            <select
                                className="form-control"
                                id="filterPriority"
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                    <ul className="list-group">
                        {filteredTasks.map((task) => {
                            const taskClass =
                                task.status === "High"
                                    ? "task-high-priority"
                                    : task.status === "Medium"
                                        ? "task-medium-priority"
                                        : "task-low-priority";

                            return (
                                <li key={task._id} className={`list-group-item ${taskClass}`}>
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
                                            <i className="fas fa-edit"></i> Edit
                                        </button>
                                        <button className="task-btn delete-btn" onClick={() => deleteTask(task._id)}>
                                            <i className="fas fa-trash-alt"></i> Delete
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </main>
        </>
    );
};

export default TaskManager;