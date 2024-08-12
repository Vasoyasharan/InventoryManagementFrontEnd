import React, { useState } from "react";
import "./TaskManager.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Complete Sales Report", due: "2024-08-15", status: "Pending" },
    { id: 2, name: "Get More 500 Customers", due: "2024-08-31", status: "In Progress" },
  ]);

  const [taskName, setTaskName] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, name: taskName, due: taskDueDate }
            : task
        )
      );
      setEditingTask(null);
    } else {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, name: taskName, due: taskDueDate, status: "Pending" },
      ]);
    }
    setTaskName("");
    setTaskDueDate("");
  };

  const editTask = (task) => {
    setTaskName(task.name);
    setTaskDueDate(task.due);
    setEditingTask(task);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTaskStatus = (taskId, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  return (
    <div className="task-manager card shadow mb-4">
      <div className="card-header">
        <h4 className="card-title">Task Manager</h4>
      </div>
      <div className="card-body">
        <div className="task-input">
          <input
            type="text"
            placeholder="Task Name"
            className="form-control mb-2"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="date"
            className="form-control mb-2"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
          />
          <button onClick={addTask} className="btn btn-primary">
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
        <ul className="list-group mt-3">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.name}</strong> <br />
                <small>Due: {task.due}</small>
              </div>
              <div className="task-actions">
                <select
                  className="form-select"
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button className="btn btn-sm btn-info" onClick={() => editTask(task)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
