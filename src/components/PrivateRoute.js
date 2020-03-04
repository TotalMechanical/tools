import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem('foreman') ? children : <Redirect to="/login" />
      }
    />
  );
}
