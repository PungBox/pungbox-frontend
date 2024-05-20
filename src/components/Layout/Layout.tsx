import React, { useEffect, useState } from 'react';
import styles from '/src/components/Module/Layout.module.css';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

const Layout = ({children }: {
  children: React.ReactNode
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar의 표시 여부를 상태로 관리

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.layout}>
      <TopBar toggleSidebar={toggleSidebar} />
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.scrollable}>
        <div className={`${styles.main} ${sidebarOpen ? styles.withsidebar : ''}`}>
          {/* Main content */}
          {children} 
        </div>
      </div>
    </div>
  );
};

export default Layout;
