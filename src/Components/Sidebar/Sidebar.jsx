import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isLedgerOpen, setIsLedgerOpen] = useState(false);
    const [isApprovalOpen, setIsApprovalOpen] = useState(false);

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
                    <Link to="/Projects" className="nav-item nav-link">
                        <i className="bi bi-kanban"></i> Projects
                    </Link>
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className="nav-link dropdown-toggle"
                            onClick={toggleBookingDropdown}
                        >
                            <i className="bi bi-calendar"></i> Booking
                        </a>
                        <div className={`dropdown-menu bg-transparent border-0 ${isBookingOpen ? 'show' : ''}`}>
                            <Link to="/ViewBooking" className="dropdown-item">View Bookings</Link>
                            <Link to="/CancelledBooking" className="dropdown-item">Cancelled Bookings</Link>
                        </div>
                    </div>
                    <Link to="/Partners" className="nav-item nav-link">
                        <i className="bi bi-people"></i> Partners
                    </Link>
                    <Link to="/Expenses" className="nav-item nav-link">
                        <i className="bi bi-receipt-cutoff"></i> Expenses
                    </Link>
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className="nav-link dropdown-toggle"
                            onClick={toggleLedgerDropdown}
                        >
                            <i className="bi bi-clipboard-data"></i> Ledger
                        </a>
                        <div className={`dropdown-menu bg-transparent border-0 ${isLedgerOpen ? 'show' : ''}`}>
                            <Link to="/PartnerIncome" className="dropdown-item">Partner</Link>
                            <Link to="/CustomerIncome" className="dropdown-item">Customer</Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className="nav-link dropdown-toggle"
                            onClick={toggleApprovalDropdown}
                        >
                            <i className="bi bi-clipboard-check"></i> Approval
                        </a>
                        <div className={`dropdown-menu bg-transparent border-0 ${isApprovalOpen ? 'show' : ''}`}>
                            <Link to="/CashDeposit" className="dropdown-item">Cash Deposit</Link>
                            <Link to="/ChequeDeposit" className="dropdown-item">Cheque Deposit</Link>
                            <Link to="/Booking" className="dropdown-item">Booking</Link>
                        </div>
                    </div>
                    <Link to="/Report" className="nav-item nav-link">
                        <i className="bi bi-graph-up"></i> Report
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
