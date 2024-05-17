  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import styles from '/src/components/Module/TopBar.module.css'; 
  import logoUrl from '/src/assets/images/logo.png';
  import punglogoUrl from '/src/assets/images/punglogo.png';

  const TopBar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  
    return (
      <div className={styles.topbar}>
        <div onClick={toggleSidebar}>
        <img
          className={styles.logo}
          src={logoUrl}
          alt="Logo"
        />
        </div>
        <div>
          {/* 홈 페이지로 이동하는 링크 */}
          <Link to="/">
            <img
              className={styles.punglogo}
              src={punglogoUrl}
              alt="PungLogo"
            />
          </Link>
        </div>
          <div></div>
      </div>
    );
  };

  export default TopBar;