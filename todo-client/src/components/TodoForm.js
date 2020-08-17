import React, { useState, useContext, useEffect } from 'react';
import TodoContext, { MODAL_STATE } from '../context/todos/todoContext';

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
  }, [todoContext, current]);

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

  const showHideClassName =
    modalState === MODAL_STATE.ADD || modalState === MODAL_STATE.EDIT
      ? 'modal display-block'
      : 'modal display-none';

  return (
    <div>
      <div className={showHideClassName}>
        <div className="modal-main">
          <h3>
            {modalState === MODAL_STATE.ADD ? 'Add New Todo' : 'Update Todo'}
          </h3>
          <form onSubmit={onFormSubmit}>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" value={title} onChange={onChange} />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={onChange}
              value={description}
            ></textarea>
            <input type="submit" className="btn btn-primary" />
          </form>
          <button
            className="btn btn-warning"
            onClick={() => setModalState(MODAL_STATE.HIDDEN)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
