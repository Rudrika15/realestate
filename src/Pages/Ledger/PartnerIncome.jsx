// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const PartnerIncome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Partner Income</title>
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
                    <div className="">
                      <h6 className="">Partner Income</h6>
                    </div>
                    <div className="">
                      <button
                        className="shadow-sm"
                        style={{
                          border: "none",
                          backgroundColor: "#a2bdba",
                          borderRadius: "0.3rem",
                          marginRight: '1rem'
                        }}
                      >
                        <a>Income</a>
                      </button>
                      <Link to="/partner-reimbursement">
                        <button
                          className="shadow-sm"
                          style={{
                            border: "none",
                            backgroundColor: "#a2bdba",
                            borderRadius: "0.3rem",
                          }}
                        >
                          <a>Reimbursement</a>
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="p-2 ">
                    </div>
                    <div className="p-2 ">
                      <Link to="/add-partner-income" className="">
                        <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> Add Partner Income</h6>
                      </Link>
                    </div>
                  </div>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Income Date</th>
                        <th scope="col">Payment Mode</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Remark</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <button className="btn btn-warning btn-sm me-2">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-danger btn-sm">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <button className="btn btn-warning btn-sm me-2">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-danger btn-sm">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <button className="btn btn-warning btn-sm me-2">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-danger btn-sm">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div >
    </>
  );
};

export default PartnerIncome;
