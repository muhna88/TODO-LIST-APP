import React from 'react';

const Task = ({ task, onComplete, onDelete }) => {
  const handleComplete = () => {
    onComplete(task.id);
  };

  const handleDelete = () => {
    const confirmation = window.confirm('Apakah Anda yakin ingin menghapus item ini?');
    if (confirmation) {
      onDelete(task.id);
    }
  };

  return (
    <tr>
      <td>{task.name}</td>
      <td>{task.completed ? 'Yes' : 'Pending'}</td>
      <td>
        {!task.completed && (
          <button onClick={handleComplete} className='btn btn-success'>
            Complete
          </button>
        )}
        <button onClick={handleDelete} className='btn btn-danger'>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Task;
