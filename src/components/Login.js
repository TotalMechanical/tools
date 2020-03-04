import React from 'react';
import { useHistory } from 'react-router-dom';
import base from '../helpers/data';

export default function Login() {
  const history = useHistory();
  const [identity, setIdentity] = React.useState('');
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    base('Foreman')
      .select({
        view: 'API',
        fields: ['Name']
      })
      .all()
      .then(res => {
        const list = res.map(name => name.fields['Name']);
        setList(list);
      });
  }, []);

  const handleChange = e => {
    setIdentity(e.target.value);
  };

  const login = e => {
    e.preventDefault();
    localStorage.setItem('foreman', identity);
    history.push('/');
  };

  return (
    <div className="login">
      <h1>Total Mechanical Tools</h1>
      <label htmlFor="foreman-list">Who are you?</label>
      <select id="foreman-list" onChange={handleChange}>
        <option value="">~ Select your name ~</option>
        {list.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button onClick={login} disabled={!identity}>
        GO
      </button>
    </div>
  );
}
