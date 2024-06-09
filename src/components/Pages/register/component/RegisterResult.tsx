import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultContainer from './ResultContainer';
import styles from '/src/components/Module/Register.module.css';

const RegisterResult = () => {
  const url = 'https://www.pungbox.com/box/135790';
  const accessCode = '135790';
  const expirationDate = new Date().toLocaleString();
  const location = useLocation();
  const navigate = useNavigate();
  
  function navigateToViewPage() {
    navigate('/view', { state: { files: location.state.files } });
  }
  
  return (
    <div className={styles.registerResultContainer}>
      <ResultContainer title="URL for Storage:" content={url} copyable />
      <ResultContainer title="Access Code for Storage:" content={accessCode} copyable />
      <ResultContainer title="Expiration Date:" content={expirationDate} />
      
      <button className={styles.gotobutton} onClick={navigateToViewPage}>Go to Storage</button>
    </div>
  );
};

export default RegisterResult;
