import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Nav, NavItem, Button } from 'reactstrap';

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
        <Nav className="justify-content-between align-items-center">
          <NavItem>
            <span role="img" aria-label="hammer and wrench">
              🛠{' '}
            </span>
            {!foreman && <b>TOTAL MECHANICAL TOOLS</b>}
          </NavItem>

          {foreman && foreman.Name && (
            <NavItem className="d-flex align-items-center">
              <span className="mr-2 text-wrap">{foreman.Name}</span>
              <Button outline onClick={logout}>
                Logout
              </Button>
            </NavItem>
          )}
        </Nav>
      </Container>
    </div>
  );
}
