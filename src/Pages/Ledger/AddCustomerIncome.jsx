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
  const [check, setCheck] = useState(null);
  const [incomeDate, setIncomeDate] = useState("");
  const [depositDate, setDepositDate] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [incomeDateError, setIncomeDateError] = useState("");
  const [depositDateError, setDepositDateError] = useState("");
  const [chequeDateError, setChequeDateError] = useState("");
  const [showSaleDeedFields, setShowSaleDeedFields] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRadioChange = (e) => {
    setShowSaleDeedFields(e.target.value === "saleDeedAmount");
    console.log(showSaleDeedFields);

  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const files = useRef(null);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      const day = ("0" + d.getDate()).slice(-2);
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return "";
  };

  const handleIncomeDateChange = (e) => {
    setIncomeDate(e.target.value);
    if (e.target.value) setIncomeDateError(false);
  };
  const handleDepositDateChange = (e) => {
    setDepositDate(e.target.value);
    if (e.target.value) setDepositDateError(false);
  };
  const handleChequeDateChange = (e) => {
    setChequeDate(e.target.value);
    if (e.target.value) setChequeDateError(false);
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
                    <div className="p-2 ">
                      <h6 className="mb-4">Add Customer Income</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/customer-income" className="">
                        <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
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
                      <div className="col">
                        <input type="number" className="form-control" id="Mobile No" placeholder="Mobile No" name="Mobile No" />
                      </div>
                      <div className="col">
                        <button type="button" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                    <div className="row pt-5 mb-4 text-dark">
                      {["Sale Deed Amount", "Other Work Amount", "Extra Work Amount"].map(
                        (label, index) => (
                          <div className="col" key={index}>
                            <div
                              className="input-container"
                              onClick={() => handleClick(index)}
                            >
                              <label>{label}</label>
                              <div
                                className={`underline ${activeIndex === index ? "active" : ""}`}
                              ></div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="d-flex align-items-center">
                      <table className="table table-bordered w-75 text-center">
                        <thead>
                          <tr>
                            <th scope="col">Sale Deed Amount</th>
                            <th scope="col">Total Paid Amount</th>
                            <th scope="col">Outstanding Amount</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                    <div className="row pt-5 mb-4 text-dark">
                      <div className="col">
                        <div class="input-container1 mb-2">
                          <label for="history">History</label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <table className="table table-bordered w-75 text-center">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">Installment Amount</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Difference</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr></tr>
                          <tr></tr>
                          <tr>
                            <td colSpan="3"><strong>Total Amount</strong></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <hr />
                    <div className="row pt-3">
                      <div className="col">
                        <div class="custom-control custom-checkbox my-1 mr-sm-2">
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" name="optradio" value="saleDeedAmount" onChange={handleRadioChange} />&nbsp;
                            Sale Deed Amount
                          </label>&nbsp;&nbsp;&nbsp;&nbsp;
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" name="optradio" value="extraWorkAmount" onChange={handleRadioChange} />&nbsp;
                            Extra Work Amount
                          </label>&nbsp;&nbsp;&nbsp;&nbsp;
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" name="optradio" value="otherWorkAmount" onChange={handleRadioChange} />&nbsp;
                            Other Work Amount
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input
                          type="text"
                          id="date"
                          className={`form-control`}
                          value={formatDate(incomeDate)}
                          onChange={(e) => handleIncomeDateChange(e)}
                          placeholder="Income Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          id="date"
                          className={`form-control`}
                          value={formatDate(depositDate)}
                          onChange={(e) => handleDepositDateChange(e)}
                          placeholder="Deposit Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input type="number" className="form-control" id="Amount" placeholder="Amount" name="Amount" />
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row pt-4 mb-3">
                      <div className="col">
                        <input type="number" className="form-control" id="Receipt No" placeholder="Receipt No" name="Receipt No" />
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="Receipt Name" placeholder="Receipt Name" name="Receipt Name" />
                      </div>
                    </div>
                    {showSaleDeedFields && (
                      <>
                        <div className="row pt-2">
                          <div className="col">
                            <input type="number" className="form-control" id="Cheque No" placeholder="Cheque No" name="Cheque No" />
                          </div>
                          <div className="col">
                            <input
                              type="text"
                              id="date"
                              className={`form-control`}
                              value={formatDate(chequeDate)}
                              onChange={(e) => handleChequeDateChange(e)}
                              placeholder="Cheque Date"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                            />
                          </div>
                        </div>
                        <div className="row pt-4 mb-3">
                          <div className="col">
                            <input type="text" className="form-control" id="Bank Name" placeholder="Bank Name" name="Bank Name" />
                          </div>
                          <div className="col"></div>
                        </div>
                      </>
                    )}
                    <div className="row w-50">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="unit" className="form-label">
                            Upload Receipt :
                          </label>
                          <input
                            type="file"
                            className='form-control'
                            id="unit"
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div>
    </>
  );
};

export default AddCustomerIncome;
