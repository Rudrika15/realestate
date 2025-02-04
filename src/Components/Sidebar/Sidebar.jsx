import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Allpermissions from "../../Pages/Common component/Allpermissions";

const Sidebar = ({ isSidebarOpen }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const location = useLocation();

  const [permissions, setPermissions] = useState([]);
  const hasPermission = (permission) => permissions.includes(permission);

  const isActive = (path) => location.pathname === path;
  const isBookingActive = () =>
    ["/view-booking", "/cancelled-booking"].includes(location.pathname);

  const isLedgerActive = () =>
    ["/partner-income", "/customer-income"].includes(location.pathname);

  const isApprovalActive = () =>
    ["/cash-deposit", "/cheque-deposit", "/booking-authorization"].includes(
      location.pathname
    );
  const isAuthActive = () =>
    ["/partner-income", "/customer-income", ""].includes(location.pathname);

  const toggleBookingDropdown = () => {
    setIsBookingOpen((prevState) => !prevState);
    setIsLedgerOpen(false);
    setIsApprovalOpen(false);
    setIsAuthOpen(false);
  };

  const toggleLedgerDropdown = () => {
    setIsLedgerOpen((prevState) => !prevState);
    setIsBookingOpen(false);
    setIsApprovalOpen(false);
    setIsAuthOpen(false);
  };

  const toggleApprovalDropdown = () => {
    setIsApprovalOpen((prevState) => !prevState);
    setIsBookingOpen(false);
    setIsLedgerOpen(false);
    setIsAuthOpen(false);
  };

  const toggleAuthDropdown = () => {
    setIsAuthOpen((prevState) => !prevState);
    setIsBookingOpen(false);
    setIsLedgerOpen(false);
    setIsApprovalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-item.dropdown")) {
        setIsBookingOpen(false);
        setIsLedgerOpen(false);
        setIsApprovalOpen(false);
        setIsAuthOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={`sidebar pe-4 ${isSidebarOpen ? "open" : ""}`}>
      <Allpermissions onFetchPermissions={setPermissions} />
      <nav className="navbar bg-light navbar-light">
        <a href="#" className="navbar-brand mx-5  mb-3">
          <h3 className="text-primary">ACSW</h3>
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle me-lg-2"
              src="/img/user.jpg"
              alt="User"
            />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">Admin</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <Link
            to="/dashboard"
            className={`nav-item nav-link ${
              isActive("/dashboard") ? "active" : ""
            }`}
          >
            <i class="fa fa-th-large" aria-hidden="true"></i> Dashboard
          </Link>
          {hasPermission("view-project") && (
            <Link
              to="/projects"
              className={`nav-item nav-link ${
                isActive("/projects") ? "active" : ""
              }`}
            >
              <i className="fas fa-briefcase"></i> Projects
            </Link>
          )}
          <div className="nav-item dropdown">
            {hasPermission("booking") && (
              <Link
                to=""
                className={`nav-link dropdown-toggle ${
                  isBookingActive() ? "active" : ""
                }`}
                onClick={toggleBookingDropdown}
              >
                <i className="fas fa-calendar-check"></i> Booking
              </Link>
            )}
            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isBookingOpen ? "show" : ""
              }`}
            >
              {hasPermission("view-booking") && (
                <Link
                  to="/view-booking"
                  className={`dropdown-item ms-3 ${
                    isActive("/view-booking") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-eye me-2"></i> View Bookings
                </Link>
              )}
              {hasPermission("cancelled-booking") && (
                <Link
                  to="/cancelled-booking"
                  className={`dropdown-item ms-3 ${
                    isActive("/cancelled-booking") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-x-circle me-2"></i> Cancelled Bookings
                </Link>
              )}
            </div>
          </div>
          {hasPermission("view-partner") && (
            <Link
              to="/partners"
              className={`nav-item nav-link ${
                isActive("/partners") ? "active" : ""
              }`}
            >
              <i className="bi bi-people custom-icon"></i> Partners
            </Link>
          )}
          {hasPermission("view-broker") && (
            <Link
              to="/broker"
              className={`nav-item nav-link ${
                isActive("/broker") ? "active" : ""
              }`}
            >
              <i class="fas fa-user-tie"></i> Broker
            </Link>
          )}
          {hasPermission("view-expenses") && (
            <Link
              to="/expenses"
              className={`nav-item nav-link ${
                isActive("/expenses") ? "active" : ""
              }`}
            >
              <i className="bi bi-cash-stack"></i> Expenses
            </Link>
          )}

          <div className="nav-item dropdown">
            {hasPermission("ledger") && (
              <Link
                to=""
                className={`nav-link dropdown-toggle ${
                  isLedgerActive() ? "active" : ""
                }`}
                onClick={toggleLedgerDropdown}
              >
                <i className="bi bi-journal"></i> Ledger
              </Link>
            )}

            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isLedgerOpen ? "show" : ""
              }`}
            >
              {hasPermission("view-income") && (
                <Link
                  to="/income"
                  className={`dropdown-item ms-3 ${
                    isActive("/income") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-wallet me-2"></i> Income
                </Link>
              )}
              {hasPermission("view-ledger-partner") && (
                <Link
                  to="/partner-income"
                  className={`dropdown-item ms-3 ${
                    isActive("/partner-income") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-person-circle me-2"></i> Partner
                </Link>
              )}
              {hasPermission("view-customer-partner") && (
                <Link
                  to="/customer-income"
                  className={`dropdown-item ms-3 ${
                    isActive("/customer-income") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-person-lines-fill me-2"></i> Customer
                </Link>
              )}
            </div>
          </div>
          <div className="nav-item dropdown">
            {hasPermission("approval") && (
              <Link
                to=""
                className={`nav-link dropdown-toggle ${
                  isApprovalActive() ? "active" : ""
                }`}
                onClick={toggleApprovalDropdown}
              >
                <i className="bi bi-clipboard-check"></i> Approval
              </Link>
            )}

            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isApprovalOpen ? "show" : ""
              }`}
            >
              {hasPermission("view-cash-deposit") && (
                <Link
                  to="/cash-deposit"
                  className={`dropdown-item ms-3 ${
                    isActive("/cash-deposit") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-cash-stack me-2"></i> Cash Deposit
                </Link>
              )}
              {hasPermission("view-cheque-deposit") && (
                <Link
                  to="/cheque-deposit"
                  className={`dropdown-item ms-3 ${
                    isActive("/cheque-deposit") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-credit-card me-2"></i> Cheque Deposit
                </Link>
              )}
              {hasPermission("view-booking-authorization") && (
                <Link
                  to="/booking-authorization"
                  className={`dropdown-item ms-3 ${
                    isActive("/booking-authorization") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-check-circle me-2"></i> Booking
                  Authorization
                </Link>
              )}
            </div>
          </div>

          <div className="nav-item dropdown">
            {/* {hasPermission("approval") && ( */}
            <Link
              to=""
              className={`nav-link dropdown-toggle ${
                isAuthActive() ? "active" : ""
              }`}
              onClick={toggleAuthDropdown}
            >
              <i class="bi bi-gear-fill"></i> Auth
            </Link>
            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isAuthOpen ? "show" : ""
              }`}
            // )}
            >
              {hasPermission("view-user") && (
                <Link
                  to="/view-user"
                  className={`dropdown-item ms-3 ${
                    isActive("/view-user") ? "active" : ""
                  }`}
                >
                  <i className="fas fa-user me-2"></i> User
                </Link>
              )}
              {hasPermission("view-role") && (
                <Link
                  to="/role"
                  className={`dropdown-item ms-3 ${
                    isActive("/role") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-person-badge me-2"></i> Role
                </Link>
              )}
              {hasPermission("view-permissions") && (
                <Link
                  to="/permission"
                  className={`dropdown-item ms-3 ${
                    isActive("/permission") ? "active" : ""
                  }`}
                >
                  <i class="fas fa-shield-alt me-2"></i>
                  Permission
                </Link>
              )}
              
            </div>
          </div>
          {hasPermission("view-report") && (
            <Link
              to="/report"
              className={`nav-item nav-link ${
                isActive("/report") ? "active" : ""
              }`}
            >
              <i className="bi bi-bar-chart"></i> Report
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
