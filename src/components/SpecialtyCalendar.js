import React from 'react';

import { Button } from 'reactstrap';

export default function SpecialtyCalendar() {
  const [showCal, setShowCal] = React.useState(false);

  const toggleCal = () => setShowCal(prev => !prev);

  return (
    <div className="mb-2">
      <Button className="mb-2" onClick={toggleCal}>
        {showCal ? 'Hide' : 'Show'} Calendar
      </Button>
      {showCal && (
        <>
          <iframe
            title="Specialty Calendar"
            className="airtable-embed"
            src="https://airtable.com/embed/shrPxBnmDnm2lnEsh?backgroundColor=white"
            frameBorder="0"
            width="100%"
            height="250"
            style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
          />
        </>
      )}
    </div>
  );
}
