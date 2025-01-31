import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

const AddPartnerIncome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [incomeDate, setIncomeDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    let isValid = true;
    const validationErrors = {};
  }

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Add Partner Income</title>
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
                  <div className="d-flex justify-content-between mb-3">
                    <div className="p-2 ">
                      <h6 className="mb-4">Add Partner Income</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/partner-income">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col">
                        <select
                          className="form-select mb-3 "
                          aria-label="Default select example"
                        >
                          <option selected>Partner</option>
                        </select>
                        
                      </div>
                      <div className="col ">
                        <div className="input-wrapper position-relative">
                          <input
                            type="text"
                            id="date"
                            className="form-control"
                            value={
                              incomeDate
                                ? new Date(incomeDate).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "2-digit",
                                    }
                                  )
                                : ""
                            }
                            onChange={(e) => setIncomeDate(e.target.value)}
                            placeholder="Income Date"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="row">
                      
                      <div className="col"></div>
                    </div> */}

                    <div className="row pt-2 ">
                      <p>Payment Mode</p>
                      <div className="d-flex item-center justify-content-start align-items-center">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMode"
                            id="cash"
                            value="Cash"
                            onChange={(e) => setPaymentMode(e.target.value)}
                          />
                          <label
                            className="form-check-label ms-1"
                            htmlFor="cash"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMode"
                            id="cheque"
                            value="Cheque"
                            onChange={(e) => setPaymentMode(e.target.value)}
                          />
                          <label
                            className="form-check-label ms-1"
                            htmlFor="cheque"
                          >
                            Cheque
                          </label>
                        </div>
                      </div>
                    </div>
                    {paymentMode === "Cheque" && (
                      <div className="row pt-3">
                        <div className="col-md-4">
                          <div className="input-wrapper position-relative">
                            <input
                              type="text"
                              id="date"
                              className="form-control"
                              value={
                                chequeDate
                                  ? new Date(chequeDate).toLocaleDateString(
                                      "en-GB",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "2-digit",
                                      }
                                    )
                                  : ""
                              }
                              onChange={(e) => setChequeDate(e.target.value)}
                              placeholder="Cheque Date"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                            />
                          </div>
                          {/* <label>Cheque Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={chequeDate}
                          /> */}
                        </div>
                        <div className="col-md-4">
                          {/* <label>Cheque Number</label> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Cheque Number"
                            value={chequeNumber}
                            onChange={(e) => setChequeNumber(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          {/* <label>Bank Name</label> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Bank Name"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div className="row ">
                      <div className="col pt-3">
                        <input
                          type="text"
                          className="form-control"
                          id="amount"
                          placeholder="Amount"
                          name="amount"
                        />
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row w-75">
                      <div className="col pt-3">
                        <textarea
                          className="form-control"
                          placeholder="Remark"
                          id="floatingTextarea"
                        ></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                      Save
                    </button>
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
