import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Tools from './components/Tools';
import Specialty from './components/Specialty';

import './App.css';

export default function App() {
  return (
    <Router>
      <Nav />

      <Switch>
        <PrivateRoute exact path="/">
          <Tools />
        </PrivateRoute>

        <PrivateRoute path="/specialty">
          <Specialty />
        </PrivateRoute>

        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
