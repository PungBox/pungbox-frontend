import React, { useEffect, useState } from 'react';
import styles from './module/Sidebar.module.css'; 

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 여기서 768은 원하는 임계값입니다.
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className={styles.sidebar}>
        <div className={styles.frame}>
            <div className={styles.menucontainer}>
                <img className={styles.folder} src="https://via.placeholder.com/50x50" alt="Open Folder" />
                {!isMobile && <span>View Folder</span>}
            </div>
            <div className={styles.menucontainer}>
            <img className={styles.search} src="https://via.placeholder.com/50x50" alt="Search" />
                {!isMobile && <span>Search Folder</span>}
            </div>
            <div className={styles.menucontainer}>
            <img className={styles.information} src="https://via.placeholder.com/50x50" alt="About Us" />
                {!isMobile && <span>Information</span>}
            </div>
        
        </div>
    </div>
  );
};

export default Sidebar;