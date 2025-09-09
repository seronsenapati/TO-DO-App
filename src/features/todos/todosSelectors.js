import { createSelector } from '@reduxjs/toolkit';
import { selectAllTodos } from './todosSlice';

// Select todos based on current filters
export const selectFilteredTodos = createSelector(
  [selectAllTodos, (state) => state.todos.filters],
  (todos, filters) => {
    const { status, search } = filters;
    
    return todos.filter(todo => {
      // Filter by status
      if (status === 'active' && todo.completed) return false;
      if (status === 'completed' && !todo.completed) return false;
      
      // Filter by search text
      if (search && !todo.text.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }
);

// Select todo counts
export const selectTodoCounts = createSelector(
  [selectAllTodos],
  (todos) => ({
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
  })
);

// Select active todos count
export const selectActiveTodosCount = createSelector(
  [selectTodoCounts],
  (counts) => counts.active
);