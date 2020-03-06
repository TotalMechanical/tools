import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Nav, NavItem } from 'reactstrap';

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
      </Container>
    </div>
  );
}
