import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter, setSearchFilter, clearCompleted } from '../features/todos/todosSlice';
import { selectTodoCounts } from '../features/todos/todosSelectors';

const TodoFilters = () => {
  const dispatch = useDispatch();
  const { status, search } = useSelector(state => state.todos.filters);
  const counts = useSelector(selectTodoCounts);

  const handleStatusChange = (newStatus) => {
    dispatch(setStatusFilter(newStatus));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchFilter(e.target.value));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  return (
    <div className="todo-filters">
      <div className="filter-buttons">
        <button
          onClick={() => handleStatusChange('all')}
          className={`filter-button ${status === 'all' ? 'active' : ''}`}
          aria-pressed={status === 'all'}
        >
          All ({counts.total})
        </button>
        <button
          onClick={() => handleStatusChange('active')}
          className={`filter-button ${status === 'active' ? 'active' : ''}`}
          aria-pressed={status === 'active'}
        >
          Active ({counts.active})
        </button>
        <button
          onClick={() => handleStatusChange('completed')}
          className={`filter-button ${status === 'completed' ? 'active' : ''}`}
          aria-pressed={status === 'completed'}
        >
          Completed ({counts.completed})
        </button>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search todos..."
          aria-label="Search todos"
          className="search-input"
        />
      </div>
      
      {counts.completed > 0 && (
        <button onClick={handleClearCompleted} className="clear-completed-button">
          Clear Completed
        </button>
      )}
    </div>
  );
};

export default TodoFilters;