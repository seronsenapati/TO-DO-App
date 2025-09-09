import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import { handleStorageChange } from './features/todos/todosAPI';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo, deleteTodo, toggleComplete } from './features/todos/todosSlice';

// Create a component to handle storage events
const StorageEventHandler = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const cleanup = handleStorageChange((newState) => {
      // In a real app, you might want to do a more sophisticated diff
      // For simplicity, we'll just log the change
      console.log('Todos updated from another tab:', newState);
    });
    
    return cleanup;
  }, [dispatch]);
  
  return null;
};

const AppContent = () => {
  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>Todo List App</h1>
        <p>Manage your tasks with ease</p>
      </header>
      
      <main className="app-main">
        <TodoForm />
        <TodoFilters />
        <TodoList />
        <StorageEventHandler />
      </main>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;