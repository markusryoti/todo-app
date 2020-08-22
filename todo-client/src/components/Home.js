import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import TodoState from '../context/todos/TodoState';

import Login from './Login';
import TopBar from './TopBar';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <TodoState>
      {authContext.isAuthenticated ? (
        <>
          <div className="home-view-todo-control">
            <TopBar />
            <TodoForm />
          </div>
          <TodoList />
        </>
      ) : (
        <Login />
      )}
    </TodoState>
  );
};

export default Home;
