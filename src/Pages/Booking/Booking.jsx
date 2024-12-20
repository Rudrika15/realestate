import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

function Booking() {
  const [selectOption, setSelectOption] = useState(""); // loan
  const [loanAmount, setLoanAmount] = useState("");
  const [bankDetails, setBankDetails] = useState("");

  const [paymentFrequence, setPaymentFrequence] = useState(""); //installments
  const [amount, setAmount] = useState("");
  const [totalInstallments, setTotalInstallments] = useState("");

  const [projectName, setProjectName] = useState(""); // validation
  const [unit, setUnit] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [extra, setExtra] = useState("");
  const [work, setWork] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const handleRadio = (e) => {
    setSelectOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectName) {
      toast.error(" select a project!");
      return;
    }
    if (!unit) {
      toast.error(" select a Unit!");
      return;
    }
    if (!bookingDate) {
      toast.error("select a Date!");
      return;
    }
    if (!customerName) {
      toast.error("Enter Name!");
      return;
    }
    if (!/^[A-Za-z ]+$/.test(customerName)) {
      toast.error("Names can only contain letters and spaces");
      return;
    }
    if (!customerContact) {
      toast.error("Enter Contact Number!");
      return;
    }
    if (customerContact.length < 10 || customerContact.length > 10) {
      toast.error("Enter 10 Digit Number!")
      return;
    }

    if (!customerAddress) {
      toast.error("Enter Address");
      return;
    }
    if (customerAddress.length < 20) {
      toast.error("Enter Valid Address!");
      return;
    }
  };


  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate |View Booking</title>
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
                      <h6 className="mb-4">Booking</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/view-booking" className="">
                        <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
                      </Link>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <p style={{ fontSize: "1.1rem", color: "black" }}>
                      Project Details
                    </p>
                    <div className="row">
                      <div className="col">
                        <select
                          className="form-select mb-3"
                          aria-label="Default select example"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                        >
                          <option value="">Project Name</option>
                          <option value="demo">demo</option>
                        </select>
                      </div>
                      <div className="col">
                        <select
                          className="form-select mb-3"
                          aria-label="Default select example"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                        >
                          <option value="">Unit No</option>
                          <option value="1">1</option>
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
                              bookingDate
                                ? new Date(bookingDate).toLocaleDateString("en-GB", {
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
                              setBookingDate(new Date(formattedDate).toISOString().slice(0, 10));
                            }}
                            placeholder="Booking Date"
                            onFocus={(e) => (e.target.type = "date")} 
                            onBlur={(e) => (e.target.type = "text")} 
                          />
                        </div>
                      </div>
                      <div className="col"></div>
                    </div>
                    <p
                      className="pt-3"
                      style={{ fontSize: "1.1rem", color: "black" }}
                    >
                      Customer Details
                    </p>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Name"
                          name="name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="Contact No"
                          placeholder="Contact No"
                          name="Contact No"
                          value={customerContact}
                          onChange={(e) => setCustomerContact(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row w-75">
                      <div className="col pt-4">
                        <textarea
                          className="form-control"
                          placeholder="Address"
                          id="floatingTextarea"
                          value={customerAddress}
                          onChange={(e) =>
                            setCustomerAddress(e.target.value)
                          }
                        ></textarea>
                      </div>
                    </div>
                    <p
                      className="pt-3"
                      style={{ fontSize: "1.1rem", color: "black" }}
                    >
                      Payment Details
                    </p>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="Sale Deed Amount"
                          placeholder="Sale Deed Amount"
                          name="Sale Deed Amount"
                        />
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          className="form-control"
                          id="Extra Work Amount"
                          placeholder="Extra Work Amount"
                          name="Extra Work Amount"
                        />
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="Other Work Amount"
                          placeholder="Other Work Amount"
                          name="Other Work Amount"
                        />
                      </div>
                      <div className="col"></div>
                    </div>
                    <p
                      className="pt-3"
                      style={{ fontSize: "1.1rem", color: "black" }}
                    >
                      Payment Terms
                    </p>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="Down Payment"
                          placeholder="Down Payment"
                          name="Down Payment"
                        />
                      </div>
                      <div className="col">
                        <select
                          className="form-select mb-3"
                          aria-label="Default select example"
                        >
                          <option selected>Payment Duration</option>
                          <option value="1month">1 Month</option>
                        </select>
                      </div>
                    </div>
                    <div
                      className="form-check pt-2"
                      style={{ marginLeft: "1rem" }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        value="loan"
                        checked={selectOption === "loan"}
                        onChange={handleRadio}
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Loan
                      </label>
                      {selectOption === "loan" && (
                        <>
                          <div className="row pt-3">
                            <div className="col">
                              <input
                                type="number"
                                className="form-control"
                                id="loanAmount"
                                value={loanAmount}
                                onChange={(e) =>
                                  setLoanAmount(e.target.value)
                                }
                                placeholder="Loan Amount"
                              />
                            </div>
                            <div className="col"></div>
                          </div>
                          <div className="row w-75">
                            <div className="col pt-3">
                              <textarea
                                className="form-control"
                                placeholder="Bank Details"
                                id="floatingTextarea"
                                value={bankDetails}
                                onChange={(e) =>
                                  setBankDetails(e.target.value)
                                }
                              ></textarea>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      className="form-check pt-2"
                      style={{ marginLeft: "1rem" }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked={selectOption === "installment"}
                        value="installment"
                        onChange={handleRadio}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Installment
                      </label>
                      {selectOption === "installment" && (
                        <>
                          <div className="row pt-3">
                            <div className="col">
                              <select
                                className="form-select mb-2"
                                aria-label="Payment Frequency"
                                value={paymentFrequence}
                                onChange={(e) =>
                                  setPaymentFrequence(e.target.value)
                                }
                              >
                                <option value="">
                                  Select Payment Frequency
                                </option>
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="yearly">Yearly</option>
                              </select>
                            </div>
                            <div className="col">
                              <input
                                type="number"
                                className="form-control"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Amount"
                              />
                            </div>
                          </div>
                          <div className="row pt-2">
                            <div className="col">
                              <input
                                type="number"
                                className="form-control"
                                id="totalInstallments"
                                value={totalInstallments}
                                onChange={(e) =>
                                  setTotalInstallments(e.target.value)
                                }
                                placeholder="Total Installments"
                              />
                            </div>
                            <div className="col"></div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="form-check pt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Installment Notify
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <style></style>
    </>
  );
};

export default Booking;
