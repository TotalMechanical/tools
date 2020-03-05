import React from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { getLocal } from '../helpers/localStorage';

export default function Specialty() {
  const specialty = getLocal('specialty');
  const [showCal, setShowCal] = useLocalStorage('showCal', false);

  const toggleCal = () => {
    setShowCal(prev => !prev);
  };

  return specialty ? (
    <>
      <div className="header-cal">
        <h3>Specialty Tools Calendar</h3>
        <button onClick={toggleCal}>
          {showCal ? 'Hide' : 'Show'} Calendar
        </button>
      </div>
      {showCal && (
        <iframe
          id="airtable-embed"
          title="Specialty Tools Calendar"
          src="https://airtable.com/embed/shrPxBnmDnm2lnEsh?
          backgroundColor=white"
          frameBorder="0"
          width="100%"
          height="500"
        />
      )}
      {!specialty ? (
        <h3>Loading...</h3>
      ) : (
        <section className="specialty">
          <h3>Specialty Tools</h3>
          {specialty &&
            specialty.list &&
            specialty.list.map(rec => (
              <div className="record" key={rec.id}>
                <p>{rec['Name']}</p>
                <p>{rec['Description']}</p>
                {/* <p>{rec['Tool ID']}</p> */}
                <p>{rec['Loan Start']}</p>
                <p>{rec['Loan End']}</p>
                <p>{rec['Availability']}</p>
                <a
                  href={`mailto:anonaddy@bx.anonaddy.me?subject=Request Specialty Tool&body=(Desired) Loan Start Date: %0D%0A%0D%0A(Desired) Loan End Date: %0D%0A%0D%0AComments:%0D%0A%0D%0A%0D%0A%0D%0A— — — — — — — —%0D%0A%0D%0ATool ID: ${rec['Tool ID']}%0D%0A%0D%0AManufacturer: ${rec.Manufacturer}%0D%0A%0D%0ADescription: ${rec.Description}%0D%0A%0D%0AModel: ${rec.Model}`}
                >
                  <span role="img" aria-label="yellow warning sign">
                    ⚠️
                  </span>{' '}
                </a>
              </div>
            ))}
        </section>
      )}
    </>
  ) : (
    <h3>Loading...</h3>
  );
}
