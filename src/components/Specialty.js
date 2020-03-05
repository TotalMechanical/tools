import React from 'react';

import SpecialtyCalendar from './SpecialtyCalendar';
import SpecialtyList from './SpecialtyList';

export default function Specialty() {
  const specialty = JSON.parse(window.localStorage.getItem('specialty'));

  return specialty ? (
    <>
      <SpecialtyCalendar />
      {specialty && specialty.list && <SpecialtyList tools={specialty.list} />}
    </>
  ) : (
    <h3>Loading...</h3>
  );
}
