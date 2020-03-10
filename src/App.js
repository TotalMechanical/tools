import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

import { Container, Row, Col, Nav, NavItem } from 'reactstrap';

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
        <Row>
          <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
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
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

function SubNav() {
  return (
    <Nav className="mb-2" pills>
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
