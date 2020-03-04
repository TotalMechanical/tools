import React from 'react';
// import base from '../helpers/data';

export default function Specialty() {
  const [showCal, setShowCal] = React.useState(true);
  const toggleCal = () => {
    setShowCal(prev => !prev);
  };

  return (
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
          src="https://airtable.com/embed/shrgP7DXhPWLAqpf1?backgroundColor=gray"
          frameBorder="0"
          width="100%"
          height="533"
        />
      )}
    </>
  );
}
