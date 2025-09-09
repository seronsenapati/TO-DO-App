// localStorage key
const LOCAL_STORAGE_KEY = 'todos_v1';

// Load state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    
    if (serializedState === null) {
      return [];
    }
    
    // Parse and validate the data
    const parsedState = JSON.parse(serializedState);
    
    // Basic validation to ensure it's an array
    if (!Array.isArray(parsedState)) {
      return [];
    }
    
    // Validate each todo item
    const validTodos = parsedState.filter(todo => 
      todo && 
      typeof todo.id === 'string' &&
      typeof todo.text === 'string' &&
      typeof todo.completed === 'boolean' &&
      typeof todo.createdAt === 'string'
    );
    
    return validTodos;
  } catch (err) {
    // If there's an error (e.g., corrupted data), return empty array
    console.warn('Failed to load todos from localStorage:', err);
    return [];
  }
};

// Save state to localStorage
export const saveState = (state) => {
  try {
    // Extract just the todos array from the state
    const todosArray = state.ids.map(id => state.entities[id]);
    const serializedState = JSON.stringify(todosArray);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (err) {
    // Ignore write errors (e.g., localStorage is full)
    console.warn('Failed to save todos to localStorage:', err);
  }
};

// Handle storage events for cross-tab synchronization
export const handleStorageChange = (callback) => {
  const handleStorageEvent = (event) => {
    if (event.key === LOCAL_STORAGE_KEY) {
      try {
        const newState = event.newValue ? JSON.parse(event.newValue) : [];
        callback(newState);
      } catch (err) {
        console.warn('Failed to parse todos from storage event:', err);
      }
    }
  };

  window.addEventListener('storage', handleStorageEvent);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('storage', handleStorageEvent);
  };
};