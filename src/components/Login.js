import React from 'react';
import { useHistory } from 'react-router-dom';

import base from '../helpers/data';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { Row, Col, Button, Label, Input } from 'reactstrap';
import Loading from './Loading';

export default function Login() {
  const history = useHistory();
  const [value, setValue] = React.useState('');
  const [guys, setGuys] = React.useState([]);
  const [, setForeman] = useLocalStorage('foreman', {});

  React.useEffect(() => {
    const fetchGuys = async () => {
      const res = await base('Foreman')
        .select({
          view: 'API',
          fields: ['Name']
        })
        .all();

      const guys = res.map(rec => ({
        id: rec.id,
        ...rec.fields
      }));
      setGuys(guys);
    };

    fetchGuys();
  }, []);

  const handleChange = e => setValue(e.target.value);

  const login = e => {
    e.preventDefault();
    setForeman(guys.find(guy => guy.id === value));
    history.push('/');
  };

  return (
    <Row className="justify-content-center">
      <Col sm="8" md="6">
        {guys && guys.length > 0 ? (
          <>
            <Label for="list">Who are you?</Label>
            <Input
              className="mb-3"
              type="select"
              name="select"
              id="list"
              onChange={handleChange}
            >
              <option value="">Select your name...</option>
              {guys.map(guy => (
                <option key={guy.id} value={guy.id}>
                  {guy.Name}
                </option>
              ))}
            </Input>
            <Button block color="primary" onClick={login} disabled={!value}>
              Go
            </Button>
          </>
        ) : (
          <Loading />
        )}
      </Col>
    </Row>
  );
}
