import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

import { Container } from 'reactstrap';

import Nav from './components/Nav';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Tools from './components/Tools';
import Specialty from './components/Specialty';

export default function App() {
  return (
    <Router>
      <Nav />

      <Container fluid="lg">
        <Switch>
          <PrivateRoute exact path="/">
            <SubNav />
            <Tools />
          </PrivateRoute>

          <PrivateRoute path="/specialty">
            <SubNav />
            <Specialty />
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

function SubNav() {
  return (
    <div className="sub-nav">
      <NavLink exact to="/">
        My Tools
      </NavLink>
      <NavLink to="/specialty">Specialty</NavLink>
    </div>
  );
}
