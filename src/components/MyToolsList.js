import * as React from 'react'

import { Table, Row, Col, Form, Label, Input, Button } from 'reactstrap'

export default function MyToolsList({ tools }) {
  const [filterResults, setFilterResults] = React.useState(tools)
  const [query, setQuery] = React.useState('')

  React.useEffect(() => {
    const results = tools.filter(
      (tool) =>
        tool.Name.toLowerCase().includes(query.toLowerCase()) ||
        tool['Tool ID'].toLowerCase().includes(query.toLowerCase())
    )
    setFilterResults(results)
  }, [query, tools])

  const handleChange = (e) => setQuery(e.target.value)
  const clearFilter = () => setQuery('')

  // Email formatting for Report Links
  const to = process.env.REACT_APP_EMAIL
  const subject = 'Report Broken/Lost Tool'
  const body = (tool) => `Notes:



— — — — — — — —
Tool Type: ${tool.Type}
Serial #: ${tool.Serial}
Tool ID: ${tool['Tool ID']}
Manufacturer: ${tool.Manufacturer}
Description: ${tool.Description}
Model: ${tool.Model}`

  const email = (rec) =>
    encodeURI(`mailto:${to}?subject=${subject}&body=${body(rec)}`)

  return (
    <>
      <Form>
        <Row className="align-items-end mb-2" form>
          <Col xs="9" sm="6" md="4">
            <Label for="filter">
              <strong>Filter Tools by</strong>
            </Label>
            <Input
              id="filter"
              name="filter"
              type="text"
              placeholder="Name, Tool ID, Description"
              value={query}
              onChange={handleChange}
            />
          </Col>
          <Col xs="2" sm="6">
            <Button onClick={clearFilter}>Clear</Button>
          </Col>
        </Row>
      </Form>
      <p className="h-scroll text-muted bg-light py-1 mb-1 text-center small">
        ‹‹ This table can scroll on small screens ››
      </p>

      <Table className="mb-0 text-nowrap" responsive>
        <thead>
          <tr>
            <th className="border-top-0 pt-0">Tool</th>
            {/* <th className="border-top-0 pt-0">Type</th> */}
            {/* <th className="border-top-0 pt-0">Tool ID</th> */}
            <th className="border-top-0 pt-0">Description</th>
            {/* <th className="border-top-0 pt-0">Status</th> */}
            <th className="text-center border-top-0 pt-0">Report</th>
          </tr>
        </thead>
        <tbody>
          {filterResults.map((tool) => (
            <tr key={tool.id}>
              <td className="align-middle">{tool['Name']}</td>
              {/* <td className="align-middle">{rec['Tytde']}</td>
              <td className="align-middle">{rec['Tool ID']}</td> */}
              <td className="align-middle">{tool['Description']}</td>
              {/* <td className="align-middle">{tool['Status']}</td> */}
              <td className="text-center">
                <a className="btn btn-warning" href={email(tool)}>
                  Report
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
