import React, { useContext } from 'react';
import TodoContext from '../context/todos/todoContext';
import { MODAL_STATE } from '../context/todos/modalState';

const Todo = ({ todo }) => {
  const todoContext = useContext(TodoContext);
  const { deleteTodo, setModalState, setCurrent } = todoContext;

  const onRemove = () => {
    deleteTodo(todo.todo_id);
  };

  const onEdit = () => {
    setCurrent(todo);
    setModalState(MODAL_STATE.EDIT);
  };

  return (
    <div className="todo-card">
      <div>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <div className="todo-card-controls">
        <button className="btn btn-warning" onClick={onEdit}>
          Edit
        </button>
      </div>
      <div className="todo-card-controls">
        <button className="btn btn-danger" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Todo;
