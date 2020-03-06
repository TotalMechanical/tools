import React from 'react';

import { Table } from 'reactstrap';

export default function MySpecialtyList({ tools }) {
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
          {tools.map(tool => (
            <tr key={tool.id}>
              <td>{tool['Name']}</td>
              {/* <td>{tool['Description']}</td> */}
              {/* <td>{rec['Tool ID']}</td> */}
              <td>{tool['Loan Start']}</td>
              <td>{tool['Loan End']}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
