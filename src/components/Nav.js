import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { MdBuild } from 'react-icons/md';

export default function Nav() {
  const foreman = localStorage.getItem('foreman');
  const history = useHistory();

  const logout = e => {
    e.preventDefault();
    localStorage.clear();
    history.push('/login');
  };
  return (
    <>
      <nav>
        <h3>
          <MdBuild /> TOOLS
        </h3>
        {foreman && (
          <div className="foreman">
            <p>{foreman}</p>
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
