import React from 'react';
import styles from './TopBar.module.css'; // CSS 모듈 불러오기

const TopBar = () => {
  return (
    <div className={styles.topbar}>
        <div className={styles.logoborder}></div>
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
            src="https://via.placeholder.com/200x50"
            alt="Pung Logo"
          />
        </div>
    </div>
  );
};

export default TopBar;