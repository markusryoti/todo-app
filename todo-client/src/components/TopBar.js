import React, { useContext, useEffect, useRef } from 'react';
import TodoContext from '../context/todos/todoContext';
import { MODAL_STATE } from '../context/todos/modalState';

const TopBar = () => {
  const todoContext = useContext(TodoContext);
  const {
    filterTodos,
    filtered,
    clearFilter,
    setModalState,
    clearCurrent,
  } = todoContext;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterTodos(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div className="top-bar-container">
      <button
        id="modal_opener"
        className="btn btn-primary"
        onClick={() => {
          clearCurrent();
          setModalState(MODAL_STATE.ADD);
        }}
      >
        <i className="fas fa-plus-circle"></i> Add New Todo
      </button>
      <input
        type="text"
        placeholder="Filter Todos "
        ref={text}
        onChange={onChange}
      />
    </div>
  );
};

export default TopBar;
