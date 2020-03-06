import React from 'react';
import { Spinner } from 'reactstrap';

export default function Loading() {
  return (
    <Spinner
      className="d-flex justify-content-center align-items-center mr-auto ml-auto"
      style={{ width: '5rem', height: '5rem' }}
      type="grow"
      color="secondary"
    />
  );
}
