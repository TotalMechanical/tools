import * as React from 'react'

import { Table } from 'reactstrap'

export default function MySpecialtyList({ tools }) {
  const formatDate = (date) => {
    const d = new Date(date)
    const dtf = new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric'
    })
    const [{ value: mo }, , { value: da }] = dtf.formatToParts(d)
    return `${mo} ${da}`
  }
  return (
    <div className="mb-2 bg-light">
      <Table className="text-nowrap mb-0" size="sm" borderless responsive>
        <thead>
          <tr>
            <th>Specialty Tool</th>
            {/* <th>Desc</th> */}
            {/* <th>Tool ID</th> */}
            <th>Loan Start</th>
            <th>Loan End</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id}>
              <td>{tool['Name']}</td>
              {/* <td>{tool['Description']}</td> */}
              {/* <td>{rec['Tool ID']}</td> */}
              <td>{formatDate(tool['Loan Start'])}</td>
              <td>{formatDate(tool['Loan End'])}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
