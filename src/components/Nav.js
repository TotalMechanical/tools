import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

export default function Nav() {
  const foreman = JSON.parse(window.localStorage.getItem('foreman'));
  const history = useHistory();

  const logout = e => {
    e.preventDefault();
    window.localStorage.clear();
    history.push('/login');
  };
  return (
    <>
      <nav>
        <h3>
          <span role="img" aria-label="hammer and wrench">
            🛠
          </span>{' '}
          TOOLS
        </h3>
        {foreman && (
          <div className="foreman">
            <p>{foreman.Name}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </nav>
      {foreman && <SubNav />}
    </>
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
