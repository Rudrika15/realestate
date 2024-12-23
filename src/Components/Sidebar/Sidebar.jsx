import React, { useState, useEffect } from 'react';
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
            if (!event.target.closest('.nav-item.dropdown')) {
                setIsBookingOpen(false);
                setIsLedgerOpen(false);
                setIsApprovalOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className={`sidebar pe-5 pb-2 ${isSidebarOpen ? 'open' : ''}`}>
            <nav className="navbar bg-light navbar-light">
                <a href="#" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary">REAL-ESTATE</h3>
                </a>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img
                            className="user-image"
                            src="img/user.jpg"
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
                        to="/view-user"
                        className={`nav-item nav-link ${isActive('/view-user') ? 'active' : ''}`}
                    >
                        <i className="bi bi-person-square"></i> User
                    </Link>
                    <Link
                        to="/projects"
                        className={`nav-item nav-link ${isActive('/projects') ? 'active' : ''}`}
                    >
                        <i className="bi bi-kanban"></i> Projects
                    </Link>
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className={`nav-link dropdown-toggle ${isBookingActive() ? 'active' : ''}`}
                            onClick={toggleBookingDropdown}
                        >
                            <i className="bi bi-calendar"></i> Booking
                        </a>
                        <div
                            className={`dropdown-menu bg-transparent border-0 ${isBookingOpen ? 'show' : ''}`}
                        >
                            <Link
                                to="/view-booking"
                                className={`dropdown-item ms-4 ${isActive('/view-booking') ? 'active' : ''}`}                        >
                                <i className="bi bi-eye me-2"></i> View Bookings
                            </Link>
                            <Link
                                to="/cancelled-booking"
                                className={`dropdown-item ms-4 ${isActive('/cancelled-booking') ? 'active' : ''}`}                        >
                                <i className="bi bi-x-circle me-2"></i> Cancelled Bookings
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
                            className={`nav-link dropdown-toggle ${isLedgerActive() ? 'active' : ''}`}
                            onClick={toggleLedgerDropdown}
                        >
                            <i className="bi bi-clipboard-data"></i> Ledger
                        </a>
                        <div
                            className={`dropdown-menu bg-transparent border-0 ${isLedgerOpen ? 'show' : ''}`}
                        >
                            <Link
                                to="/partner-income"
                                className={`dropdown-item ms-4 ${isActive('/partner-income') ? 'active' : ''}`}                        >
                                <i className="bi bi-person-circle me-2"></i> Partner
                            </Link>
                            <Link
                                to="/customer-income"
                                className={`dropdown-item ms-4 ${isActive('/customer-income') ? 'active' : ''}`}                        >
                                <i className="bi bi-person-lines-fill me-2"></i> Customer
                            </Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className={`nav-link dropdown-toggle ${isApprovalActive() ? 'active' : ''}`}
                            onClick={toggleApprovalDropdown}
                        >
                            <i className="bi bi-clipboard-check"></i> Approval
                        </a>
                        <div
                            className={`dropdown-menu bg-transparent border-0 ${isApprovalOpen ? 'show' : ''}`}
                        >
                            <Link
                                to="/cash-deposit"
                                className={`dropdown-item ms-4 ${isActive('/cash-deposit') ? 'active' : ''}`}                        >
                                <i className="bi bi-cash-stack me-2"></i> Cash Deposit
                            </Link>
                            <Link
                                to="/cheque-deposit"
                                className={`dropdown-item ms-4 ${isActive('/cheque-deposit') ? 'active' : ''}`}                        >
                                <i className="bi bi-credit-card me-2"></i> Cheque Deposit
                            </Link>
                            <Link
                                to="/booking-authorization"
                                className={`dropdown-item ms-4 ${isActive('/booking-authorization') ? 'active' : ''}`}                        >
                                <i className="bi bi-check-circle me-2"></i> Booking Authorization
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
                        <i className="bi bi-person"></i> Role
                    </Link>
                </div>
            </nav>
            <style jsx="true">{`
                .user-image {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                .dropdown-item{
                    fontSize: 14px;
                    fontFamily: Arial, sans-serif;
                }
            `}</style >
        </div>
    );
};

export default Sidebar;
