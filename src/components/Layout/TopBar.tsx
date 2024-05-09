  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import styles from '/src/components/Module/TopBar.module.css'; 

  const TopBar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  
    return (
      <div className={styles.topbar}>
        <div onClick={toggleSidebar}>
        <img
          className={styles.logo}
          src="src/assets/logo.png"
          alt="Logo"
        />
        </div>
        <div>
          {/* 홈 페이지로 이동하는 링크 */}
          <Link to="/">
            <img
              className={styles.punglogo}
              src="src/assets/punglogo.png"
              alt="PungLogo"
            />
          </Link>
        </div>
          <div></div>
      </div>
    );
  };

  export default TopBar;