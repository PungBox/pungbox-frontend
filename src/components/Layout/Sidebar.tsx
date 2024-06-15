import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '/src/components/Module/Sidebar.module.css';
import openfolderUrl from '/src/assets/images/icon-open-folder.png';
import searchUrl from '/src/assets/images/icon-search.png';
import questionUrl from '/src/assets/images/icon-question.png';
import plusUrl from '/src/assets/images/icon-plus.png';
import connectionUrl from '/src/assets/images/icon-cloud-connection.png';
import { isAuthenticated, signout } from '../../service/service';
import { useBucketInfoContext } from 'context/BucketInfoProvider';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { bucketInfo: registeredBucketInfo } = useBucketInfoContext();

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
        return `/view?bucketCode=${registeredBucketInfo.id}`;
      case 'Search':
        return '/authenticate';
      case 'About Us':
        return '/aboutus';
      default:
        return '/';
    }
  };
  
  function confirmLogout() {
    if (window.confirm('Are you sure you want to disconnect from current folder?')) {
      signout();
      navigate('/');
    }
  }
  
  return (
    <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
      {isAuthenticated() ? (
        <div className={styles.frame}>
          <Link to={getLinkByAlt('Open Folder')}>
            <div className={styles.menucontainer}>
              <img className={styles.folder} src={openfolderUrl} alt="Open Folder" />
              {!isMobile && <span>View Folder</span>}
            </div>
          </Link>
          <div className={styles.menucontainer} onClick={confirmLogout}>
            <img className={styles.disconnect} src={connectionUrl} alt="Disconnect" />
            {!isMobile && <span>Disconnect</span>}
          </div>
          <Link to={getLinkByAlt('About Us')}>
            <div className={styles.menucontainer}>
              <img className={styles.information} src={questionUrl} alt="About Us" />
              {!isMobile && <span>About Us</span>}
            </div>
          </Link>
        </div>
      ) : (
        <div className={styles.frame}>
          <Link to={getLinkByAlt('Create Folder')}>
            <div className={styles.menucontainer}>
              <img className={styles.createfolder} src={plusUrl} alt="Create Folder" />
              {!isMobile && <span>Create Folder</span>}
            </div>
          </Link>
          <Link to={getLinkByAlt('Search')}>
            <div className={styles.menucontainer}>
              <img className={styles.search} src={searchUrl} alt="Search" />
              {!isMobile && <span>Search Folder</span>}
            </div>
          </Link>
          <Link to={getLinkByAlt('About Us')}>
            <div className={styles.menucontainer}>
              <img className={styles.information} src={questionUrl} alt="About Us" />
              {!isMobile && <span>About Us</span>}
            </div>
          </Link>
        </div>
      )}
      {/* 오버레이로 사이드바를 닫을 수 있는 영역 */}
      {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
