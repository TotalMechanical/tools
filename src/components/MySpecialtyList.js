import React from 'react';

export default function MySpecialtyList({ tools }) {
  return (
    <section className="specialty">
      <h3>My Specialty Tool Loans</h3>
      {tools.map(tool => (
        <div className="record" key={tool.id}>
          <p>{tool['Name']}</p>
          <p>{tool['Description']}</p>
          {/* <p>{rec['Tool ID']}</p> */}
          <p>{tool['Loan Start']}</p>
          <p>{tool['Loan End']}</p>
        </div>
      ))}
    </section>
  );
}
