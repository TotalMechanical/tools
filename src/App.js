import React, { useEffect, useState } from 'react';
import './App.css';

import Airtable from 'airtable';

const foreman = 'Branimir Jesic';

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base('appUcjUVkCCkgJJcl');
const inventory = base('Inventory');

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    inventory
      .select({
        view: 'DO NOT TOUCH - API',
        filterByFormula: `({Assigned To} = '${foreman}')`
      })
      .all()
      .then(recs => {
        console.log('Records', recs);
        setData([...recs]);
      });
  }, []);

  return (
    <>
      <h1>{foreman}</h1>
      <main>
        {/* <iframe
        className="airtable-embed"
        title="Specialty Tools Calendar"
        src="https://airtable.com/embed/shrgP7DXhPWLAqpf1?backgroundColor=gray"
        frameBorder="0"
        width="100%"
        height="533"
      /> */}
        {data.map(rec => (
          <div className="record" key={rec.id}>
            <p>{rec.fields['Type']}</p>
            <p>{rec.fields['Tool ID']}</p>
            <p>{rec.fields['Description']}</p>
            <p>{rec.fields['Status']}</p>
            <p>{rec.fields['Assigned To']}</p>
          </div>
        ))}
      </main>
    </>
  );
}

export default App;
