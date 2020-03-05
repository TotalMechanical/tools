import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Nav() {
  const foreman = JSON.parse(window.localStorage.getItem('foreman'));
  const history = useHistory();

  const logout = e => {
    e.preventDefault();
    window.localStorage.clear();
    history.push('/login');
  };
  return (
    <nav>
      <h3>
        <span role="img" aria-label="hammer and wrench">
          🛠
        </span>{' '}
        TOOLS
      </h3>
      {foreman && foreman.Name && (
        <div className="foreman">
          <p>{foreman.Name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
