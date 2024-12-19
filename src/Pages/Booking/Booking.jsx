import React, { useRef, useState, useEffect,useCallback } from "react";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Booking() {
  const [selectOption, setSelectOption] = useState(""); // loan
  const [loanAmount, setLoanAmount] = useState("");
  const [bankDetails, setBankDetails] = useState("");

  const [paymentFrequence, setPaymentFrequence] = useState(""); //installments
  const [amount, setAmount] = useState("");
  const [totalInstallments, setTotalInstallments] = useState("");

  const [projectName, setProjectName] = useState(""); // validation
  const [unit, setUnit] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [extra, setExtra] = useState("");
  const [work, setWork] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [paymentDuration, setPaymentDuration] = useState("");

  const inputRef = useRef(null);
  const unitRef = useRef(null);
  const dateRef = useRef(null);
  const customerNameRef = useRef(null);
  const customerContactRef = useRef(null);
  const customerAddressRef = useRef(null);
  const saleAmountRef = useRef(null);
  const extraRef = useRef(null);
  const workRef = useRef(null);
  const downPaymentRef = useRef(null);
  const paymentDurationRef = useRef(null);

  const loanRef = useRef(null);
  const installmentRef = useRef(null);

  const loanAmountRef = useRef(null);
  const bankDetailsRef = useRef(null);

  const paymentFrequenceRef = useRef(null);
  const amountRef = useRef(null);
  const totalInstallmentsRef = useRef(null);

  const submitRef = useRef(null);

  const handleRadio = (e) => {
    setSelectOption(e.target.value);
  };
    // focus
  useEffect(() => {
    inputRef.current.focus();
  }, []);

    // enter to focus
  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };
    // shortcut Key //
  const handleKey = useCallback((event) => {   
    if (event.key === "F4") {
      handleSubmit(event);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  
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
    if (!projectDate) {
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
      toast.error("Enter 10 Digit Number!");
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
    if (isNaN(saleAmount) || isNaN(extra) || isNaN(work)) {
      toast.error("Only Number Enter");
      return;
    }
    if (!saleAmount || !saleAmount.trim()) {
      toast.error("Enter Sale Deed Amount!");
      return;
    }
    if (!extra || !extra.trim()) {
      toast.error("Enter Extra  Work Amount!");
      return;
    }

    if (!work || !work.trim()) {
      toast.error("Enter  Other Amount!");
      return;
    }
    if (!downPayment || isNaN(downPayment) || !downPayment.trim()) {
      toast.error("Enter Down Payment !");
      return;
    }
    if (!paymentDuration) {
      toast.error("Select Payment Duration !");
      return;
    }

    if (!selectOption) {
      toast.error("Select Any One!");
      return;
    }
    if (selectOption === "loan" && (!loanAmount || !bankDetails)) {
      toast.error("Enter Loan Amount and Bank Details!");
      return;
    }
    if (
      selectOption === "installment" &&
      (!paymentFrequence || !amount || !totalInstallments)
    ) {
      toast.error(" Enter All Installment Details!");
      return;
    }
    toast.success("Successfully!");

    // Reset all fields
    setProjectName("");
    setUnit("");
    setProjectDate("");
    setCustomerName("");
    setCustomerContact("");
    setCustomerAddress("");
    setSaleAmount("");
    setExtra("");
    setWork("");
    setDownPayment("");
    setPaymentDuration("");
    setSelectOption("");
    setLoanAmount("");
    setBankDetails("");
    setPaymentFrequence("");
    setAmount("");
    setTotalInstallments("");
  };

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <div className="content">
        <Topbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-12">
              <div className="bg-light rounded h-100 p-4">
                <div className="row justify-content-center mx-0">
                  <div className="col-lg-10 col-md-12">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="p-2">
                        <h4>Booking</h4>
                      </div>
                      <div className="p-2">
                        <Link to="/ViewBooking" className="btn">
                          <i className="bi bi-arrow-left-circle-fill"></i>
                          &nbsp; Back
                        </Link>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p style={{ fontSize: "1.5rem", color: "black" }}>
                        Project Details
                      </p>
                      <div className="row">
                        <div className="col">
                          <select
                            className="form-select mb-3"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, unitRef)}
                            ref={inputRef}
                          >
                            <option value="">Project Name</option>
                            <option value="demo">demo</option>
                          </select>
                        </div>
                        <div className="col">
                          <select
                            className="form-select mb-3"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, dateRef)}
                            ref={unitRef}
                          >
                            <option value="">Unit No</option>
                            <option value="1">1</option>
                          </select>
                        </div>
                      </div>
                      <div className="row w-50">
                        <div className="col pt-2">
                          <input
                            type="date"
                            id="date"
                            className="form-control"
                            value={projectDate}
                            onChange={(e) => setProjectDate(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, customerNameRef)}
                            ref={dateRef}
                          />
                        </div>
                      </div>
                      <p
                        className="pt-3"
                        style={{ fontSize: "1.5rem", color: "black" }}
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
                            onKeyPress={(e) =>
                              handleEnter(e, customerContactRef)
                            }
                            ref={customerNameRef}
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
                            onKeyPress={(e) =>
                              handleEnter(e, customerAddressRef)
                            }
                            ref={customerContactRef}
                          />
                        </div>
                      </div>
                      <div className="row w-75">
                        <div className="col pt-4">
                          <div className="form-floating">
                            <textarea
                              className="form-control"
                              placeholder="Address"
                              id="floatingTextarea"
                              value={customerAddress}
                              onChange={(e) =>
                                setCustomerAddress(e.target.value)
                              }
                              onKeyPress={(e) => handleEnter(e, saleAmountRef)}
                              ref={customerAddressRef}
                            ></textarea>
                            <label htmlFor="floatingTextarea">Address</label>
                          </div>
                        </div>
                      </div>
                      <p
                        className="pt-3"
                        style={{ fontSize: "1.5rem", color: "black" }}
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
                            value={saleAmount}
                            onChange={(e) => setSaleAmount(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, extraRef)}
                            ref={saleAmountRef}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            id="Extra Work Amount"
                            placeholder="Extra Work Amount"
                            value={extra}
                            onChange={(e) => setExtra(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, workRef)}
                            ref={extraRef}
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
                            value={work}
                            onChange={(e) => setWork(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, downPaymentRef)}
                            ref={workRef}
                          />
                        </div>
                      </div>
                      <p
                        className="pt-3"
                        style={{ fontSize: "1.5rem", color: "black" }}
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
                            value={downPayment}
                            onChange={(e) => setDownPayment(e.target.value)}
                            onKeyPress={(e) =>
                              handleEnter(e, paymentDurationRef)
                            }
                            ref={downPaymentRef}
                          />
                        </div>
                        <div className="col">
                          <select
                            className="form-select mb-3"
                            value={paymentDuration}
                            onChange={(e) => setPaymentDuration(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, loanRef)}
                            ref={paymentDurationRef}
                          >
                            <option value="">Payment Duration</option>
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
                          onKeyPress={(e) => handleEnter(e, installmentRef)}
                          ref={loanRef}
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
                                  value={loanAmount}
                                  onChange={(e) =>
                                    setLoanAmount(e.target.value)
                                  }
                                  placeholder="Loan Amount"
                                  onKeyPress={(e) =>
                                    handleEnter(e, bankDetailsRef)
                                  }
                                  ref={loanAmountRef}
                                />
                              </div>
                              <div className="col">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={bankDetails}
                                  onChange={(e) =>
                                    setBankDetails(e.target.value)
                                  }
                                  placeholder="Bank Details"
                                  onKeyPress={(e) => handleEnter(e, submitRef)}
                                  ref={bankDetailsRef}
                                />
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
                          value="installment"
                          checked={selectOption === "installment"}
                          onChange={handleRadio}
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          onKeyPress={(e) => handleEnter(e, submitRef)}
                          ref={installmentRef}
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
                                  className="form-select"
                                  value={paymentFrequence}
                                  onChange={(e) =>
                                    setPaymentFrequence(e.target.value)
                                  }
                                  onKeyPress={(e) => handleEnter(e, amountRef)}
                                  ref={paymentFrequenceRef}
                                >
                                  <option value="">Select Frequency</option>
                                  <option value="monthly">Monthly</option>
                                </select>
                              </div>
                              <div className="col">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                  placeholder="Amount"
                                  onKeyPress={(e) =>
                                    handleEnter(e, totalInstallmentsRef)
                                  }
                                  ref={amountRef}
                                />
                              </div>
                            </div>
                            <div className="row pt-3">
                              <div className="col">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={totalInstallments}
                                  onChange={(e) =>
                                    setTotalInstallments(e.target.value)
                                  }
                                  placeholder="Total Installments"
                                  onKeyPress={(e) => handleEnter(e, submitRef)}
                                  ref={totalInstallmentsRef}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="pt-4 d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success"
                          ref={submitRef}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Booking;
