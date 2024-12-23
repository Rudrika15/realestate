import React, { useRef, useState, useEffect, useCallback } from "react";
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
  const [downPayment, setDownPayment] = useState("");
  const [paymentDuration, setPaymentDuration] = useState("");

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = {};

    if (!projectName) {
      validationError.projectName = "Please select a project.";
    }
    if (!unit) {
      validationError.unit = "Please select a unit.";
    }
    if (!bookingDate) {
      validationError.bookingDate = "Please select a date.";
    }
    if (!customerName) {
      validationError.customerName = "Please enter the customer's name.";
    } else if (!/^[A-Za-z ]+$/.test(customerName)) {
      validationError.customerName =
        "Names can only contain letters and spaces.";
    }
    if (!customerContact) {
      validationError.customerContact = "Please enter a contact number.";
    } else if (customerContact.length !== 10) {
      validationError.customerContact = "Contact number must be 10 digits.";
    }

    if (!customerAddress) {
      validationError.customerAddress = "Please enter the customer's address.";
    } else if (customerAddress.length < 13) {
      validationError.customerAddress =
        "Address must be at least 13 characters.";
    }
    if (isNaN(saleAmount) || isNaN(extra) || isNaN(work)) {
      validationError.amounts =
        "Only numeric values are allowed for sale, extra, and work amounts.";
    }
    if (!saleAmount || !saleAmount.trim()) {
      validationError.saleAmount = "Please enter the sale deed amount.";
    }
    if (!extra || !extra.trim()) {
      validationError.extra = "Please enter the extra work amount.";
    }
    if (!work || !work.trim()) {
      validationError.work = "Please enter the other work amount.";
    }
    if (!downPayment || isNaN(downPayment) || !downPayment.trim()) {
      validationError.downPayment = "Please enter a valid down payment amount.";
    }
    if (!paymentDuration) {
      validationError.paymentDuration = "Please select the payment duration.";
    }
    if (!selectOption) {
      validationError.selectOption = "Please select a payment option.";
    }
    if (selectOption === "loan" && !loanAmount) {
      validationError.loanDetails = "Please enter loan amount.";
    }
    if (selectOption === "loan" && !bankDetails) {
      validationError.bankDetails = "Please enter Bank Details.";
    }
    if (selectOption === "installment" && !paymentFrequence) {
      validationError.paymentFrequence =
        "Please enter Payment Frequence details.";
    }
    if (selectOption === "installment" && !amount) {
      validationError.amount = "Please enter Amount details.";
    }
    if (selectOption === "installment" && !totalInstallments) {
      validationError.totalInstallments =
        "Please enter all installment details.";
    }

    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
      return;
    }

    setErrors({});
    toast.success("Successfully submitted!");

    setProjectName("");
    setUnit("");
    setBookingDate("");
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
      <Helmet>
        <title>React Estate | View Booking</title>
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
                      <h6 className="mb-4">Booking</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/view-booking" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
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
                          className="form-select mb-1"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          onKeyPress={(e) => handleEnter(e, unitRef)}
                          ref={inputRef}
                        >
                          <option value="">Project Name</option>
                          <option value="demo">demo</option>
                        </select>
                        {errors.projectName && (
                          <p
                            style={{ color: "red", fontSize: "0.9rem" }}
                            className="ms-3"
                          >
                            {errors.projectName}
                          </p>
                        )}
                      </div>
                      <div className="col">
                        <select
                          className="form-select mb-1"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          onKeyPress={(e) => handleEnter(e, dateRef)}
                          ref={unitRef}
                        >
                          <option value="">Unit No</option>
                          <option value="1">1</option>
                        </select>
                        {errors.unit && (
                          <p
                            style={{ color: "red", fontSize: "0.9rem" }}
                            className="ms-3"
                          >
                            {errors.unit}
                          </p>
                        )}
                      </div>
                      <div className="row">
                        <div className="col pt-2">
                          <div className="input-wrapper position-relative">
                            <input
                              type="date"
                              id="date"
                              className="form-control "
                              value={bookingDate}
                              ref={dateRef}
                              onKeyPress={(e) =>
                                handleEnter(e, customerNameRef)
                              }
                              placeholder="dd-mm-yyyy"
                              onChange={(e) => setBookingDate(e.target.value)}
                              onFocus={(e) => e.target.showPicker()}
                            />
                            {!bookingDate && (
                              <label
                                htmlFor="date"
                                className="placeholder-label "
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "13px",
                                  transform: "translateY(-50%)",
                                  pointerEvents: "none",
                                }}
                              >
                                Booking Date
                              </label>
                            )}
                            {errors.bookingDate && (
                              <p
                                style={{ color: "red", fontSize: "0.9rem" }}
                                className="ms-3"
                              >
                                {errors.bookingDate}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col"></div>
                      </div>
                    </div>
                    <hr />
                    <p
                      style={{ fontSize: "1.1rem", color: "black" }}
                    >
                      Customer Details
                    </p>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control mb-1"
                          id="name"
                          placeholder="Name"
                          name="name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          onKeyPress={(e) => handleEnter(e, customerContactRef)}
                          ref={customerNameRef}
                        />
                        {errors.customerName && (
                          <p
                            style={{ color: "red", fontSize: "0.9rem" }}
                            className="ms-3"
                          >
                            {errors.customerName}
                          </p>
                        )}
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control mb-1"
                          id="Contact No"
                          placeholder="Contact No"
                          name="Contact No"
                          value={customerContact}
                          onChange={(e) => setCustomerContact(e.target.value)}
                          onKeyPress={(e) => handleEnter(e, customerAddressRef)}
                          ref={customerContactRef}
                        />
                        {errors.customerContact && (
                          <p
                            style={{ color: "red", fontSize: "0.9rem" }}
                            className="ms-3"
                          >
                            {errors.customerContact}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row w-75">
                      <div className="col pt-4 ">
                        <textarea
                          className="form-control mb-1"
                          placeholder="Address"
                          id="floatingTextarea"
                          value={customerAddress}
                          ref={customerAddressRef}
                          onKeyPress={(e) => handleEnter(e, saleAmountRef)}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                        ></textarea>
                        {errors.customerAddress && (
                          <p
                            style={{ color: "red", fontSize: "0.9rem" }}
                            className="ms-3"
                          >
                            {errors.customerAddress}
                          </p>
                        )}
                      </div>
                    </div>
                    <hr />
                    <p
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
                    <hr />
                    <p
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
                        Payment Details
                      </label>
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control mb-1"
                            id="Sale Deed Amount"
                            placeholder="Sale Deed Amount"
                            value={saleAmount}
                            onChange={(e) => setSaleAmount(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, extraRef)}
                            ref={saleAmountRef}
                          />
                          {errors.saleAmount && (
                            <p
                              style={{ color: "red", fontSize: "0.9rem" }}
                              className="ms-3"
                            >
                              {errors.saleAmount}
                            </p>
                          )}
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control mb-1  "
                            id="Extra Work Amount"
                            placeholder="Extra Work Amount"
                            value={extra}
                            onChange={(e) => setExtra(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, workRef)}
                            ref={extraRef}
                          />
                          {errors.extra && (
                            <p
                              style={{ color: "red", fontSize: "0.9rem" }}
                              className="ms-3"
                            >
                              {errors.extra}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control mb-1"
                            id="Other Work Amount"
                            placeholder="Other Work Amount"
                            value={work}
                            onChange={(e) => setWork(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, downPaymentRef)}
                            ref={workRef}
                          />
                          {errors.work && (
                            <p
                              style={{ color: "red", fontSize: "0.9rem" }}
                              className="ms-3"
                            >
                              {errors.work}
                            </p>
                          )}
                        </div>
                        <div className="col"></div>
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
                            className="form-control mb-1"
                            id="Down Payment"
                            placeholder="Down Payment"
                            value={downPayment}
                            onChange={(e) => setDownPayment(e.target.value)}
                            onKeyPress={(e) =>
                              handleEnter(e, paymentDurationRef)
                            }
                            ref={downPaymentRef}
                          />
                          {errors.downPayment && (
                            <p
                              style={{ color: "red", fontSize: "0.9rem" }}
                              className="ms-3"
                            >
                              {errors.downPayment}
                            </p>
                          )}
                        </div>
                        <div className="col">
                          <select
                            className="form-select mb-1"
                            value={paymentDuration}
                            onChange={(e) => setPaymentDuration(e.target.value)}
                            onKeyPress={(e) => handleEnter(e, loanRef)}
                            ref={paymentDurationRef}
                          >
                            <option value="">Payment Duration</option>
                            <option value="1month">1 Month</option>
                          </select>
                          {errors.paymentDuration && (
                            <p
                              style={{ color: "red", fontSize: "0.9rem" }}
                              className="ms-3"
                            >
                              {errors.paymentDuration}
                            </p>
                          )}
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
                      </div>

                      <div
                        className="form-check pt-2"
                        style={{ marginLeft: "1rem" }}
                      >
                        {selectOption === "loan" && (
                          <>
                            <div className="row pt-3">
                              <div className="col">
                                <input
                                  type="number"
                                  className="form-control mb-1"
                                  id="loanAmount"
                                  value={loanAmount}
                                  onChange={(e) =>
                                    setLoanAmount(e.target.value)
                                  }
                                  placeholder="Loan Amount"
                                  ref={loanAmountRef}
                                  onKeyPress={(e) =>
                                    handleEnter(e, bankDetailsRef)
                                  }
                                />
                                {errors.loanDetails && (
                                  <p
                                    style={{ color: "red", fontSize: "0.9rem" }}
                                    className="ms-3"
                                  >
                                    {errors.loanDetails}
                                  </p>
                                )}
                              </div>
                              <div className="col"></div>
                            </div>
                            <div className="row w-75">
                              <div className="col pt-3">
                                <textarea
                                  className="form-control mb-1"
                                  placeholder="Bank Details"
                                  id="floatingTextarea"
                                  value={bankDetails}
                                  onChange={(e) =>
                                    setBankDetails(e.target.value)
                                  }
                                  ref={bankDetailsRef}
                                  onKeyPress={(e) => handleEnter(e, submitRef)}
                                ></textarea>
                                {errors.bankDetails && (
                                  <p
                                    style={{ color: "red", fontSize: "0.9rem" }}
                                    className="ms-3"
                                  >
                                    {errors.bankDetails}
                                  </p>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className="form-check pt-2"
                        style={{ marginLeft: "1rem" }}
                      >
                        <div>
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
                                    className="form-select mb-1"
                                    value={paymentFrequence}
                                    onChange={(e) =>
                                      setPaymentFrequence(e.target.value)
                                    }
                                    onKeyPress={(e) =>
                                      handleEnter(e, amountRef)
                                    }
                                    ref={paymentFrequenceRef}
                                  >
                                    <option value="">Select Frequency</option>
                                    <option value="monthly">Monthly</option>
                                  </select>
                                  {errors.paymentFrequence && (
                                    <p
                                      style={{ color: "red", fontSize: "0.9rem" }}
                                      className="ms-3"
                                    >
                                      {errors.paymentFrequence}
                                    </p>
                                  )}
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
                                    onKeyPress={(e) =>
                                      handleEnter(e, submitRef)
                                    }
                                    ref={totalInstallmentsRef}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                          {errors.selectOption && (
                            <p style={{ color: "red", fontSize: "0.9rem" }}>
                              {errors.selectOption}
                            </p>
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
                        <div className="pt-4 d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-success"
                            ref={submitRef}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
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

                  <style jsx="true">{`
                    input[type="date"] {
                      appearance: none;
                      -webkit-appearance: none;
                      -moz-appearance: none;
                      border: 1px solid #ccc;
                      border-radius: 5px;
                      padding: 10px 15px;
                      color: #333;
                      background-color: #f9f9f9;
                      cursor: pointer;
                    }

                    input[type="date"]::-webkit-datetime-edit {
                      display: none;
                    }

                    input[type="date"] {
                      padding-left: 33rem;
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div >
      </div >
      <style></style>
    </>
  );
}

export default Booking;
