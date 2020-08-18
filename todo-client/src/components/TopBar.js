import React, { useContext, useEffect, useRef } from 'react';
import TodoContext, { MODAL_STATE } from '../context/todos/todoContext';

const TopBar = () => {
  const todoContext = useContext(TodoContext);
  const { filterTodos, filtered, clearFilter, setModalState } = todoContext;

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
        onClick={() => setModalState(MODAL_STATE.ADD)}
      >
        Add New Todo
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
