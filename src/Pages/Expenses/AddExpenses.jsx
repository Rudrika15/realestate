// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const AddExpenses = () => {
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
        <title>React Estate | Voucher Expense</title>
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
                    <div className="p-2 ">
                      <h6 className="mb-4">Voucher Expense</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/expenses" className="">
                        <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
                      </Link>
                    </div>
                  </div>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Name</th>
                        <th scope="col">Expense Head</th>
                        <th scope="col">Narration</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select className="form-select">
                            <option selected>Shiv</option>
                          </select>
                        </td>
                        <td><input type="text" className="form-control" value="Khilen Maniyar" /></td>
                        <td>
                          <select className="form-select">
                            <option selected>Construction Materials</option>
                          </select>
                        </td>
                        <td>
                          <input type="text" className="form-control" value="Expense For Purchasing....." />
                        </td>
                        <td><input type="text" className="form-control" value="15,00,000" /></td>
                        <td><i
                          className="bi bi-x-circle-fill"
                          style={{
                            color: '#eb3423',
                            cursor: 'pointer',
                            fontSize: '1.3rem'
                          }}>
                        </i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="form-select">
                            <option selected>Mahadev</option>
                          </select>
                        </td>
                        <td><input type="text" className="form-control" value="Jigar Parmar" /></td>
                        <td>
                          <select className="form-select">
                            <option selected>Utilities</option>
                          </select>
                        </td>
                        <td>
                          <input type="text" className="form-control" value="Expense For Purchasing....." />
                        </td>
                        <td><input type="text" className="form-control" value="5,00,000" /></td>
                        <td className="text-center action-buttons">
                          <i
                            className="bi bi-x-circle-fill"
                            style={{
                              color: '#eb3423',
                              cursor: 'pointer',
                              fontSize: '1.3rem'
                            }}>
                          </i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="form-select">
                            <option selected>Ganesh</option>
                          </select>
                        </td>
                        <td><input type="text" className="form-control" value="Jinal Pujara" /></td>
                        <td>
                          <select className="form-select">
                            <option selected>Site Preparation</option>
                          </select>
                        </td>
                        <td>
                          <input type="text" className="form-control" value="Expense For Purchasing....." />
                        </td>
                        <td><input type="text" className="form-control" value="14,00,000" /></td>
                        <td className="text-center action-buttons">
                          <i
                            className="bi bi-x-circle-fill"
                            style={{
                              color: '#eb3423',
                              cursor: 'pointer',
                              fontSize: '1.3rem',
                              marginRight: '7px'
                            }}>
                          </i>
                          <i
                            className="bi bi-plus-circle-fill"
                            style={{
                              color: 'black',
                              cursor: 'pointer',
                              fontSize: '1.3rem'
                            }}
                          ></i>
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

export default AddExpenses;
