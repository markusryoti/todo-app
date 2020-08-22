import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import AuthState from './context/auth/AuthState';
import TodoState from './context/todos/TodoState';

function App() {
  return (
    <AuthState>
      <TodoState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </TodoState>
    </AuthState>
  );
}

export default App;
