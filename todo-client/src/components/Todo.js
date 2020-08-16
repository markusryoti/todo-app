import React, { useContext } from 'react';
import TodoContext from '../context/todos/todoContext';

const Todo = ({ todo }) => {
  const todoContext = useContext(TodoContext);
  const { deleteTodo } = todoContext;

  const onRemove = (e) => {
    deleteTodo(todo.todo_id);
  };

  return (
    <div className="todo-card">
      <div>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <div className="todo-card-controls">
        <button className="btn">Edit</button>
      </div>
      <div className="todo-card-controls">
        <button className="btn" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Todo;
