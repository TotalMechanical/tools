import React from 'react';
import { useHistory } from 'react-router-dom';
import base from '../helpers/data';

export default function Login() {
  const history = useHistory();
  const [foreman, setForeman] = React.useState('');
  const [foremanList, setForemanList] = React.useState([]);

  React.useEffect(() => {
    base('Foreman')
      .select({
        view: 'DO NOT TOUCH - API',
        fields: ['Name']
      })
      .all()
      .then(recs => {
        const list = recs.map(el => el.fields['Name']);
        setForemanList(list);
      });
  }, []);

  const handleChange = e => {
    setForeman(e.target.value);
  };

  const login = e => {
    e.preventDefault();
    localStorage.setItem('foreman', foreman);
    history.push('/');
  };

  return (
    <>
      <h1>Total Mechanical Tools</h1>
      <label htmlFor="foreman-list">Who are you?</label>
      <select id="foreman-list" onChange={handleChange}>
        <option value="">~ Select your name ~</option>
        {foremanList.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button onClick={login} disabled={!foreman}>
        GO
      </button>
    </>
  );
}
