import React, { useState, useContext, useEffect } from 'react';
import TodoContext from '../context/todos/todoContext';
import { MODAL_STATE } from '../context/todos/modalState';

const TodoForm = () => {
  const todoContext = useContext(TodoContext);
  const {
    modalState,
    setModalState,
    addTodo,
    updateTodo,
    current,
    clearCurrent,
  } = todoContext;

  useEffect(() => {
    if (current !== null) {
      setFormValues({
        title: current.title,
        description: current.description,
      });
    } else {
      setFormValues({
        title: '',
        description: '',
      });
    }
  }, [current]);

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
  });
  const { title, description } = formValues;

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (modalState === MODAL_STATE.ADD) {
      addTodo(formValues);
    } else if (modalState === MODAL_STATE.EDIT) {
      updateTodo({ ...formValues, todo_id: current.todo_id });
    }
    setFormValues({
      title: '',
      description: '',
    });
    setModalState(MODAL_STATE.HIDDEN);
    clearCurrent();
  };

  const handleFormKeypress = (e) => {
    if (e.key !== 'Enter') return;
    onFormSubmit(e);
  };

  const showHideClassName =
    modalState === MODAL_STATE.ADD || modalState === MODAL_STATE.EDIT
      ? 'modal display-block'
      : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <h3>
          {modalState === MODAL_STATE.ADD ? 'Add New Todo' : 'Update Todo'}
        </h3>
        <form
          onSubmit={onFormSubmit}
          onKeyPress={handleFormKeypress}
          className="todo-form"
        >
          <label htmlFor="title">Title</label>
          <textarea
            name="title"
            type="text"
            value={title}
            onChange={onChange}
          ></textarea>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            onChange={onChange}
            value={description}
          ></textarea>
          <button className="btn btn-primary">
            <i className="far fa-paper-plane"></i>
            <span> Submit</span>
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setModalState(MODAL_STATE.HIDDEN)}
          >
            <i className="fas fa-times"></i> Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
