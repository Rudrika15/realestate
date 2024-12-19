// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

const ViewBooking = () => {
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
        <title>React Estate | Booking</title>
      </Helmet>
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
                  <div class="d-flex justify-content-between   mb-3">
                    <div class="p-2 ">
                      <h6 className="mb-4">Booking</h6>
                    </div>
                    <div class="p-2 ">
                      <Link to="/booking" className="">
                        <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> Add New Booking</h6>
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th scope="col">Unit No</th>
                          <th scope="col">Booking Date</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Sale Deed Amount</th>
                          <th scope="col">Received SD Amount</th>
                          <th scope="col">Pending SD Amount</th>
                          <th scope="col">Extra Work Amount</th>
                          <th scope="col">Received EW Amount</th>
                          <th scope="col">Pending EW Amount</th>
                          <th scope="col">Other Work Amount</th>
                          <th scope="col">Received OT Amount</th>
                          <th scope="col">Pending OT Amount</th>
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
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/view-cancelled-booking">
                              <button
                                type="button"
                                className="btn shadow-sm"
                                style={{
                                  backgroundColor: "#a2bdba",
                                  color: "black",
                                }}
                              >
                                Action
                              </button>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/view-cancelled-booking">
                              <button
                                type="button"
                                className="btn shadow-sm"
                                style={{
                                  backgroundColor: "#a2bdba",
                                  color: "black",
                                }}
                              >
                                Action
                              </button>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/view-cancelled-booking">
                              <button
                                type="button"
                                className="btn shadow-sm"
                                style={{
                                  backgroundColor: "#a2bdba",
                                  color: "black",
                                }}
                              >
                                Action
                              </button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

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

export default ViewBooking;
