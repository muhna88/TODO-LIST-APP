import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        if (isMounted) {
          setTasks(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();

    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
    };
  }, []);

  const addTask = async () => {
    console.log('called');
    if (newTask.trim() === '') return;
    console.log('continue1')
    const response = await axios.post('/tasks', {
      name: newTask.trim(),
      completed: false,
    });
    console.log('set')
    setTasks([...tasks, response.data]);
    setNewTask('');
  };

  const onComplete = async (id) => {
    console.log(id);
    const response = await axios.put(`/tasks/${id}`);
    // Update the task status in the local state
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: true };
        }
        return task;
      });
    });
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='row'>
      <h1>Todo</h1>
      <div className='col-md-8'>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control"
        />
      </div>
      <div className='col-md-4'>
        <button onClick={addTask} className="btn btn-info">Add Task</button>
      </div>
      <TaskList tasks={tasks} onComplete={onComplete} onDelete={onDelete} />
    </div>
  );
};


export default TodoApp;
