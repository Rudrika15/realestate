// src/Components/Topbar/Topbar.js
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Topbar = ({ toggleSidebar, isTopbarOpen, toggleTopbar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.clear(); 
    toast.info("Logged out successfully!");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-5 py-0">
      <Link to="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0">
          <i className="fa fa-hashtag"></i>
        </h2>
      </Link>
      <Link
        to="#"
                className="sidebar-toggler flex-shrink-0"
        onClick={toggleSidebar}
      >
        <i className="fa fa-bars"></i>
      </Link>
      {/* <form className="d-none d-md-flex ms-4">
                <input
                    className="form-control border-0"
                    type="search"
                    placeholder="Search"
                />
            </form> */}
      <div className="navbar-nav align-items-center ms-auto">
        {/* <div className="nav-item dropdown">
                    <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        <i className="fa fa-envelope me-lg-2"></i>
                        <span className="d-none d-lg-inline-flex">Message</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                        <a href="#" className="dropdown-item">
                            <div className="d-flex align-items-center">
                                <img
                                    className="rounded-circle"
                                    src="img/user.jpg"
                                    alt="User"
                                    style={{ width: '40px', height: '40px' }}
                                />
                                <div className="ms-2">
                                    <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                    <small>15 minutes ago</small>
                                </div>
                            </div>
                        </a>
                        <hr className="dropdown-divider" />
                        <a href="#" className="dropdown-item text-center">
                            See all message
                        </a>
                    </div>
                </div> */}
        {/* <div className="nav-item dropdown">
                    <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        <i className="fa fa-bell me-lg-2"></i>
                        <span className="d-none d-lg-inline-flex">Notifications</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                        <a href="#" className="dropdown-item">
                            <h6 className="fw-normal mb-0">Profile updated</h6>
                            <small>15 minutes ago</small>
                        </a>
                        <hr className="dropdown-divider" />
                        <a href="#" className="dropdown-item text-center">
                            See all notifications
                        </a>
                    </div>
                </div> */}
        <div className="nav-item dropdown">
          <Link
            to="#"
            className={`nav-link dropdown-toggle${isTopbarOpen ? " show" : ""}`}
            data-bs-toggle="dropdown"
            onClick={toggleTopbar}
          >
            <img
              className="rounded-circle me-lg-2"
              src="./img/user.jpg"
              alt="User"
            />
            <span className="d-none d-lg-inline-flex">Admin</span>
          </Link>
        
            <div
              className={`dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0${
                isTopbarOpen ? " show" : ""
              }`}
            >              
              <Link to="/" className="dropdown-item" onClick={handleLogout}>Log Out</Link>
            </div>
        
        </div>
      </div>
      <style jsx="true">{`
        .user-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .dropdown-item {
          fontsize: 14px;
          fontfamily: Arial, sans-serif;
        }
      `}</style>
    </nav>
  );
};

export default Topbar;
