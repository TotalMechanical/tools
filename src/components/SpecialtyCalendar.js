import React from 'react';

export default function SpecialtyCalendar() {
  const [showCal, setShowCal] = React.useState(false);

  const toggleCal = () => setShowCal(prev => !prev);

  return (
    <div className="cal">
      <button className="cal-toggle" onClick={toggleCal}>
        {showCal ? 'Hide' : 'Show'} Calendar
      </button>
      {showCal && (
        <>
          <p>Cal</p>
          {/* <iframe
            title="Specialty Calendar"
            className="airtable-embed"
            src="https://cors-anywhere.herokuapp.com/https://airtable.com/embed/shrPxBnmDnm2lnEsh?backgroundColor=white"
            frameBorder="0"
            width="100%"
            height="250"
            style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
          /> */}
        </>
      )}
    </div>
  );
}
