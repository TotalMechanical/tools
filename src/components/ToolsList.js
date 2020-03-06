import React from 'react';

export default function ToolList({ tools }) {
  const [filterResults, setFilterResults] = React.useState(tools);
  const [query, setQuery] = React.useState('');
  React.useEffect(() => {
    const results = tools.filter(
      tool =>
        tool.Name.toLowerCase().includes(query.toLowerCase()) ||
        tool['Tool ID'].toLowerCase().includes(query.toLowerCase())
    );
    setFilterResults(results);
  }, [query]);

  const handleChange = e => setQuery(e.target.value);
  const clearFilter = () => setQuery('');

  return (
    <section className="tools">
      <form>
        <label htmlFor="filter">Filter by:</label>
        <input
          id="filter"
          type="text"
          placeholder="Name, Tool ID, Description"
          value={query}
          onChange={handleChange}
        />
      </form>
      <button onClick={clearFilter}>Clear</button>
      {filterResults.map(tool => (
        <div className="record" key={tool.id}>
          <p>{tool['Name']}</p>
          {/* <p>{rec['Type']}</p>
              <p>{rec['Tool ID']}</p> */}
          <p>{tool['Description']}</p>
          <p>{tool['Status']}</p>
          <a
            href={`mailto:anonaddy@bx.anonaddy.me?subject=Report Broken/Lost Tool&body=Notes:%0D%0A%0D%0A%0D%0A%0D%0A— — — — — — — —%0D%0A%0D%0ATool Type: ${tool.Type}%0D%0A%0D%0ASerial #: ${tool.Serial}%0D%0A%0D%0ATool ID: ${tool['Tool ID']}%0D%0A%0D%0AManufacturer: ${tool.Manufacturer}%0D%0A%0D%0ADescription: ${tool.Description}%0D%0A%0D%0AModel: ${tool.Model}`}
          >
            <span role="img" aria-label="yellow warning sign">
              ⚠️
            </span>{' '}
          </a>
        </div>
      ))}
    </section>
  );
}
