import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './TaskForm.css';

const apiUrl = process.env.REACT_APP_API_URL;

const TaskForm = () => {
  const [task, setTask] = useState({ date: '', entityName: '', taskType: '', time: '', contactPerson: '', note: '', status: 'open' });
  
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get(`${apiUrl}/api/tasks/${id}`);
      setTask(response.data);
    };

    if (id) fetchTask();
  }, [id]);

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
    if (id) {
      await axios.put(`${apiUrl}/api/tasks/${id}`, task);
    } else {
      await axios.post(`${apiUrl}/api/tasks`, task);
    }
    fetchTasks();
    history.push('/');
  } catch (error) {
    console.error('Error saving task', error);
  }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <input type='date' name="date" value={task.date} onChange={handleChange} placeholder="Date" required />
        <input name="entityName" value={task.entityName} onChange={handleChange} placeholder="Entity Name" required />
        <input name="taskType" value={task.taskType} onChange={handleChange} placeholder="Task Type" required />
        <input type='time' name="time" value={task.time} onChange={handleChange} placeholder="Time" required />
        <input name="contactPerson" value={task.contactPerson} onChange={handleChange} placeholder="Contact Person" required />
        <input name="note" value={task.note} onChange={handleChange} placeholder="Note" />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
