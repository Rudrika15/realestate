import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Allpermissions from "../Common component/Allpermissions";

const ChequeDeposit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [permissions, setPermissions] = useState([]);
  const hasPermission = (permission) => permissions.includes(permission);

  const [cashDepositData, setCashDepositData] = useState([
    {
      id: 1,
      incomeDate: "2025-01-15",
      projectName: "Project A",
      unitNo: "101",
      customerName: "John Doe",
      amount: "5000",
      chequeNo: "123456",
      bankName: "Bank A",
    },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleAccept = () => {
    toast.success("Cheque Accepted!");
  };

  const handleCancel = (id) => {
    toast.error("Cheque Rejected!");
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
        <title>React Estate | Cheque Deposit</title>
      </Helmet>
      <Allpermissions onFetchPermissions={setPermissions} />

      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} className="d-none d-lg-block" />

        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <Topbar
            toggleSidebar={toggleSidebar}
            isTopbarOpen={isTopbarOpen}
            toggleTopbar={toggleTopbar}
            className="d-lg-none"
          />

          <div className="container-fluid pt-4 px-3 px-md-4">
            <div className="row g-3 g-lg-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Cheque Deposit</h6>
                    {hasPermission("all-delete-cheque-deposit") && (
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
                          <th scope="col"></th>
                          <th scope="col">Income Date</th>
                          <th scope="col">Project Name</th>
                          <th scope="col">Unit No</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Cheque No</th>
                          <th scope="col">Bank Name</th>
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
                            <td>{deposit.chequeNo}</td>
                            <td>{deposit.bankName}</td>
                            <td>
                              <div className="btn-group" role="group">
                                {hasPermission("check-cheque-deposit") && (
                                  <Link
                                    to="#"
                                    type="button"
                                    className="btn shadow-sm text-dark accept-btn"
                                    onClick={handleAccept}
                                  >
                                    <i className="bi bi-check-circle"></i>
                                  </Link>
                                )}
                                {hasPermission("one-delete-cheque-deposit") && (
                                  <button
                                    type="button"
                                    className="btn shadow-sm text-dark reject-btn"
                                    onClick={() => handleCancel(deposit.id)}
                                  >
                                    <i className="bi bi-x-circle"></i>
                                  </button>
                                )}
                                {hasPermission("eye-cheque-deposit") && (
                                  <Link
                                    to="#"
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
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};

export default ChequeDeposit;
