import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, toggleComplete, deleteTodo } from '../features/todos/todosSlice';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority || 'medium');
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(toggleComplete(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setEditPriority(todo.priority || 'medium');
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    
    if (!trimmedText || trimmedText.length > 200) {
      return;
    }
    
    dispatch(updateTodo({
      id: todo.id,
      changes: {
        text: trimmedText,
        priority: editPriority,
        updatedAt: new Date().toISOString()
      }
    }));
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setEditPriority(todo.priority || 'medium');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter') {
      handleSave();
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Edit todo text"
              maxLength={200}
              className="edit-input"
              autoFocus
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              aria-label="Edit priority level"
              className="edit-priority-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        ) : (
          <div className="todo-text-container">
            <span className="todo-text" onClick={handleEdit}>
              {todo.text}
            </span>
            <span className={`priority-badge priority-${todo.priority || 'medium'}`}>
              {todo.priority || 'medium'}
            </span>
          </div>
        )}
      </div>
      
      <div className="todo-meta">
        <span className="created-at" title={todo.createdAt}>
          Created: {formatDate(todo.createdAt)}
        </span>
        {todo.updatedAt && (
          <span className="updated-at" title={todo.updatedAt}>
            Updated: {formatDate(todo.updatedAt)}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save-button">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="edit-button">
              Edit
            </button>
            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;