import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import base from '../helpers/data';

export default function Tools() {
  const foreman = localStorage.getItem('foreman');
  const [lastFetch, setLastFetch] = useLocalStorage('lastFetch', '');
  const [tools, setTools] = useLocalStorage('tools', []);
  const [specialty, setSpecialty] = useLocalStorage('specialty', []);

  React.useEffect(() => {
    const t = new Date().toJSON();
    const fetchTools = () => {
      base('Inventory')
        .select({
          view: 'DO NOT TOUCH - API',
          filterByFormula: `({Assigned To} = '${foreman}')`
        })
        .all()
        .then(res => {
          const records = res.map(rec => ({
            id: rec.id,
            ...rec.fields
          }));

          const num = t
            .match(/[0-9]{2,}/g)
            .slice(0, 5)
            .join('');

          setLastFetch(num);
          setTools(records.filter(rec => rec['Type'] !== 'Specialty'));
          setSpecialty(records.filter(rec => rec['Type'] === 'Specialty'));
        });
    };
    if (!lastFetch || Number(lastFetch) - Number(t) < 10) fetchTools();
  }, []);

  if (!lastFetch) {
    return <h3>Loading...</h3>;
  } else {
    return (
      <>
        {specialty.length > 0 && (
          <section className="specialty">
            <h3>My Specialty Tool Loans</h3>
            {specialty.map(rec => (
              <div className="record" key={rec.id}>
                <p>{rec['Name']}</p>
                <p>{rec['Description']}</p>
                {/* <p>{rec['Tool ID']}</p> */}
                <p>{rec['Loan Start']}</p>
                <p>{rec['Loan End']}</p>
              </div>
            ))}
          </section>
        )}
        <section className="tools">
          {tools.map(rec => (
            <div className="record" key={rec.id}>
              <p>{rec['Name']}</p>
              {/* <p>{rec['Type']}</p>
              <p>{rec['Tool ID']}</p> */}
              <p>{rec['Description']}</p>
              <p>{rec['Status']}</p>
            </div>
          ))}
        </section>
      </>
    );
  }
}
