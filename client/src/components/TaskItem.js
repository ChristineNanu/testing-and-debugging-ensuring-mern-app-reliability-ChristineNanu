import React from 'react';
import Button from './Button';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const handleToggleComplete = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </h3>
        <span className={`task-priority ${task.priority}`}>
          {task.priority}
        </span>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-meta">
        <span>
          Created: {formatDate(task.createdAt)}
        </span>
        {task.dueDate && (
          <span>
            Due: {formatDate(task.dueDate)}
          </span>
        )}
      </div>
      
      <div className="task-actions">
        <Button
          onClick={handleToggleComplete}
          variant={task.completed ? 'secondary' : 'primary'}
          size="sm"
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </Button>
        <Button
          onClick={handleDelete}
          variant="danger"
          size="sm"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;