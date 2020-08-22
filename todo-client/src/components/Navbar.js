import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/auth/authContext';
import TodoContext from '../context/todos/todoContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser, user, logout } = authContext;

  const todoContext = useContext(TodoContext);
  const { clearCurrent } = todoContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const authLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>{user && user.first_name}</li>
      <li>
        <a
          onClick={() => {
            logout();
            clearCurrent();
          }}
          href="#!"
        >
          <span className="">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );

  return (
    <div className="navbar">
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;
