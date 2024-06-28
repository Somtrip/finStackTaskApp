import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TaskItem.css';

const apiUrl = process.env.REACT_APP_API_URL;

const TaskItem = ({ task, fetchTasks }) => {
  const deleteTask = async () => {
    try {
      await axios.delete(`${apiUrl}/api/tasks/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const changeStatus = async () => {
    try {
      const updatedTask = { ...task, status: task.status === 'open' ? 'closed' : 'open' };
      await axios.put(`${apiUrl}/api/tasks/${task._id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error('Error changing task status', error);
    }
  };

  return (
    <tr className="task-item">
      <td>{task.date}</td>
      <td>{task.entityName}</td>
      <td>{task.taskType}</td>
      <td>{task.time}</td>
      <td>{task.contactPerson}</td>
      <td>{task.note || 'N/A'}</td>
      <td>{task.status}</td>
      <td>
        <Link to={`/edit/${task._id}`} className="edit-button">Edit</Link>
        <button onClick={deleteTask} className="delete-button">Delete</button>
        <button onClick={changeStatus} className="status-button">
          {task.status === 'open' ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
