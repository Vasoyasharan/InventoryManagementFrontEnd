/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Url, config } from "../../Url";
import axios from "axios";
import { toast } from "react-toastify";

const TaskManager = () => {
    const [values, setValues] = useState({
        taskName: "",
        date: "",
        status: "Pending",
    });
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

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
                await axios.put(`${URL}/${currentTaskId}`, values, config);
                toast.success("Task Updated Successfully");
            } else {
                await axios.post(URL, values, config);
                toast.success("Task Created Successfully");
            }
            setValues({ taskName: "", date: "", status: "Pending" });
            setEditMode(false);
            setCurrentTaskId(null);
            fetchTasks();
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    // Fetch tasks list
    const fetchTasks = async () => {
        try {
            const response = await axios.get(URL, config);
            setTasks(response.data.payload.taskData);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch task data for editing
    const fetchData = async (taskId) => {
        try {
            const response = await axios.get(`${URL}/${taskId}`, config);
            setValues(response.data.payload.taskData[0]);
            setEditMode(true);
            setCurrentTaskId(taskId);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    // Delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${URL}/${taskId}`, config);
            toast.success("Task Deleted Successfully");
            fetchTasks();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Handle form cancel action
    const handleCancel = () => {
        setValues({ taskName: "", date: "", status: "Pending" });
        setEditMode(false);
        setCurrentTaskId(null);
    };

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
                                <input type="text" className="form-control" id="taskName" placeholder="Please Add Task" name="taskName" required onChange={handleInput} value={values.taskName} />
                            </div>
                        </div>
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="date">
                                    Date<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <input type="date" className="form-control" id="date" name="date" onChange={handleInput} value={values.date} />
                            </div>
                        </div>
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="status">
                                    Status<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <select className="form-control" id="status" name="status" onChange={handleInput} value={values.status}>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-outline-primary me-3 fw-bold" type="submit">
                            {actionName}
                        </button>
                        <button className="btn btn-outline-danger fw-bold" type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
                <div className="mt-4">
                    <h3 style={{ color: "#06795e" }}>Task List</h3>
                    <ul className="list-group">
                        {tasks.map((task) => (
                            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
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
                                <div>
                                    <button className="btn btn-sm btn-info me-2" onClick={() => fetchData(task._id)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task._id)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
};

export default TaskManager;
