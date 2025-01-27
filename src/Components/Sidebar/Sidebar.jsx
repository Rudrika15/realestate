import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { rolesWisePermissions } from "../../Api/ApiDipak";

const Sidebar = ({ isSidebarOpen }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);

  const location = useLocation();
  const [permissions, setPermissions] = useState([]);

  const fetchPermissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(rolesWisePermissions, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPermissions(response.data.data.map((perm) => perm.name));
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };
  console.log(permissions);

  useEffect(() => {
    fetchPermissions();
  }, []);
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

  const toggleBookingDropdown = () => {
    setIsBookingOpen((prevState) => !prevState);
    setIsLedgerOpen(false);
    setIsApprovalOpen(false);
  };

  const toggleLedgerDropdown = () => {
    setIsLedgerOpen((prevState) => !prevState);
    setIsBookingOpen(false);
    setIsApprovalOpen(false);
  };

  const toggleApprovalDropdown = () => {
    setIsApprovalOpen((prevState) => !prevState);
    setIsBookingOpen(false);
    setIsLedgerOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-item.dropdown")) {
        setIsBookingOpen(false);
        setIsLedgerOpen(false);
        setIsApprovalOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={`sidebar pe-4 ${isSidebarOpen ? "open" : ""}`}>
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
            className={`nav-item nav-link ${isActive("/dashboard") ? "active" : ""
              }`}
          >
            <i className="fas fa-user"></i> Dashboard
          </Link>
          {permissions.length === 0 && (
            <Link
              to="/view-user"
              className={`nav-item nav-link ${isActive("/view-user") ? "active" : ""
                }`}
            >
              <i className="fas fa-user"></i> User
            </Link>
          )}

          {permissions.length === 0 && (
            <Link
              to="/projects"
              className={`nav-item nav-link ${isActive("/projects") ? "active" : ""
                }`}
            >
              <i className="fas fa-briefcase"></i> Projects
            </Link>
          )}

          <div className="nav-item dropdown">
            {permissions.length === 0 && (
              <Link
                to=""
                className={`nav-link dropdown-toggle ${isBookingActive() ? "active" : ""
                  }`}
                onClick={toggleBookingDropdown}
              >
                <i className="fas fa-calendar-check"></i> Booking
              </Link>
            )}
            <div
              className={`dropdown-menu bg-transparent border-0 ${isBookingOpen ? "show" : ""
                }`}
            >
              <Link
                to="/view-booking"
                className={`dropdown-item ms-3 ${isActive("/view-booking") ? "active" : ""
                  }`}
              >
                <i className="bi bi-eye me-2"></i> View Bookings
              </Link>
              <Link
                to="/cancelled-booking"
                className={`dropdown-item ms-3 ${isActive("/cancelled-booking") ? "active" : ""
                  }`}
              >
                <i className="bi bi-x-circle me-2"></i> Cancelled Bookings
              </Link>
            </div>
          </div>

          {permissions.length === 0 && (
            <Link
              to="/broker"
              className={`nav-item nav-link ${isActive("/broker") ? "active" : ""
                }`}
            >
              <i class="fas fa-user-tie"></i> Broker
            </Link>
          )}

          {hasPermission("view-partner") && (
            <Link
              to="/partners"
              className={`nav-item nav-link ${isActive("/partners") ? "active" : ""
                }`}
            >
              <i className="bi bi-people custom-icon"></i> Partners
            </Link>
          )}

          {permissions.length === 0 && (
            <Link
              to="/expenses"
              className={`nav-item nav-link ${isActive("/expenses") ? "active" : ""
                }`}
            >
              <i className="bi bi-cash-stack"></i> Expenses
            </Link>
          )}

          {permissions.length === 0 && (
            <Link
              to="/income"
              className={`nav-item nav-link ${isActive("/income") ? "active" : ""
                }`}
            >
              <i className="bi bi-wallet"></i> Income
            </Link>
          )}
          <div className="nav-item dropdown">
            {permissions.length === 0 && (
              <Link
                to=""
                className={`nav-link dropdown-toggle ${isLedgerActive() ? "active" : ""
                  }`}
                onClick={toggleLedgerDropdown}
              >
                <i className="bi bi-journal"></i> Ledger
              </Link>
            )}

            <div
              className={`dropdown-menu bg-transparent border-0 ${isLedgerOpen ? "show" : ""
                }`}
            >
              <Link
                to="/partner-income"
                className={`dropdown-item ms-3 ${isActive("/partner-income") ? "active" : ""
                  }`}
              >
                <i className="bi bi-person-circle me-2"></i> Partner
              </Link>
              <Link
                to="/customer-income"
                className={`dropdown-item ms-3 ${isActive("/customer-income") ? "active" : ""
                  }`}
              >
                <i className="bi bi-person-lines-fill me-2"></i> Customer
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            {permissions.length === 0 && (
              <Link
                to=""
                className={`nav-link dropdown-toggle ${isApprovalActive() ? "active" : ""
                  }`}
                onClick={toggleApprovalDropdown}
              >
                <i className="bi bi-clipboard-check"></i> Approval
              </Link>
            )}

            <div
              className={`dropdown-menu bg-transparent border-0 ${isApprovalOpen ? "show" : ""
                }`}
            >
              <Link
                to="/cash-deposit"
                className={`dropdown-item ms-3 ${isActive("/cash-deposit") ? "active" : ""
                  }`}
              >
                <i className="bi bi-cash-stack me-2"></i> Cash Deposit
              </Link>
              <Link
                to="/cheque-deposit"
                className={`dropdown-item ms-3 ${isActive("/cheque-deposit") ? "active" : ""
                  }`}
              >
                <i className="bi bi-credit-card me-2"></i> Cheque Deposit
              </Link>
              <Link
                to="/booking-authorization"
                className={`dropdown-item ms-3 ${isActive("/booking-authorization") ? "active" : ""
                  }`}
              >
                <i className="bi bi-check-circle me-2"></i> Booking
                Authorization
              </Link>
            </div>
          </div>
          {permissions.length === 0 && (
            <Link
              to="/report"
              className={`nav-item nav-link ${isActive("/report") ? "active" : ""
                }`}
            >
              <i className="bi bi-bar-chart"></i> Report
            </Link>
          )}

          {permissions.length === 0 && (
            <Link
              to="/role"
              className={`nav-item nav-link ${isActive("/role") ? "active" : ""
                }`}
            >
              <i className="bi bi-person-badge"></i> Role
            </Link>
          )}
          {permissions.length === 0 && (
            <Link
              to="/permission"
              className={`nav-item nav-link ${isActive("/role") ? "active" : ""
                }`}
            >
              <i class="fas fa-shield-alt"></i>
              Permission
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
