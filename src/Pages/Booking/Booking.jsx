// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {
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

        <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="">
                      <h6 className="">Booking</h6>
                    </div>
                    <div class="">
                      <Link to="/view-booking" class="btn">
                        <i className="bi bi-arrow-left-circle-fill"></i>
                        &nbsp; Back
                      </Link>
                    </div>
                  </div>
                  <form>
                    <p style={{ fontSize: '1.3rem', color: 'black' }}>Project Details</p>
                    <div className="row">
                      <div className="col">
                        <select className="form-select mb-3" aria-label="Default select example">
                          <option selected>Project Name</option>
                        </select>
                      </div>
                      <div className="col">
                        <select className="form-select mb-3" aria-label="Default select example">
                          <option selected>Unit No</option>
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
                    <p className='pt-3' style={{ fontSize: '1.3rem', color: 'black' }}>Customer Details</p>
                    <div className="row">
                      <div className="col">
                        <input type="text" className="form-control" id="name" placeholder="Name" name="name" />
                      </div>
                      <div className="col">
                        <input type="number" className="form-control" id="Contact No" placeholder="Contact No" name="Contact No" />
                      </div>
                    </div>
                    <div className="row w-75">
                      <div className="col pt-4">
                        <div className="form-floating">
                          <textarea className="form-control" placeholder="Address" id="floatingTextarea"></textarea>
                          <label for="floatingTextarea">Address</label>
                        </div>
                      </div>
                    </div>
                    <p className='pt-3' style={{ fontSize: '1.3rem', color: 'black' }}>Payment Details</p>
                    <div className="row">
                      <div className="col">
                        <input type="text" className="form-control" id="Sale Deed Amount" placeholder="Sale Deed Amount" Sale Deed Amount="name" />
                      </div>
                      <div className="col">
                        <input type="number" className="form-control" id="Extra Work Amount" placeholder="Extra Work Amount" name="Extra Work Amount" />
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input type="text" className="form-control" id="Other Work Amount" placeholder="Other Work Amount" name="Other Work Amount" />
                      </div>
                      <div className="col">
                      </div>
                    </div>
                    <p className='pt-3' style={{ fontSize: '1.3rem', color: 'black' }}>Payment Terms</p>
                    <div className="row">
                      <div className="col">
                        <input type="text" className="form-control" id="Down Payment" placeholder="Down Payment" name="Down Payment" />
                      </div>
                      <div className="col">
                        <select className="form-select mb-3" aria-label="Default select example">
                          <option selected>Payment Duration</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-check pt-2" style={{ marginLeft: '1rem' }}>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <label className="form-check-label" for="flexRadioDefault1">
                        Loan
                      </label>
                    </div>
                    <div className="form-check pt-2" style={{ marginLeft: '1rem' }}>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <label className="form-check-label" for="flexRadioDefault1">
                        Installment
                      </label>
                    </div>
                    <div className="form-check pt-3">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Installment Notify
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
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

export default Booking;
