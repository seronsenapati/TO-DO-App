import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice';

const TodoForm = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trim whitespace and check if not empty
    const trimmedText = text.trim();
    
    // Validate input
    if (!trimmedText || trimmedText.length > 200) {
      return;
    }
    
    // Dispatch action to add todo
    dispatch(addTodo(trimmedText, priority));
    
    // Reset form
    setText('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="New todo item"
          maxLength={200}
          className="todo-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Priority level"
          className="priority-select"
        >
          <option value="low">Low - For less important tasks</option>
          <option value="medium">Medium - For moderately important tasks</option>
          <option value="high">High - For urgent or critical tasks</option>
        </select>
        <button type="submit" className="add-button">
          Add
        </button>
      </div>
      
      {text.trim().length > 180 && (
        <div className="character-count" role="alert">
          {200 - text.trim().length} characters remaining
        </div>
      )}
    </form>
  );
};

export default TodoForm;