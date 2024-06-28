import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import './TaskList.css';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({
    teamMember: '',
    taskType: '',
    status: '',
    date: '',
    entityName: '',
    contactPerson: ''
  });
  const [sort, setSort] = useState({ field: '', order: 'asc' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split('|');
    setSort({ field, order });
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      return (
        (filter.teamMember === '' || task.contactPerson === filter.teamMember) &&
        (filter.taskType === '' || task.taskType === filter.taskType) &&
        (filter.status === '' || task.status === filter.status) &&
        (filter.date === '' || task.date === filter.date) &&
        (filter.entityName === '' || task.entityName === filter.entityName) &&
        (filter.contactPerson === '' || task.contactPerson === filter.contactPerson)
      );
    });
  };

  const getSortedTasks = (filteredTasks) => {
    return filteredTasks.sort((a, b) => {
      if (sort.field === '') return 0;
      if (sort.order === 'asc') {
        return a[sort.field] > b[sort.field] ? 1 : -1;
      } else {
        return a[sort.field] < b[sort.field] ? 1 : -1;
      }
    });
  };

  const filteredTasks = getFilteredTasks();
  const sortedTasks = getSortedTasks(filteredTasks);

  return (
    <div className="task-list">
      <div className="header">
        <h1>TASK LIST WEB APP</h1>
        <Link to="/new" className="new-task-button">New Task</Link>
      </div>
      <div className="filters">
        <select name="teamMember" value={filter.teamMember} onChange={handleFilterChange}>
          <option value="">All Team Members</option>
          {/* Add options for team members */}
          {Array.from(new Set(tasks.map(task => task.contactPerson))).map(member => (
            <option key={member} value={member}>{member}</option>
          ))}
        </select>
        <select name="taskType" value={filter.taskType} onChange={handleFilterChange}>
          <option value="">All Task Types</option>
          {/* Add options for task types */}
          {Array.from(new Set(tasks.map(task => task.taskType))).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select name="status" value={filter.status} onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <input type="date" name="date" value={filter.date} onChange={handleFilterChange} />
        <input type="text" name="entityName" placeholder="Entity Name" value={filter.entityName} onChange={handleFilterChange} />
        <input type="text" name="contactPerson" placeholder="Contact Person" value={filter.contactPerson} onChange={handleFilterChange} />
        <select value={`${sort.field}|${sort.order}`} onChange={handleSortChange}>
          <option value="|">Sort By</option>
          <option value="date|asc">Date Ascending</option>
          <option value="date|desc">Date Descending</option>
          <option value="taskType|asc">Task Type Ascending</option>
          <option value="taskType|desc">Task Type Descending</option>
          <option value="status|asc">Status Ascending</option>
          <option value="status|desc">Status Descending</option>
          <option value="entityName|asc">Entity Name Ascending</option>
          <option value="entityName|desc">Entity Name Descending</option>
          <option value="contactPerson|asc">Contact Person Ascending</option>
          <option value="contactPerson|desc">Contact Person Descending</option>
        </select>
      </div>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Entity Name</th>
            <th>Task Type</th>
            <th>Time</th>
            <th>Contact Person</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
