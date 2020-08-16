import React, { useReducer } from 'react';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';

const { REACT_APP_API_URL } = process.env;

const TodoState = (props) => {
  const initialState = {
    todos: null,
    current: null,
    filtered: null,
    error: null,
    loading: null,
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const getTodos = async () => {
    const token = localStorage.getItem('token');
    dispatch({ type: 'SET_LOADING', payload: { status: true } });
    try {
      const res = await fetch(REACT_APP_API_URL + '/api/todos', {
        method: 'GET',
        headers: {
          'X-Auth-Token': token,
        },
      });
      if (res.status === 200) {
        const resData = await res.json();
        dispatch({
          type: 'TODOS_LOADED',
          payload: resData,
        });
      }
    } catch (err) {
      dispatch({
        type: 'TODO_LOAD_ERROR',
        payload: { message: "Couldn't get todos" },
      });
    }
  };

  const addTodo = async (formData) => {
    const token = localStorage.getItem('token');
    dispatch({ type: 'SET_LOADING', payload: { status: true } });
    try {
      const res = await fetch(REACT_APP_API_URL + '/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token,
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        const resData = await res.json();
        dispatch({
          type: 'ADD_TODO',
          payload: resData,
        });
      }
    } catch (err) {
      dispatch({
        type: 'TODO_LOAD_ERROR',
        payload: { message: "Couldn't get todos" },
      });
    }
  };

  const editTodo = async (formData) => {
    const token = localStorage.getItem('token');
    dispatch({ type: 'SET_LOADING', payload: { status: true } });
    try {
      const res = await fetch(REACT_APP_API_URL + '/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token,
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        const resData = await res.json();
        dispatch({
          type: 'EDIT_TODO',
          payload: resData,
        });
      }
    } catch (err) {
      dispatch({
        type: 'TODO_LOAD_ERROR',
        payload: { message: "Couldn't get todos" },
      });
    }
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    dispatch({ type: 'SET_LOADING', payload: { status: true } });
    try {
      const res = await fetch(REACT_APP_API_URL + `/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'X-Auth-Token': token,
        },
      });
      if (res.status === 200) {
        dispatch({
          type: 'DELETE_TODO',
          payload: id,
        });
      }
    } catch (err) {
      dispatch({
        type: 'TODO_LOAD_ERROR',
        payload: { message: "Couldn't get todos" },
      });
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getTodos,
        addTodo,
        deleteTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
