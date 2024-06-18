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
    <h1>Page Not Found</h1>
    <img className={styles.mainicon} src={punglogoUrl} alt="uploadFileHere" />
    <div className={styles.textcontainer}>
      <h2>Oops! Something went wrong.</h2>
      <p>The page you requested is not found.</p>
    </div>
    <button className={styles.gobackbutton} onClick={goBackToPreviousPage}>Go back</button>
  </>);
};

export default PageNotFound;