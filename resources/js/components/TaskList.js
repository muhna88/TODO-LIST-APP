import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onComplete, onDelete }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Completed</th>
            <th>Action</th>  {/* Ensure no typo here approval_status */}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
