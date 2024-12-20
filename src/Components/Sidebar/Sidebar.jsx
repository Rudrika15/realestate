import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isLedgerOpen, setIsLedgerOpen] = useState(false);
    const [isApprovalOpen, setIsApprovalOpen] = useState(false);

    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const isBookingActive = () =>
        ['/view-booking', '/cancelled-booking'].includes(location.pathname);

    const isLedgerActive = () =>
        ['/partner-income', '/customer-income'].includes(location.pathname);

    const isApprovalActive = () =>
        ['/cash-deposit', '/cheque-deposit', '/booking-authorization'].includes(location.pathname);

    const toggleBookingDropdown = () => setIsBookingOpen(!isBookingOpen);
    const toggleLedgerDropdown = () => setIsLedgerOpen(!isLedgerOpen);
    const toggleApprovalDropdown = () => setIsApprovalOpen(!isApprovalOpen);

    return (
        <div className={`sidebar pe-4 pb-3 ${isSidebarOpen ? 'open' : ''}`}>
            <nav className="navbar bg-light navbar-light">
                <a href="" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary">
                        <i className="fa fa-hashtag me-2"></i>DASHMIN
                    </h3>
                </a>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img
                            className="rounded-circle"
                            src="img/user.jpg"
                            alt="User"
                            style={{ width: '40px', height: '40px' }}
                        />
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">Jhon Doe</h6>
                        <span>Admin</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <Link
                        to="/projects"
                        className={`nav-item nav-link ${isActive('/projects') ? 'active' : ''}`}
                    >
                        <i className="bi bi-kanban"></i> Projects
                    </Link>
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className={`nav-link dropdown-toggle ${isBookingActive() ? 'active' : ''
                                }`}
                            onClick={toggleBookingDropdown}
                        >
                            <i className="bi bi-calendar"></i> Booking
                        </a>
                        <div
                            className={`dropdown-menu bg-transparent border-0 ${isBookingOpen ? 'show' : ''
                                }`}
                        >
                            <Link
                                to="/view-booking"
                                className={`dropdown-item ms-5 ${isActive('/view-booking') ? 'active' : ''
                                    }`}
                                style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                            >
                                View Bookings
                            </Link>
                            <Link
                                to="/cancelled-booking"
                                className={`dropdown-item ms-5 ${isActive('/cancelled-booking') ? 'active' : ''
                                    }`}
                                style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                            >
                                Cancelled Bookings
                            </Link>
                        </div>
                    </div>
                    <Link
                        to="/partners"
                        className={`nav-item nav-link ${isActive('/partners') ? 'active' : ''}`}
                    >
                        <i className="bi bi-people"></i> Partners
                    </Link>
                    <Link
                        to="/expenses"
                        className={`nav-item nav-link ${isActive('/expenses') ? 'active' : ''}`}
                    >
                        <i className="bi bi-receipt-cutoff"></i> Expenses
                    </Link>
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className={`nav-link dropdown-toggle ${isLedgerActive() ? 'active' : ''
                                }`}
                            onClick={toggleLedgerDropdown}
                        >
                            <i className="bi bi-clipboard-data"></i> Ledger
                        </a>
                        <div
                            className={`dropdown-menu bg-transparent border-0 ${isLedgerOpen ? 'show' : ''
                                }`}
                        >
                            <Link
                                to="/partner-income"
                                className={`dropdown-item ms-5 ${isActive('/partner-income') ? 'active' : ''
                                    }`}
                                style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                            >
                                Partner
                            </Link>
                            <Link
                                to="/customer-income"
                                className={`dropdown-item ms-5 ${isActive('/customer-income') ? 'active' : ''
                                    }`}
                                style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                            >
                                Customer
                            </Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className={`nav-link dropdown-toggle ${isApprovalActive() ? 'active' : ''
                                }`}
                            onClick={toggleApprovalDropdown}
                        >
                            <i className="bi bi-clipboard-check"></i> Approval
                        </a>
                        <div
                            className={`dropdown-menu bg-transparent border-0 ${isApprovalOpen ? 'show' : ''
                                }`}
                        >
                            <Link
                                to="/cash-deposit"
                                className={`dropdown-item ms-5 ${isActive('/cash-deposit') ? 'active' : ''
                                    }`}
                                style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                            >
                                Cash Deposit
                            </Link>
                            <Link
                                to="/cheque-deposit"
                                className={`dropdown-item ms-5 ${isActive('/cheque-deposit') ? 'active' : ''
                                    }`}
                                style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                            >
                                Cheque Deposit
                            </Link>
                            <Link
                                to="/booking-authorization"
                                className={`dropdown-item ms-5 ${isActive('/booking-authorization') ? 'active' : ''
                                    }`}
                                style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                            >
                                Booking
                            </Link>
                        </div>
                    </div>
                    <Link
                        to="/report"
                        className={`nav-item nav-link ${isActive('/report') ? 'active' : ''}`}
                    >
                        <i className="bi bi-graph-up"></i> Report
                    </Link>
                    <Link
                        to="/role"
                        className={`nav-item nav-link ${isActive('/role') ? 'active' : ''}`}
                    >
                        <i class="bi bi-person"></i> Role
                    </Link>
                    <Link
                        to="/view-user"
                        className={`nav-item nav-link ${isActive('/view-user') ? 'active' : ''}`}
                    >
                        <i class="bi bi-person-square"></i> User
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
