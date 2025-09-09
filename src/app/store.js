import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import { loadState, saveState } from '../features/todos/todosAPI';
import debounce from 'lodash.debounce';

// Load initial state from localStorage
const loadedTodos = loadState();

// Create the Redux store
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: {
    todos: {
      ids: loadedTodos.map(todo => todo.id),
      entities: loadedTodos.reduce((acc, todo) => {
        acc[todo.id] = todo;
        return acc;
      }, {}),
      filters: {
        status: 'all',
        search: '',
      },
    }
  }
});

// Subscribe to store changes and save to localStorage with debouncing
store.subscribe(debounce(() => {
  saveState(store.getState().todos);
}, 300));

export default store;