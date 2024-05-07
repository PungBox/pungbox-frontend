import React from 'react';
import styles from './Layout.module.css';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

const Layout = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.layout}>
      <TopBar />
      <Sidebar />
      <div className={styles.main}>
        {/* Main content */}
        {children} 
      </div>
    </div>
    /* <Footer /> */
  );
};

export default Layout;
