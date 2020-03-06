import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

import { Container, Nav, NavItem } from 'reactstrap';

import Navigation from './components/Nav';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Tools from './components/Tools';
import Specialty from './components/Specialty';

export default function App() {
  return (
    <Router>
      <Navigation />

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
    <Nav className="mb-2" tabs>
      <NavItem>
        <NavLink className="nav-link" exact to="/">
          My Tools
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="nav-link" to="/specialty">
          All Specialty Tools
        </NavLink>
      </NavItem>
    </Nav>
  );
}
