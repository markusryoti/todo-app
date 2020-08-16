import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

const { REACT_APP_API_URL } = process.env;

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch({
        type: 'AUTH_ERROR',
      });
      return;
    }

    try {
      const res = await fetch(REACT_APP_API_URL + '/api/auth', {
        method: 'GET',
        headers: {
          'X-Auth-Token': token,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        const resData = await res.json();
        dispatch({
          type: 'USER_LOADED',
          payload: resData,
        });
      }
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  // Register User
  const register = async (formData) => {
    try {
      const res = await fetch(REACT_APP_API_URL + '/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const resData = await res.json();
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: resData,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    try {
      const res = await fetch(REACT_APP_API_URL + '/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const resData = await res.json();
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: resData,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err,
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
