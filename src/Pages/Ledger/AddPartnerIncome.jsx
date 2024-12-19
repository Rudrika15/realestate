// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const AddPartnerIncome = () => {
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
        <title>React Estate | Add Partner Income</title>
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
                      <h6 className="">Add Partner Income</h6>
                    </div>
                    <div class="">
                      <Link to="/partner-income" className="btn">
                        <i className="bi bi-arrow-left-circle-fill"></i>
                        &nbsp; Back
                      </Link>
                    </div>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col">
                        <select className="form-select mb-3 w-50" aria-label="Default select example">
                          <option selected>Partner</option>
                        </select>
                      </div>
                    </div>
                    <div className="row w-50">
                      <div className="col pt-2">
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
                    <div className="row w-50">
                      <div className="col pt-3">
                        <input type="text" className="form-control" id="amount" placeholder="Amount" name="amount" />
                      </div>
                    </div>
                    <div className="row w-75">
                      <div className="col pt-3">
                        <div className="form-floating">
                          <textarea className="form-control" placeholder="Remark" id="floatingTextarea"></textarea>
                          <label for="floatingTextarea">Remark</label>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Save</button>
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

export default AddPartnerIncome;
