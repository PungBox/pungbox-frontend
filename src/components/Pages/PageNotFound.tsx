import styles from '/src/components/Module/PageNotFound.module.css';
import punglogoUrl from '/src/assets/images/logo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  
  function goBackToPreviousPage() {
    navigate(-1);
  }
  
  return (<>
    <img className={styles.mainicon} src={punglogoUrl} alt="uploadFileHere" />
    <h1>Oops! Something went wrong.</h1>
    <p>The page you requested is not found.</p>
    <button className={styles.gobackbutton} onClick={goBackToPreviousPage}>Go back</button>
  </>);
};

export default PageNotFound;