import React from 'react';

const Layout = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <div className="layout bg-pink-100 h-screen flex">
      <div className="sidebar bg-[#E1ACAC] w-1/4 p-4">
        {/* Sidebar content */}
        Sidebar
      </div>
      <div className="content flex-grow">
        <div className="topbar bg-[#CA8787] p-4">
          {/* Topbar content */}
          Topbar
        </div>
        <div className="main p-4">
          {/* Main content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
