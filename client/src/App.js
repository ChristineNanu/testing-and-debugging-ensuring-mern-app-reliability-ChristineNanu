import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Button from './components/Button';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      setTasks([response.data, ...tasks]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <Button 
          onClick={() => setShowForm(!showForm)}
          variant="primary"
          data-testid="add-task-button"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </Button>
      </header>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {showForm && (
        <TaskForm 
          onSubmit={addTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      <TaskList 
        tasks={tasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;