import React from 'react';
import { useHistory } from 'react-router-dom';

import base from '../helpers/data';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Login() {
  const history = useHistory();
  const [foreman, setForeman] = useLocalStorage('foreman', {});
  const [guys, setGuys] = useLocalStorage('guys', {});

  React.useEffect(() => {
    const fetchForeman = async () => {
      const res = await base('Foreman')
        .select({
          view: 'API',
          fields: ['Name', 'Total Tools', 'Inventory Count', 'Specialty Count']
        })
        .all();

      const records = res.map(rec => ({
        id: rec.id,
        ...rec.fields
      }));
      const guys = {
        fetched: Date.now(),
        list: records
      };
      console.log('guys ···', guys);
      setGuys(guys);
    };

    fetchForeman();
  }, []);

  const handleChange = e => {
    setForeman(guys.list.find(el => el.id === e.target.value));
  };

  const login = e => {
    e.preventDefault();
    history.push('/');
  };

  return (
    <div className="login">
      <h1>Total Mechanical Tools</h1>
      {guys && guys.list ? (
        <>
          <label htmlFor="foreman-list">Who are you?</label>
          <select id="foreman-list" onChange={handleChange}>
            <option value="">~ Select your name ~</option>
            {guys.list.map(guy => (
              <option key={guy.id} value={guy.id}>
                {guy.Name}
              </option>
            ))}
          </select>
          <button onClick={login} disabled={!foreman}>
            GO
          </button>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}
