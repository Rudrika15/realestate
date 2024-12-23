// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const AddPartnerReimbursment = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [reimbursmentDate, setReimbursmentDate] = useState("");


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
        <title>React Estate | Add Partner Reimbursement</title>
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
                      <h6 className="mb-4">Add Partner Reimbursement</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/partner-reimbursement" className="">
                        <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
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
                    <div className="row">
                      <div className="col pt-2">
                        <div className="input-wrapper position-relative">
                          <input
                          type="text"
                          id="date"
                          className="form-control"
                          value={
                            reimbursmentDate
                              ? new Date(reimbursmentDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                              })
                              : ""
                          }
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [day, month, year] = inputDate.split("-");
                            if (day && month && year) {
                              const formattedDate = `${day}-${month}-${year}`;
                              const parsedDate = new Date(formattedDate);
                              if (!isNaN(parsedDate)) {
                                setReimbursmentDate(parsedDate.toISOString().slice(0, 10));
                              } else {
                                console.error("Invalid date format");
                              }
                            }
                          }}
                          placeholder="Reimbursment Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                        </div>
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row pt-2">
                      <p>Payment Mode</p>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Cash
                        </label>
                      </div>
                      <div className="form-check pt-2">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Cheque
                        </label>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <select className="form-select mb-3 w-50" aria-label="Default select example">
                          <option selected>Reimbursement Type</option>
                        </select>
                      </div>
                    </div>
                    <div className="row w-50">
                      <div className="col pt-1">
                        <input type="text" className="form-control" id="amount" placeholder="Amount" name="amount" />
                      </div>
                    </div>
                    <div className="row w-75">
                      <div className="col pt-3">
                        <textarea className="form-control" placeholder="Remark" id="floatingTextarea"></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Save</button>
                    <style jsx="true">{`
                   .form-check {
                      margin-left: 1rem;
                    }
                    `}</style >
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

export default AddPartnerReimbursment;
