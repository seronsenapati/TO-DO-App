import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Create entity adapter for normalized state
const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
});

// Define the initial state
const initialState = todosAdapter.getInitialState({
  filters: {
    status: 'all',
    search: '',
  },
});

// Create the slice
const todosSlice = createSlice({
  name: '@@app/todos',
  initialState,
  reducers: {
    // Add a new todo
    addTodo: {
      reducer: todosAdapter.addOne,
      prepare: (text, priority = 'medium') => {
        const id = uuidv4();
        const createdAt = new Date().toISOString();
        
        return {
          payload: {
            id,
            text,
            completed: false,
            priority,
            createdAt,
          },
        };
      },
    },
    
    // Update a todo
    updateTodo: todosAdapter.updateOne,
    
    // Delete a todo
    deleteTodo: todosAdapter.removeOne,
    
    // Toggle todo completion status
    toggleComplete: (state, action) => {
      const id = action.payload;
      const todo = state.entities[id];
      
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date().toISOString();
      }
    },
    
    // Clear all completed todos
    clearCompleted: (state) => {
      const completedIds = Object.values(state.entities)
        .filter(todo => todo.completed)
        .map(todo => todo.id);
      
      todosAdapter.removeMany(state, completedIds);
    },
    
    // Set filter status
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    
    // Set search filter
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
  },
});

// Export actions
export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
  clearCompleted,
  setStatusFilter,
  setSearchFilter,
} = todosSlice.actions;

// Export selectors
export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state) => state.todos);

export default todosSlice.reducer;