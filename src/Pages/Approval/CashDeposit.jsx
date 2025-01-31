import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Allpermissions from "../Common component/Allpermissions";

const CashDeposit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const [permissions, setPermissions] = useState([]);
  const hasPermission = (permission) => permissions.includes(permission);

  const [cashDepositData, setCashDepositData] = useState([
    {
      id: 1,
      incomeDate: "2025-01-01",
      projectName: "Project A",
      unitNo: "Unit 101",
      customerName: "shiv",
      amount: "5000",
    },
  ]);

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
    console.log(
      `Cancel action confirmed for row ${selectedRow} with reason: ${cancellationReason}`
    );
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
      title: "Action Accepted!",
      text: "You have accepted this action.",
      icon: "success",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      customClass: {
        popup: "swal-popup",
      },
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cashDepositData.map((deposit) => deposit.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      const remainingData = cashDepositData.filter(
        (deposit) => !selectedItems.includes(deposit.id)
      );
      setCashDepositData(remainingData);
      setSelectedItems([]);
      Swal.fire({
        title: "Deleted!",
        text: "Selected deposits have been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "No Selection!",
        text: "Please select items to delete.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Cash Deposit</title>
      </Helmet>
      <Allpermissions onFetchPermissions={setPermissions} />

      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <Topbar
            toggleSidebar={toggleSidebar}
            isTopbarOpen={isTopbarOpen}
            toggleTopbar={toggleTopbar}
          />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="">Cash Deposit</h6>
                    {hasPermission("all-delete-cash-deposit") && (
                      <button
                        className="btn btn-primary"
                        onClick={handleDeleteSelected}
                      >
                        Delete All
                      </button>
                    )}
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th scope="col">
                            <input
                              type="checkbox"
                              onChange={handleSelectAll}
                              checked={
                                selectedItems.length === cashDepositData.length
                              }
                            />
                          </th>
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
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(deposit.id)}
                                onChange={() => handleSelectItem(deposit.id)}
                              />
                            </td>
                            <td>{deposit.incomeDate}</td>
                            <td>{deposit.projectName}</td>
                            <td>{deposit.unitNo}</td>
                            <td>{deposit.customerName}</td>
                            <td>{deposit.amount}</td>
                            <td>
                              <div className="btn-group" role="group">
                                {hasPermission("check-cash-deposit") && (
                                  <Link
                                    to=""
                                    type="button"
                                    className="btn shadow-sm text-dark accept-btn"
                                    onClick={handleAccept}
                                  >
                                    <i className="bi bi-check-circle"></i>
                                  </Link>
                                )}
                                {hasPermission("one-delete-cash-deposit") && (
                                  <button
                                    type="button"
                                    className="btn shadow-sm text-dark reject-btn"
                                    onClick={() => handleCancel(deposit.id)}
                                  >
                                    <i className="bi bi-x-circle"></i>
                                  </button>
                                )}
                                {hasPermission("eye-cash-deposit") && (
                                  <Link
                                    to=""
                                    type="button"
                                    className="btn shadow-sm text-dark view-btn"
                                  >
                                    <i className="bi bi-eye"></i>
                                  </Link>
                                )}
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
      </div>

      {isModalOpen && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Cancellation</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel this action?</p>
                <div className="mb-3">
                  <label htmlFor="cancellationReason" className="form-label">
                    Reason for cancellation:
                  </label>
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
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
