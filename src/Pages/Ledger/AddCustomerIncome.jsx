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
  const [incomeDateError, setIncomeDateError] = useState("");
  const [depositDateError, setDepositDateError] = useState("");


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
                    </div>
                    {/* <div className="row w-75">
                      <div className="col pt-3">
                        <textarea className="form-control" placeholder="Address" id="floatingTextarea"></textarea>
                      </div>
                    </div> */}
                    <div className="row pt-4">
                      <div className="col">
                        <input type="text" className="form-control" id="Installments" placeholder="Installments" name="Installments" />
                      </div>
                      <div className="col">
                        {/* <input type="text" className="form-control" id="Status" placeholder="Status" name="Status" /> */}
                      </div>
                    </div>
                    <div className="row pt-5 mb-4 text-dark">
                      <div className="col">
                        <div class="input-container">
                          <label for="sale-deed-amount">Sale Deed Amount</label>
                          <div className="underline"></div>
                        </div>
                      </div>
                      <div className="col">
                        <div class="input-container">
                          <label for="other-work-amount">Other Work Amount</label>
                        </div>
                      </div>
                      <div className="col">
                        <div class="input-container">
                          <label for="extra-work-amount">Extra Work Amount</label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <table className="table table-bordered w-75 text-center">
                        <thead>
                          <tr>
                            <th scope="col">Sale Deed Amount</th>
                            <th scope="col">Total Paid Amount</th>
                            <th scope="col">Outstanding Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>9,00,000</td>
                            <td>5,00,000</td>
                            <td>4,00,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="row pt-5 mb-4 text-dark">
                      <div className="col">
                        <div class="input-container1 mb-2">
                          <label for="history">History</label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
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
                          <tr>
                            <th scope="row">1</th>
                            <td>1-02-2024</td>
                            <td>Installment 1</td>
                            <td>5,00,000</td>
                            <td>3,00,000</td>
                            <td>2,00,000</td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>1-03-2024</td>
                            <td>Installment 2</td>
                            <td>5,00,000</td>
                            <td>3,00,000</td>
                            <td>2,00,000</td>
                          </tr>
                          <tr>
                            <td colSpan="3"><strong>Total Amount</strong></td>
                            <td>10,00,000</td>
                            <td>9,00,000</td>
                            <td>4,00,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <hr />
                    <div className="row pt-4">
                      <div className="col">
                        <select
                          className={`form-control bg-white`}
                          value="saledeedamount"
                        >
                          <option value="">Sale Deed Amount</option>
                          <option value="">Extra Work Amount</option>
                          <option value="">Other Work Amount</option>
                        </select>
                      </div>
                      <div className="col"></div>
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
                    <div className="row pt-4 mb-3">
                      <div className="col">
                        <input type="text" className="form-control" id="Amount" placeholder="Amount" name="Amount" />
                      </div>
                      <div className="col"></div>
                    </div>
                    {/* <div className="row">
                      <div className="col pt-3">
                        <div className="input-wrapper position-relative">
                          <input
                            type="text"
                            id="date"
                            className="form-control"
                            value={
                              incomeDate
                                ? new Date(incomeDate).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                })
                                : ""
                            }
                            onChange={(e) => {
                              const inputDate = e.target.value;
                              const [day, month, year] = inputDate.split("-");
                              const formattedDate = `${year}-` + `${month}-` + `${day}`;
                              setIncomeDate(new Date(formattedDate).toISOString().slice(0, 10));
                            }}
                            placeholder="Income Date"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                          />
                        </div>
                      </div>
                      <div className="col pt-3">
                        <div className="input-wrapper position-relative">
                          <input
                            type="text"
                            id="date"
                            className="form-control"
                            value={
                              depositDate
                                ? new Date(depositDate).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                })
                                : ""
                            }
                            onChange={(e) => {
                              const inputDate = e.target.value;
                              const [day, month, year] = inputDate.split("-");
                              const formattedDate = `${year}-` + `${month}-` + `${day}`;
                              setDepositDate(new Date(formattedDate).toISOString().slice(0, 10));
                            }}
                            placeholder="Deposit Date"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                          />
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="row pt-3">
                      <div className="col">
                        <input type="text" className="form-control" id="Amount" placeholder="Amount" name="Amount" />
                      </div>
                      <div className="col"></div>
                    </div> */}
                    {/* <div className="row pt-3">
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
                    </div> */}
                    {/* <div className="row pt-3">
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
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf, .docx"
                        className="form-control"
                        multiple
                        id="check"
                        aria-describedby="check"
                        ref={files}
                        onChange={(e) => setCheck(e.target.files)}
                      />
                    </div> */}
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
