import * as React from 'react'

import { Table } from 'reactstrap'

export default function SpecialtyList({ tools }) {
  // Email formatting for Request Links
  const to = process.env.REACT_APP_EMAIL
  const subject = 'Request Specialty Tool'
  const body = (rec) => `(Desired) Loan Start Date: 
(Desired) Loan End Date:

Comments:



— — — — — — — —
Tool ID: ${rec['Tool ID']}
Manufacturer: ${rec.Manufacturer}
Description: ${rec.Description}
Model: ${rec.Model}`

  const email = (rec) =>
    encodeURI(`mailto:${to}?subject=${subject}&body=${body(rec)}`)

  return (
    <>
      <p className="h-scroll text-muted bg-light py-1 mb-1 text-center small">
        ‹‹ This table can scroll on small screens ››
      </p>
      <Table className="text-nowrap" responsive>
        <thead>
          <tr>
            <th className="border-top-0 pt-0">Tool</th>
            {/* <th className="border-top-0 pt-0">Type</th> */}
            {/* <th className="border-top-0 pt-0">Tool ID</th> */}
            <th className="border-top-0 pt-0">Description</th>
            <th className="border-top-0 pt-0">Availability</th>
            <th className="text-center border-top-0 pt-0">Request</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((rec) => (
            <tr key={rec.id}>
              <td className="align-middle">{rec['Name']}</td>
              <td className="align-middle">{rec['Description']}</td>
              {/* <td className="align-middle">{rec['Tool ID']}</td> */}
              {/* <td className="align-middle">{rec['Loan Start']}</td> */}
              {/* <td className="align-middle">{rec['Loan End']}</td> */}
              <td className="align-middle">{rec['Availability']}</td>
              <td className="text-center">
                <a className="btn btn-secondary" href={email(rec)}>
                  Ask
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <style>{`
        @media (min-width: 576px) {
          .h-scroll {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
