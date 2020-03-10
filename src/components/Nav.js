import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Nav, NavItem } from 'reactstrap';

export default function() {
  const foreman = JSON.parse(window.localStorage.getItem('foreman'));
  const history = useHistory();

  const logout = e => {
    e.preventDefault();
    window.localStorage.clear();
    history.push('/login');
  };

  return (
    <div className="bg-dark text-white py-1 mb-2">
      <Container fluid="lg">
        <Row>
          <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
            <Nav className="py-1 justify-content-between align-items-center">
              <NavItem>
                <span role="img" aria-label="hammer and wrench">
                  🛠
                </span>
                <strong>TOOLS</strong>
              </NavItem>
              {!foreman ? (
                <NavItem>
                  <b>Total Mechanical</b>
                </NavItem>
              ) : (
                <>
                  <NavItem>
                    <span className="text-wrap">{foreman.Name}</span>
                  </NavItem>
                  <a href="/login" onClick={logout}>
                    Logout
                  </a>
                </>
              )}
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
