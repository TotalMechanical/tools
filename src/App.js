import React, { useEffect, useState } from 'react';
import './App.css';

import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base('appUcjUVkCCkgJJcl');
const inventory = base('Inventory');

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    inventory
      .select({ view: 'DO NOT TOUCH - API' })
      .all()
      .then(records => {
        console.log('Records', records);
        setData(records);
      });
  }, []);

  return (
    <main>
      <iframe
        className="airtable-embed"
        title="Specialty Tools Calendar"
        src="https://airtable.com/embed/shrgP7DXhPWLAqpf1?backgroundColor=gray"
        frameBorder="0"
        width="100%"
        height="533"
      ></iframe>
      {data.map(record => (
        <div className="record" key={record.id}>
          <p>{record.fields['Tool ID']}</p>
          <p>{record.fields['Type']}</p>
          <p>{record.fields['Serial']}</p>
          <p>{record.fields['Description']}</p>
          <p>{record.fields['Model']}</p>
          <p>{record.fields['Purchase Date']}</p>
          <p>{record.fields['Status']}</p>
          <p>{record.fields['Assigned To']}</p>
        </div>
      ))}
    </main>
  );
}

export default App;
