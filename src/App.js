import React from 'react';
import './App.css';

import Airtable from 'airtable';

const foreman = 'Branimir Jesic';

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base('appUcjUVkCCkgJJcl');
const inventory = base('Inventory');

function App() {
  const [tools, setTools] = React.useState([]);
  const [specialty, setSpecialty] = React.useState([]);

  React.useEffect(() => {
    inventory
      .select({
        view: 'DO NOT TOUCH - API',
        filterByFormula: `({Assigned To} = '${foreman}')`
      })
      .all()
      .then(recs => {
        console.log('Records', recs);
        setTools([...recs.filter(rec => rec.fields['Type'] !== 'Specialty')]);
        setSpecialty([
          ...recs.filter(rec => rec.fields['Type'] === 'Specialty')
        ]);
      });
  }, []);

  return (
    <>
      <main>
        <h3>Specialty Tools Calendar</h3>
        <iframe
          className="airtable-embed"
          title="Specialty Tools Calendar"
          src="https://airtable.com/embed/shrgP7DXhPWLAqpf1?backgroundColor=gray"
          frameBorder="0"
          width="100%"
          height="533"
        />
        <h1>{foreman}</h1>
        {specialty.length > 0 && (
          <section className="specialty">
            <h3>My Specialty Tool Loans</h3>
            {specialty.map(rec => (
              <div className="record" key={rec.id}>
                <p>{rec.fields['Description']}</p>
                <p>{rec.fields['Tool ID']}</p>
                <p>{rec.fields['Loan Start']}</p>
                <p>{rec.fields['Loan End']}</p>
                <p>{rec.fields['Assigned To']}</p>
              </div>
            ))}
          </section>
        )}
        <section className="tools">
          {tools.map(rec => (
            <div className="record" key={rec.id}>
              <p>{rec.fields['Type']}</p>
              <p>{rec.fields['Tool ID']}</p>
              <p>{rec.fields['Description']}</p>
              <p>{rec.fields['Status']}</p>
              <p>{rec.fields['Assigned To']}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
