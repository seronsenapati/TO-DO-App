import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import { handleStorageChange } from './features/todos/todosAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo, deleteTodo, toggleComplete } from './features/todos/todosSlice';
import { selectTodoCounts } from './features/todos/todosSelectors';

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
  const todoCounts = useSelector(selectTodoCounts);
  const completionPercentage = todoCounts.total > 0 
    ? Math.round((todoCounts.completed / todoCounts.total) * 100) 
    : 0;

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>Todo List App</h1>
        <p>Manage your tasks with ease</p>
      </header>
      
      {/* Completion statistics display */}
      <div className="completion-stats">
        <div className="completion-percentage">
          {completionPercentage}% Complete
        </div>
        <div className="completion-bar-container">
          <div 
            className="completion-bar" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="completion-text">
          {todoCounts.completed} of {todoCounts.total} tasks completed
        </div>
      </div>
      
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