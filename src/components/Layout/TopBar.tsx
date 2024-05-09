import React from 'react';
import styles from './module/TopBar.module.css'; 

const TopBar = () => {
  return (
    <div className={styles.topbar}>
        <div>
          <img
            className={styles.logo}
            src="https://via.placeholder.com/50x50"
            alt="Logo"
          />
        </div>
        <div>
          <img
            className={styles.punglogo}
            src="https://via.placeholder.com/225x50"
            alt="Pung Logo"
          />
        </div>
        <div></div>
    </div>
  );
};

export default TopBar;