import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';  

const CashDeposit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");

  // Example array of cash deposit data
  const cashDepositData = [
    {
      id: 1,
      incomeDate: '2025-01-01',
      projectName: 'Project A',
      unitNo: 'Unit 101',
      customerName: 'shiv',
      amount: 1000
    },
    {
      id: 2,
      incomeDate: '2025-01-02',
      projectName: 'Project B',
      unitNo: 'Unit 202',
      customerName: 'shiv',
      amount: 1500
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const handleCancel = (rowId) => {
    setSelectedRow(rowId);
    setIsModalOpen(true);
  };

  const confirmCancel = () => {
    console.log(`Cancel action confirmed for row ${selectedRow} with reason: ${cancellationReason}`);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReasonChange = (e) => {
    setCancellationReason(e.target.value);
  };

  const handleAccept = () => {
    Swal.fire({
      title: 'Action Accepted!',
      text: 'You have accepted this action.',
      icon: 'success',
      confirmButtonText: 'OK',
      allowOutsideClick: false,  
      customClass: {
        popup: 'swal-popup',  
      },
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success', 
    });
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Cash Deposit</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="">Cash Deposit</h6>
                  </div>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Income Date</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Unit No</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cashDepositData.map((deposit) => (
                        <tr key={deposit.id}>
                          <td>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id={`flexCheck${deposit.id}`} />
                            </div>
                          </td>
                          <td>{deposit.incomeDate}</td>
                          <td>{deposit.projectName}</td>
                          <td>{deposit.unitNo}</td>
                          <td>{deposit.customerName}</td>
                          <td>{deposit.amount}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <Link to="" type="button" className="btn shadow-sm text-dark accept-btn" onClick={handleAccept}>
                                <i className="bi bi-check-circle"></i>
                              </Link>
                              <button
                                type="button"
                                className="btn shadow-sm text-dark reject-btn"
                                onClick={() => handleCancel(deposit.id)}
                              >
                                <i className="bi bi-x-circle"></i>
                              </button>
                              <Link to="" type="button" className="btn shadow-sm text-dark view-btn">
                                <i className="bi bi-eye"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Cancellation</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel this action?</p>
                <div className="mb-3">
                  <label htmlFor="cancellationReason" className="form-label">Reason for cancellation:</label>
                  <textarea
                    id="cancellationReason"
                    className="form-control"
                    rows="3"
                    value={cancellationReason}
                    onChange={handleReasonChange}
                    placeholder="Please provide a reason for cancellation"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmCancel}
                  disabled={!cancellationReason.trim()}
                >
                  Cancel Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CashDeposit;
