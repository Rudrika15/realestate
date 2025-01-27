import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import Topbar from '../../Components/Topbar/Topbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const userName = localStorage.getItem('userName');

  return (
    <>
         
         <Helmet>
        <title>React Estate | User</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <Topbar
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isTopbarOpen={isTopbarOpen}
            toggleTopbar={() => setIsTopbarOpen(!isTopbarOpen)}
          />
          <div className="container-fluid pt-4 px-4">
              wel come  {userName}
          </div>
        </div>
      </div>
    </>


  )}
  export default Dashboard;