import React from 'react';
import styles from './TopBar.module.css'; // CSS 모듈 불러오기

const TopBar = () => {
  return (
    <div className={styles.TopBar}>
         <div className={styles.content}>
        <div>
          <img
            className={styles.Logo}
            src="https://via.placeholder.com/50x50"
            alt="Logo"
          />
        </div>
        <div>
          <img
            className={styles.PungLogo}
            src="https://via.placeholder.com/200x60"
            alt="Pung Logo"
          />
        </div>
        </div>
        <div className={styles.LogoBorder}></div>
        Topbar
    </div>
  );
};

export default TopBar;