import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { selectFilteredTodos } from '../features/todos/todosSelectors';

const TodoList = () => {
  const todos = useSelector(selectFilteredTodos);
  
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos found. Add a new todo to get started!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" role="list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;