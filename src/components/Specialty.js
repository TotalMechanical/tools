import * as React from 'react'

import SpecialtyCalendar from './SpecialtyCalendar'
import SpecialtyList from './SpecialtyList'

export default function Specialty() {
  const data = JSON.parse(window.localStorage.getItem('data'))

  return data ? (
    <>
      <SpecialtyCalendar />
      {data && data.specialty && <SpecialtyList tools={data.specialty} />}
    </>
  ) : (
    <h3>Loading...</h3>
  )
}
