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
      {/* Sidebar의 상태와 toggleSidebar 함수를 TopBar 컴포넌트로 props로 전달 */}
      <TopBar toggleSidebar={toggleSidebar} />
      {/* Sidebar의 상태와 toggleSidebar 함수를 Sidebar 컴포넌트로 props로 전달 */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`${styles.main} ${sidebarOpen ? styles.withsidebar : ''}`}>
        {/* Main content */}
        {children} 
      </div>
    </div>
    /* <Footer /> */
  );
};

export default Layout;
