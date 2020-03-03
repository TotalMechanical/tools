import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  useHistory,
  Route,
  Redirect,
  Switch,
  useRouteMatch
} from 'react-router-dom';

import { MdBuild, MdExitToApp } from 'react-icons/md';
import './App.css';

import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base('appUcjUVkCCkgJJcl');

export default function App() {
  return (
    <Router>
      <Nav />

      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute path="/tools">
          <Tools />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem('foreman') ? children : <Redirect to="/" />
      }
    />
  );
}

function Nav() {
  const foreman = localStorage.getItem('foreman');
  const history = useHistory();

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('foreman');
    history.push('/');
  };
  return (
    <nav>
      <h3>
        <MdBuild /> TOOLS
      </h3>
      {foreman && (
        <div className="foreman">
          <p>{foreman}</p>
          <button onClick={logout}>
            <MdExitToApp /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}

function Login() {
  const history = useHistory();
  const [foreman, setForeman] = React.useState('');
  const [foremanList, setForemanList] = React.useState([]);

  React.useEffect(() => {
    base('Foreman')
      .select({
        view: 'DO NOT TOUCH - API',
        fields: ['Name']
      })
      .all()
      .then(recs => {
        const list = recs.map(el => el.fields['Name']);
        setForemanList(list);
      });
  }, []);

  const handleChange = e => {
    setForeman(e.target.value);
  };

  const login = e => {
    e.preventDefault();
    localStorage.setItem('foreman', foreman);
    history.push('/tools');
  };

  return (
    <>
      <h1>Total Mechanical Tools</h1>
      <label htmlFor="foreman-list">Who are you?</label>
      <select id="foreman-list" onChange={handleChange}>
        <option value="">~ Select your name ~</option>
        {foremanList.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button onClick={login} disabled={!foreman}>
        GO
      </button>
    </>
  );
}

function Tools() {
  const { path, url } = useRouteMatch();
  const foreman = localStorage.getItem('foreman');
  const [tools, setTools] = React.useState([]);
  const [specialty, setSpecialty] = React.useState([]);

  React.useEffect(() => {
    base('Inventory')
      .select({
        view: 'DO NOT TOUCH - API',
        filterByFormula: `({Assigned To} = '${foreman}')`
      })
      .all()
      .then(res => {
        const records = res.map(record => ({
          id: record.id,
          ...record.fields
        }));
        console.log('Records', records);

        setTools([...records.filter(record => record['Type'] !== 'Specialty')]);
        setSpecialty([
          ...records.filter(record => record['Type'] === 'Specialty')
        ]);
      });
  }, [foreman]);

  return (
    <main>
      <div className="sub-nav">
        <NavLink exact to={`${url}`}>
          My Tools
        </NavLink>
        <NavLink to={`${url}/specialty`}>Specialty</NavLink>
      </div>
      <Switch>
        <Route exact path={path}>
          {specialty.length > 0 && (
            <section className="specialty">
              <h3>My Specialty Tool Loans</h3>
              {specialty.map(rec => (
                <div className="record" key={rec.id}>
                  <p>{rec['Description']}</p>
                  <p>{rec['Tool ID']}</p>
                  <p>{rec['Loan Start']}</p>
                  <p>{rec['Loan End']}</p>
                </div>
              ))}
            </section>
          )}
          <section className="tools">
            {tools.map(rec => (
              <div className="record" key={rec.id}>
                <p>{rec['Type']}</p>
                <p>{rec['Tool ID']}</p>
                <p>{rec['Description']}</p>
                <p>{rec['Status']}</p>
              </div>
            ))}
          </section>
        </Route>
        <Route path={`${path}/specialty`}>
          <h3>Specialty Tools Calendar</h3>
          <iframe
            className="airtable-embed"
            title="Specialty Tools Calendar"
            src="https://airtable.com/embed/shrgP7DXhPWLAqpf1?backgroundColor=gray"
            frameBorder="0"
            width="100%"
            height="533"
          />
        </Route>
      </Switch>
    </main>
  );
}
