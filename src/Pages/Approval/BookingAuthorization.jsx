import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} className="d-none d-lg-block" />

        <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} className="d-lg-none" />

          <div className="container-fluid pt-4 px-3 px-md-4">
            <div className="row g-3 g-lg-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Booking Authorization</h6>
                  </div>
                  <div className="table-responsive">
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
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
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
                              <Link to="" type="button" className="btn shadow-sm text-dark accept-btn">
                              <i class="bi bi-check-circle"></i>
                              </Link>
                              <Link to="" type="button" className="btn shadow-sm text-dark reject-btn">
                              <i class="bi bi-x-circle"></i>
                              </Link>
                              <Link to="" type="button" className="btn shadow-sm text-dark view-btn">
                              <i class="bi bi-eye"></i> 
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
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
                              <Link to="" type="button" className="btn shadow-sm text-dark accept-btn">
                              <i class="bi bi-check-circle"></i>
                              </Link>
                              <Link to="" type="button" className="btn shadow-sm text-dark reject-btn">
                              <i class="bi bi-x-circle"></i>
                              </Link>
                              <Link to="" type="button" className="btn shadow-sm text-dark view-btn">
                              <i class="bi bi-eye"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
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
                              <Link to="" type="button" className="btn shadow-sm text-dark accept-btn">
                              <i class="bi bi-check-circle"></i>
                              </Link>
                              <Link to="" type="button" className="btn shadow-sm text-dark reject-btn">
                              <i class="bi bi-x-circle"></i>
                              </Link>
                              <Link to="" type="button" className="btn shadow-sm text-dark view-btn">
                              <i class="bi bi-eye"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
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

export default BookingAuthorization;
