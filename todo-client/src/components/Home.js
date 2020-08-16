import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import TodoState from '../context/todos/TodoState';

import Login from './Login';
import FilterTodos from './FilterTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <TodoState>
        {authContext.isAuthenticated ? (
          <div>
            <div className="home-view-todo-control">
              <FilterTodos />
              <TodoForm />
            </div>
            <TodoList />
          </div>
        ) : (
          <Login />
        )}
      </TodoState>
    </div>
  );
};

export default Home;
