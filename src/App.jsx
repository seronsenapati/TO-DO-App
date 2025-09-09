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
import { useTheme } from './contexts/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const todoCounts = useSelector(selectTodoCounts);
  const completionPercentage = todoCounts.total > 0 
    ? Math.round((todoCounts.completed / todoCounts.total) * 100) 
    : 0;

  return (
    <div className="todo-container">
      {/* Theme toggle button */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? (
          // Moon icon for dark theme
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.4 13.7C20.6 13.9 19.8 14 19 14C14 14 10 10 10 5C10 4.2 10.1 3.4 10.3 2.6C10.4 2.3 10.3 2 10 1.7C9.7 1.4 9.4 1.3 9 1.4C4.3 2.7 1 7.1 1 12C1 18.1 5.9 23 12 23C16.9 23 21.3 19.7 22.6 15C22.7 14.7 22.6 14.3 22.3 14C22.1 13.7 21.7 13.6 21.4 13.7Z" fill="currentColor"/>
          </svg>
        ) : (
          // Sun icon for light theme
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4" fill="currentColor"/>
            <path d="M12 3V1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 23V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 12H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M23 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M5.6 5.6L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18.4 5.6L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M5.6 18.4L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18.4 18.4L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>
      
      {/* Doodly decorative elements */}
      <div className="doodly-element doodly-book-1"></div>
      <div className="doodly-element doodly-book-2"></div>
      <div className="doodly-element doodly-book-3"></div>
      <div className="doodly-element doodly-book-4"></div>
      <div className="doodly-element doodly-flower-1"></div>
      <div className="doodly-element doodly-flower-2"></div>
      <div className="doodly-element doodly-flower-3"></div>
      <div className="doodly-element doodly-flower-4"></div>
      <div className="doodly-element doodly-apple"></div>
      <div className="doodly-element doodly-sandwich"></div>
      <div className="doodly-element doodly-coffee"></div>
      <div className="doodly-element doodly-pencil"></div>
      
      <header className="todo-header">
        <h1>StudySmart</h1>
        <p>Organize your studies and boost your productivity</p>
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