import React, { useContext } from 'react';
import TodoContext, { MODAL_STATE } from '../context/todos/todoContext';

const TopBar = () => {
  const todoContext = useContext(TodoContext);
  const { setModalState } = todoContext;

  return (
    <div className="top-bar-container">
      <button
        id="modal_opener"
        className="btn btn-primary"
        onClick={() => setModalState(MODAL_STATE.ADD)}
      >
        Add New Todo
      </button>
      <input type="text" placeholder="Filter Todos " />
    </div>
  );
};

export default TopBar;
