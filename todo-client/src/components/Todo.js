import React, { useContext } from 'react';
import TodoContext from '../context/todos/todoContext';
import { MODAL_STATE } from '../context/todos/modalState';

const Todo = ({ todo }) => {
  const todoContext = useContext(TodoContext);
  const { deleteTodo, setModalState, current, setCurrent } = todoContext;

  const onRemove = () => {
    deleteTodo(todo.todo_id);
  };

  const onEdit = () => {
    setModalState(MODAL_STATE.EDIT);
  };

  const toggleControls = () => {
    if (current === null || current.todo_id !== todo.todo_id) {
      setCurrent({ ...todo, controlState: 'visible' });
    } else {
      setCurrent({
        ...todo,
        controlState: current.controlState === 'visible' ? 'hidden' : 'visible',
      });
    }
  };

  return (
    <div className="todo-card" onClick={toggleControls}>
      <div className="todo-info">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      {current && current.todo_id === todo.todo_id ? (
        <div
          className="todo-card-controls"
          style={{ visibility: current.controlState }}
        >
          <button className="btn btn-warning" onClick={onEdit}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="btn btn-danger" onClick={onRemove}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ) : (
        <div className="todo-card-controls" style={{ visibility: 'hidden' }}>
          <button className="btn btn-warning" onClick={onEdit}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="btn btn-danger" onClick={onRemove}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
