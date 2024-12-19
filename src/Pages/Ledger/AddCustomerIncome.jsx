// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const AddCustomerIncome = () => {
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
        <title>React Estate | Add Customer Income</title>
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
                      <h6 className="">Add Customer Income</h6>
                    </div>
                    <div class="">
                      <Link to="/customer-income" className="btn">
                        <i className="bi bi-arrow-left-circle-fill"></i>
                        &nbsp; Back
                      </Link>
                    </div>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col">
                        <input type="text" className="form-control" id="Customer Name" placeholder="Customer Name" name="Customer Name" />
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="Unit No" placeholder="Unit No" name="Unit No" />
                      </div>
                    </div>
                    <div className="row w-75">
                      <div className="col pt-3">
                        <div className="form-floating">
                          <textarea className="form-control" placeholder="Address" id="floatingTextarea"></textarea>
                          <label for="floatingTextarea">Address</label>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <input type="text" className="form-control" id="Sale Deed Price" placeholder="Sale Deed Price" name="Sale Deed Price" />
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="Status" placeholder="Status" name="Status" />
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <div className="input-wrapper position-relative">
                          <input
                            type="date"
                            id="date"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="input-wrapper position-relative">
                          <input
                            type="date"
                            id="date"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <input type="text" className="form-control" id="Amount" placeholder="Amount" name="Amount" />
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row pt-3">
                      <p>Payment Mode</p>
                      <div className="form-check" style={{ marginLeft: '1rem' }}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Cash
                        </label>
                      </div>
                      <div className="form-check pt-2" style={{ marginLeft: '1rem' }}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Cheque
                        </label>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <input type="text" className="form-control" id="Check No" placeholder="Check No" name="Check No" />
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <select className="form-select mb-3 w-50" aria-label="Default select example">
                          <option selected>Bank</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="file" className="form-label">Upload Check : </label>
                      <input type="file" className="form-control" id="check" aria-describedby="check" />
                      <div id="check" className="form-text">
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </form>
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

export default AddCustomerIncome;
