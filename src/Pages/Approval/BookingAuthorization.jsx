// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const BookingAuthorization = () => {
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
        <title>React Estate | Booking Authorization</title>
      </Helmet>
      <div classNameName="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div classNameName={`content ${isSidebarOpen ? 'open' : ''}`}>
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="">
                      <h6 className="">Booking Authorization</h6>
                    </div>
                  </div>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Unit No</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Sale Deed Amount</th>
                        <th scope="col">Extra Work Amount</th>
                        <th scope="col">Changes</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check1">
                            <input className="form-check-input1" type="checkbox" value="" id="flexCheckDefault" />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="btn-group" role="group" aria-label="Action Buttons">
                            <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#f0e4ee', color: "black" }}>Accept</button>
                            <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#e4edd1', color: "black", marginLeft: '0.5rem' }}>Reject</button>
                            <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#ccdedc', color: "black", marginLeft: '0.5rem' }}>View</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check1">
                            <input className="form-check-input1" type="checkbox" value="" id="flexCheckDefault" />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="btn-group" role="group" aria-label="Action Buttons">
                            <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#f0e4ee', color: "black" }}>Accept</button>
                            <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#e4edd1', color: "black", marginLeft: '0.5rem' }}>Reject</button>
                            <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#ccdedc', color: "black", marginLeft: '0.5rem' }}>View</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check1">
                            <input className="form-check-input1" type="checkbox" value="" id="flexCheckDefault" />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="btn-group" role="group" aria-label="Action Buttons">
                            <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#f0e4ee', color: "black" }}>Accept</button>
                            <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#e4edd1', color: "black", marginLeft: '0.5rem' }}>Reject</button>
                            <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#ccdedc', color: "black", marginLeft: '0.5rem' }}>View</button>
                          </div>
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

export default BookingAuthorization;
