import React, { useState, useContext } from 'react';
import TodoContext from '../context/todos/todoContext';

const TodoForm = () => {
  const [modalState, setModalState] = useState('closed');
  const [formState, setFormState] = useState({});

  const todoContext = useContext(TodoContext);
  const { addTodo } = todoContext;

  const showHideClassName =
    modalState === 'opened' ? 'modal display-block' : 'modal display-none';

  const onChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    addTodo(formState);
    setFormState({});
    setModalState('closed');
  };

  return (
    <div>
      <button
        id="modal_opener"
        className="btn btn-primary"
        onClick={() => setModalState('opened')}
      >
        Add New Todo
      </button>
      <div className={showHideClassName}>
        <div className="modal-main">
          <h3>Add New Todo</h3>
          <form onSubmit={onFormSubmit}>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" onChange={onChange} />
            <label htmlFor="description">Description</label>
            <textarea name="description" onChange={onChange}></textarea>
            <input type="submit" className="btn btn-secondary" />
          </form>
          <button className="btn" onClick={() => setModalState('closed')}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
