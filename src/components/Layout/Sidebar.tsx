import React from 'react';
import styles from './module/Sidebar.module.css'; 

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <div className={styles.frame}>
            <div className="MenuCotainer">
                <img className={styles.folder} src="https://via.placeholder.com/50x50" alt="Open Folder" />
            </div>
        <img className={styles.search} src="https://via.placeholder.com/50x50" alt="Search" />
        <img className={styles.information} src="https://via.placeholder.com/50x50" alt="Question" />
        </div>
    </div>
  );
};

export default Sidebar;