import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './TaskForm.css';

const TaskForm = () => {
  const [task, setTask] = useState({ date: '', entityName: '', taskType: '', time: '', contactPerson: '', note: '', status: 'open' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      setTask(response.data);
    };

    if (id) fetchTask();
  }, [id]);

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
    } else {
      await axios.post('http://localhost:5000/api/tasks', task);
    }
    navigate('/');
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
