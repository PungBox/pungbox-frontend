import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '/src/components/Module/Sidebar.module.css'; 

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
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

  const getLinkByAlt = (alt: string) => {
    switch (alt) {
      case 'Open Folder':
        return '/view';
      case 'Search':
        return '/authenticate';
      case 'About Us':
        return '/aboutus';
      default:
        return '/';
    }
  };
  
  return (
    <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
      <div className={styles.frame}>
        <Link to={getLinkByAlt('Open Folder')}>
          <div className={styles.menucontainer}>
            <img className={styles.folder} src="src/assets/icon/free-icon-open-folder-7734271.png" alt="Open Folder" />
            {!isMobile && <span>View Folder</span>}
          </div>
        </Link>
        <Link to={getLinkByAlt('Search')}>
          <div className={styles.menucontainer}>
            <img className={styles.search} src="src/assets/icon/free-icon-search-7734281.png" alt="Search" />
            {!isMobile && <span>Search Folder</span>}
          </div>
        </Link>
        <Link to={getLinkByAlt('About Us')}>
          <div className={styles.menucontainer}>
            <img className={styles.information} src="src/assets/icon/free-icon-question-7734270.png" alt="About Us" />
            {!isMobile && <span>About Us</span>}
          </div>
        </Link>
      </div>
      {/* 오버레이로 사이드바를 닫을 수 있는 영역 */}
      {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;