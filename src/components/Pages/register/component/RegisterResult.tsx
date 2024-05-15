import React from 'react';
import { Link } from 'react-router-dom';
import ResultContainer from './ResultContainer';

const RegisterResult = () => {
  const url = 'https://www.pungbox.com/box/135790';
  const accessCode = '135790';
  const expirationDate = new Date().toLocaleString();

  return (
    <div>
      <ResultContainer title="URL for Storage:" content={url} copyable />
      <ResultContainer title="Access Code for Storage:" content={accessCode} copyable />
      <ResultContainer title="Expiration Date:" content={expirationDate} />

      <Link to={`${url}/view`}>
        <button onClick={() => (window.location.href = url)}>Go to Storage</button>
      </Link>
    </div>
  );
};

export default RegisterResult;
