// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const Expenses = () => {
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
        <title>React Estate | Expenses</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between   mb-3">
                    <div className="p-2 ">
                      <h6 className="mb-4">Expenses</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/add-expenses" className="">
                        <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> Add New Expense</h6>
                      </Link>
                    </div>
                  </div>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Voucher Expense Date</th>
                        <th scope="col">Expense Head</th>
                        <th scope="col">Narration</th>
                        <th scope="col">Amount</th>
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
      </div>
    </>
  );
};

export default Expenses;
