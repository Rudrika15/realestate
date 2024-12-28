import React, { useRef, useState, useEffect, useCallback } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { Spinner } from "react-bootstrap";

function Booking() {
  const [projectName, setProjectName] = useState("");
  const [unit, setUnit] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [extra, setExtra] = useState("");
  const [work, setWork] = useState("");
  const [paymentplan, setPaymentPlan] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [tokenPaymentDate, setTokenPaymentDate] = useState("");
  const [pendingAmount, setPendingAmount] = useState("");
  const [pendingPaymentDate, setPendingPaymentDate] = useState("");
  const [installment, setInstallment] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [loanPaymentDate, setLoanPaymentDate] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [downPaymentDate, setDownPaymentDate] = useState("");
  const [noOfInstallment, setNoOfInstallment] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [projectError, setProjectError] = useState(false);
  const [unitError, setUnitError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [customerNameError, setCustomerNameError] = useState("");
  const [customerContactError, setCustomerContactError] = useState("");
  const [customerAddressError, setCustomerAddressError] = useState("");
  const [saleAmountError, setSaleAmountError] = useState("");
  const [extraError, setExtraError] = useState("");
  const [workError, setWorkError] = useState("");
  const [paymentplanError, setPaymentPlanError] = useState("");
  const [tokenAmountError, setTokenAmountError] = useState("");
  const [tokenPaymentDateError, setTokenPaymentDateError] = useState("");
  const [pendingAmountError, setPendingAmountError] = useState("");
  const [pendingPaymentDateError, setPendingPaymentDateError] = useState("");
  const [installmentError, setInstallmentError] = useState("");
  const [loanAmountError, setLoanAmountError] = useState("");
  const [loanPaymentDateError, setLoanPaymentDateError] = useState("");
  const [bankDetailsError, setBankDetailsError] = useState("");
  const [downPaymentError, setDownPaymentError] = useState("");
  const [downPaymentDateError, setDownPaymentDateError] = useState("");
  const [noOfInstallmentError, setNoOfInstallmentError] = useState("");
  const [paymentFrequencyError, setPaymentFrequencyError] = useState("");
  const [dueDateError, setDueDateError] = useState("");

  const projectRef = useRef(null);
  const unitRef = useRef(null);
  const dateRef = useRef(null);
  const customerNameRef = useRef(null);
  const customerContactRef = useRef(null);
  const customerAddressRef = useRef(null);
  const saleAmountRef = useRef(null);
  const extraRef = useRef(null);
  const workRef = useRef(null);
  const paymentPlanRef = useRef(null);
  const tokenAmountRef = useRef(null);
  const pendingAmountRef = useRef(null);
  const tokenPaymentDateRef = useRef(null);
  const pendingPaymentDateRef = useRef(null);
  const installmentRef = useRef(null);
  const submitRef = useRef(null);
  const loanAmountRef = useRef(null);
  const loanPaymentDateRef = useRef(null);
  const bankDetailsRef = useRef(null);
  const downPaymentRef = useRef(null);
  const downPaymentDateRef = useRef(null);
  const noOfInstallmentRef = useRef(null);
  const paymentFrequencyRef = useRef(null);
  const dueDateRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField?.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!projectName) {
      setProjectError(true);
      isValid = false;
    } else {
      setProjectError(false);
    }

    if (!unit) {
      setUnitError(true);
      isValid = false;
    } else {
      setUnitError(false);
    }

    if (!bookingDate) {
      setBookingError(true);
      isValid = false;
    } else {
      setBookingError(false);
    }

    if (!customerName) {
      setCustomerNameError(true);
      isValid = false;
    } else {
      setCustomerNameError(false);
    }

    if (!customerContact) {
      setCustomerContactError(true);
      isValid = false;
    } else {
      setCustomerContactError(false);
    }

    if (!customerAddress) {
      setCustomerAddressError(true);
      isValid = false;
    } else {
      setCustomerAddressError(false);
    }

    if (!saleAmount) {
      setSaleAmountError(true);
      isValid = false;
    } else {
      setSaleAmountError(false);
    }

    if (!extra) {
      setExtraError(true);
      isValid = false;
    } else {
      setExtraError(false);
    }

    if (!work) {
      setWorkError(true);
      isValid = false;
    } else {
      setWorkError(false);
    }

    if (!installment) {
      setInstallmentError(true);
      isValid = false;
    } else {
      setInstallmentError(false);
    }

    if (!noOfInstallment) {
      setInstallmentError(true);
      isValid = false;
    } else {
      setInstallmentError(false);
    }

    if (!paymentplan) {
      setPaymentPlanError(true);
      isValid = false;
    } else {
      setPaymentPlanError(false);
    }

    if (!paymentFrequency) {
      setPaymentFrequencyError(true);
      isValid = false;
    } else {
      setPaymentFrequencyError(false);
    }

    if (!dueDate) {
      setDueDateError(true);
      isValid = false;
    } else {
      setDueDateError(false);
    }

    if (!tokenAmount) {
      setTokenAmountError(true);
      isValid = false;
    } else {
      setTokenAmountError(false);
    }

    if (!tokenPaymentDate) {
      setTokenPaymentDateError(true);
      isValid = false;
    } else {
      setTokenPaymentDateError(false);
    }

    if (!pendingPaymentDate) {
      setPendingPaymentDateError(true);
      isValid = false;
    } else {
      setPendingPaymentDateError(false);
    }

    if (!pendingAmount) {
      setPendingAmountError(true);
      isValid = false;
    } else {
      setPendingAmountError(false);
    }

    if (!loanAmount) {
      setLoanAmountError(true);
      isValid = false;
    } else {
      setLoanAmountError(false);
    }

    if (!loanPaymentDate) {
      setLoanPaymentDateError(true);
      isValid = false;
    } else {
      setLoanPaymentDateError(false);
    }

    if (!bankDetails) {
      setBankDetailsError(true);
      isValid = false;
    } else {
      setBankDetailsError(false);
    }

    if (!downPayment) {
      setDownPaymentError(true);
      isValid = false;
    } else {
      setDownPaymentError(false);
    }

    if (!downPaymentDate) {
      setDownPaymentDateError(true);
      isValid = false;
    } else {
      setDownPaymentDateError(false);
    }

    if (isValid) {
      setLoading(true);
      toast.success("Booking Added Successfully!");
      setTimeout(() => {
        setLoading(false);
        navigate("/view-booking");
      }, 2000);
    }
  };

  const handleProjectChange = (e) => {
    setProjectName(e.target.value);
    if (e.target.value) setProjectError(false);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    if (e.target.value) setUnitError(false);
  };

  const handleBookingDateChange = (e) => {
    setBookingDate(e.target.value);
    if (e.target.value) setBookingError(false);
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
    if (e.target.value) setCustomerNameError(false);
  };

  const handleCustomerContactChange = (e) => {
    setCustomerContact(e.target.value);
    if (e.target.value) setCustomerContactError
      (false);
  };

  const handleCustomerAddressChange = (e) => {
    setCustomerAddress(e.target.value);
    if (e.target.value) setCustomerAddressError(false);
  };

  const handleSaleAmountChange = (e) => {
    setSaleAmount(e.target.value);
    if (e.target.value) setSaleAmountError(false);
  };

  const handleNoOfInstallmentChange = (e) => {
    setNoOfInstallment(e.target.value);
    if (e.target.value) setNoOfInstallmentError(false);
  };

  const handleExtraChange = (e) => {
    setExtra(e.target.value);
    if (e.target.value) setExtraError(false);
  };

  const handlePaymentFrequencyChange = (e) => {
    setPaymentFrequency(e.target.value);
    if (e.target.value) setPaymentFrequencyError(false);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
    if (e.target.value) setDueDateError(false);
  };

  const handleWorkChange = (e) => {
    setWork(e.target.value);
    if (e.target.value) setWorkError(false);
  };

  const handlePaymentPlanChange = (e) => {
    setPaymentPlan(e.target.value);
    if (e.target.value) setPaymentPlanError(false);
  };

  const handleTokenAmountChange = (e) => {
    setTokenAmount(e.target.value);
    if (e.target.value) setTokenAmountError(false);
  };

  const handleTokenPaymentDateChange = (e) => {
    setTokenPaymentDate(e.target.value);
    if (e.target.value) setTokenPaymentDateError(false);
  };

  const handlePendingPaymentDateChange = (e) => {
    setPendingPaymentDate(e.target.value);
    if (e.target.value) setPendingPaymentDateError(false);
  };

  const handlePendingAmountChange = (e) => {
    setPendingAmount(e.target.value);
    if (e.target.value) setPendingAmountError(false);
  };

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
    if (e.target.value) setLoanAmountError(false);
  };

  const handleLoanPaymentDateChange = (e) => {
    setLoanPaymentDate(e.target.value);
    if (e.target.value) setLoanPaymentDateError(false);
  };

  const handleBankDetailsChange = (e) => {
    setBankDetails(e.target.value);
    if (e.target.value) setBankDetailsError(false);
  };

  const handleInstallmentChange = (e) => {
    const isChecked = e.target.checked;
    setInstallment(isChecked);
    setInstallmentError(!isChecked);
  };

  const handleDownPaymentChange = (e) => {
    setDownPayment(e.target.value);
    if (e.target.value) setDownPaymentError(false);
  };

  const handleDownPaymentDateChange = (e) => {
    setDownPaymentDate(e.target.value);
    if (e.target.value) setDownPaymentDateError(false);
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate |View Booking</title>
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
                    <p class="text-dark fs-5">Project Details</p>
                    <div className="row">
                      <div className="col">
                        <select
                          className={`form-control bg-white ${projectError ? "is-invalid" : ""}`}
                          value={projectName}
                          ref={projectRef}
                          onChange={handleProjectChange}
                          onKeyDown={(e) => handleEnter(e, unitRef)}
                        >
                          <option value="">Project Name</option>
                          <option value="demo">demo</option>
                        </select>
                        {projectError && (
                          <div className="invalid-feedback">Please select a Project</div>
                        )}
                      </div>
                      <div className="col">
                        <select
                          className={`form-control bg-white ${unitError ? "is-invalid" : ""}`}
                          value={unit}
                          ref={unitRef}
                          onChange={handleUnitChange}
                          onKeyDown={(e) => handleEnter(e, dateRef)}
                        >
                          <option value="">Unit No</option>
                          <option value="demo">1</option>
                        </select>
                        {unitError && (
                          <div className="invalid-feedback">Please select a Unit</div>
                        )}
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input
                          type="text"
                          id="date"
                          ref={dateRef}
                          className={`form-control bg-white ${bookingError ? "is-invalid" : ""}`}
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
                            handleBookingDateChange(e);
                            const inputDate = e.target.value;
                            const [day, month, year] = inputDate.split("-");
                            if (day && month && year) {
                              const formattedDate = `${year}-${month}-${day}`;
                              const parsedDate = new Date(formattedDate);
                              if (!isNaN(parsedDate)) {
                                setBookingDate(parsedDate.toISOString().slice(0, 10));
                              } else {
                                console.error("Invalid date format");
                              }
                            }
                          }}
                          onKeyDown={(e) => handleEnter(e, customerNameRef)}
                          placeholder="Booking Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                        {bookingError && (
                          <div className="invalid-feedback">Please select a Booking Date</div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>
                    <hr />
                    <p className="text-dark fs-5">Customer Details</p>
                    <div className="row">
                      <div className="col position-relative">
                        <input
                          type="text"
                          className={`form-control ${customerNameError ? "is-invalid" : ""}`}
                          id="name"
                          placeholder="Name"
                          name="name"
                          value={customerName}
                          ref={customerNameRef}
                          onChange={handleCustomerNameChange}
                          onKeyDown={(e) => handleEnter(e, customerContactRef)}
                        />
                        <i className="bi bi-plus-circle-fill icon-1"></i>
                        {customerNameError && (
                          <div className="invalid-feedback">Enter a Customer Name</div>
                        )}
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          className={`form-control ${customerContactError ? "is-invalid" : ""}`}
                          id="Contact No"
                          placeholder="Contact No"
                          name="Contact No"
                          value={customerContact}
                          onChange={handleCustomerContactChange}
                          onKeyDown={(e) => handleEnter(e, customerAddressRef)}
                          ref={customerContactRef}
                        />
                        <i className="bi bi-plus-circle-fill icon-2"></i>
                        {customerContactError && (
                          <div className="invalid-feedback">Enter a Customer Contact Number</div>
                        )}
                      </div>
                    </div>
                    <div className="row w-75">
                      <div className="col pt-4">
                        <textarea
                          className={`form-control ${customerAddressError ? "is-invalid" : ""}`}
                          placeholder="Address"
                          id="floatingTextarea"
                          value={customerAddress}
                          onChange={handleCustomerAddressChange}
                          onKeyDown={(e) => handleEnter(e, saleAmountRef)}
                          ref={customerAddressRef}
                        ></textarea>
                        {customerAddressError && (
                          <div className="invalid-feedback">Enter a Customer Address</div>
                        )}
                      </div>
                    </div>
                    <hr />
                    <p class="text-dark fs-5">Payment Details</p>
                    <div className="row">
                      <div className="col">
                        <input
                          type="number"
                          className={`form-control ${saleAmountError ? "is-invalid" : ""}`}
                          id="Sale Deed Amount"
                          placeholder="Sale Deed Amount"
                          name="Sale Deed Amount"
                          value={saleAmount}
                          onChange={handleSaleAmountChange}
                          onKeyDown={(e) => handleEnter(e, extraRef)}
                          ref={saleAmountRef}
                        />
                        {saleAmountError && (
                          <div className="invalid-feedback">Enter a Sale Deed Amount</div>
                        )}
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          className={`form-control ${extraError ? "is-invalid" : ""}`}
                          id="Extra Work Amount"
                          placeholder="Extra Work Amount"
                          name="Extra Work Amount"
                          value={extra}
                          onChange={handleExtraChange}
                          onKeyDown={(e) => handleEnter(e, workRef)}
                          ref={extraRef}
                        />
                        {extraError && (
                          <div className="invalid-feedback">Enter an Extra Work Amount</div>
                        )}
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input
                          type="number"
                          className={`form-control ${workError ? "is-invalid" : ""}`}
                          id="Work Amount"
                          placeholder="Work Amount"
                          name="Work Amount"
                          value={work}
                          onChange={handleWorkChange}
                          onKeyDown={(e) => handleEnter(e, paymentPlanRef)}
                          ref={workRef}
                        />
                        {workError && (
                          <div className="invalid-feedback">Enter Work Amount</div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>
                    <hr />
                    <p class="text-dark fs-5">Payment Terms</p>
                    <div className="row">
                      <div className="col">
                        <select
                          className={`form-control bg-white ${paymentplanError ? "is-invalid" : ""}`}
                          value={paymentplan}
                          onChange={(e) => {
                            handlePaymentPlanChange(e);
                            setPaymentPlan(e.target.value);
                          }}
                          ref={paymentPlanRef}
                        >
                          <option value="">Payment Plan</option>
                          <option value="fullamount">Full Amount</option>
                          <option value="installment">Installment</option>
                          <option value="loan">Loan</option>
                        </select>
                        {paymentplanError && (
                          <div className="invalid-feedback">Please select a Payment Plan</div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>
                    {paymentplan === "fullamount" && (
                      <>
                        <div className="row pt-4">
                          <div className="col">
                            <input
                              type="number"
                              className={`form-control ${tokenAmountError ? "is-invalid" : ""}`}
                              id="tokenamount"
                              placeholder="Token Amount"
                              name="tokenamount"
                              value={tokenAmount}
                              onChange={handleTokenAmountChange}
                              onKeyDown={(e) => handleEnter(e, tokenPaymentDateRef)}
                              ref={tokenAmountRef}
                            />
                            {tokenAmountError && (
                              <div className="invalid-feedback">Enter Token Amount</div>
                            )}
                          </div>
                          <div className="col">
                            <input
                              type="text"
                              id="date"
                              ref={tokenPaymentDateRef}
                              className={`form-control ${tokenPaymentDateError ? "is-invalid" : ""}`}
                              value={
                                tokenPaymentDate
                                  ? new Date(tokenPaymentDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  })
                                  : ""
                              }
                              onChange={(e) => handleTokenPaymentDateChange(e)}
                              placeholder="Token Payment Date"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                            />
                            {tokenPaymentDateError && (
                              <div className="invalid-feedback">Please select a Token Payment Date</div>
                            )}
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col">
                            <input
                              type="number"
                              id="pendingamount"
                              placeholder="Pending Amount"
                              name="pendingamount"
                              className={`form-control ${pendingAmountError ? "is-invalid" : ""}`}
                              value={pendingAmount}
                              onChange={handlePendingAmountChange}
                              onKeyDown={(e) => handleEnter(e, pendingPaymentDateRef)}
                              ref={pendingAmountRef}
                            />
                            {pendingAmountError && (
                              <div className="invalid-feedback">Enter Pending Amount</div>
                            )}
                          </div>
                          <div className="col">
                            <input
                              type="text"
                              id="date"
                              ref={pendingPaymentDateRef}
                              className={`form-control ${pendingPaymentDateError ? "is-invalid" : ""}`}
                              value={
                                pendingPaymentDate
                                  ? new Date(pendingPaymentDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  })
                                  : ""
                              }
                              onChange={(e) => handlePendingPaymentDateChange(e)}
                              placeholder="Pending Payment Date"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                            />
                            {pendingPaymentDateError && (
                              <div className="invalid-feedback">Please select a Pending Payment Date</div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {paymentplan === "loan" && (
                      <div>
                        <div className="row pt-4">
                          <div className="col">
                            <input
                              type="number"
                              id="loanamount"
                              placeholder="Loan Amount"
                              name="pendingamount"
                              className={`form-control ${loanAmountError ? "is-invalid" : ""}`}
                              value={loanAmount}
                              onChange={handleLoanAmountChange}
                              onKeyDown={(e) => handleEnter(e, loanPaymentDateRef)}
                              ref={loanAmountRef}
                            />
                            {loanAmountError && (
                              <div className="invalid-feedback">Enter Loan Amount</div>
                            )}
                          </div>
                          <div className="col">
                            <input
                              type="text"
                              id="date"
                              ref={loanPaymentDateRef}
                              className={`form-control ${loanPaymentDateError ? "is-invalid" : ""}`}
                              value={
                                loanPaymentDate
                                  ? new Date(loanPaymentDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  })
                                  : ""
                              }
                              onChange={(e) => {
                                handleLoanPaymentDateChange(e);
                                const inputDate = e.target.value;
                                const [year, month, day] = inputDate.split("-");
                                if (day && month && year) {
                                  const formattedDate = `${year}-${month}-${day}`;
                                  const parsedDate = new Date(formattedDate);
                                  if (!isNaN(parsedDate)) {
                                    setPendingPaymentDate(parsedDate.toISOString().slice(0, 10));
                                  } else {
                                    console.error("Invalid date format");
                                  }
                                }
                              }}
                              onKeyDown={(e) => handleEnter(e, bankDetailsRef)}
                              placeholder="Loan Payment Date"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                            />
                            {loanPaymentDateError && (
                              <div className="invalid-feedback">Please select a Loan Payment Date</div>
                            )}
                          </div>
                        </div>
                        <div className="row w-75">
                          <div className="col pt-4">
                            <textarea
                              className={`form-control ${bankDetailsError ? "is-invalid" : ""}`}
                              placeholder="Bank Details"
                              id="floatingTextarea"
                              value={bankDetails}
                              onChange={handleBankDetailsChange}
                              onKeyDown={(e) => handleEnter(e, downPaymentRef)}
                              ref={bankDetailsRef}
                            ></textarea>
                            {bankDetailsError && (
                              <div className="invalid-feedback">Enter Bank Details</div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {paymentplan === "installment" && (
                      <div>
                        <div className="row pt-4">
                          <div className="col">
                            <input
                              type="number"
                              id="downpayment"
                              placeholder="Down Payment"
                              name="downpayment"
                              className={`form-control ${downPaymentError ? "is-invalid" : ""}`}
                              value={downPayment}
                              onChange={handleDownPaymentChange}
                              onKeyDown={(e) => handleEnter(e, downPaymentDateRef)}
                              ref={downPaymentRef}
                            />
                            {downPaymentError && (
                              <div className="invalid-feedback">Enter Down Payment</div>
                            )}
                          </div>
                          <div className="col">
                            <input
                              type="text"
                              id="date"
                              ref={downPaymentDateRef}
                              className={`form-control ${downPaymentDateError ? "is-invalid" : ""}`}
                              value={
                                downPaymentDate
                                  ? new Date(downPaymentDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  })
                                  : ""
                              }
                              onChange={(e) => {
                                handleDownPaymentDateChange(e);
                                const inputDate = e.target.value;
                                const [day, month, year] = inputDate.split("-");
                                if (day && month && year) {
                                  const formattedDate = `${day}-${month}-${year}`;
                                  const parsedDate = new Date(formattedDate);
                                  if (!isNaN(parsedDate)) {
                                    setDownPaymentDate(parsedDate.toISOString().slice(0, 10));
                                  } else {
                                    console.error("Invalid date format");
                                  }
                                }
                              }}
                              onKeyDown={(e) => handleEnter(e, paymentFrequencyRef)}
                              placeholder="Down Payment Date"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                            />
                            {downPaymentDateError && (
                              <div className="invalid-feedback">Please select a Down Payment Date</div>
                            )}
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col">
                            <select
                              className={`form-control bg-white ${paymentFrequencyError ? "is-invalid" : ""}`}
                              value={paymentFrequency}
                              onChange={handlePaymentFrequencyChange}
                              onKeyDown={(e) => handleEnter(e, dueDateRef)}
                              ref={paymentFrequencyRef}
                            >
                              <option value="">Payment Frequency</option>
                              <option value="1-month">1 Month</option>
                              <option value="3-months">3 Months</option>
                              <option value="6-months">6 Months</option>
                              <option value="12-months">12 Months</option>
                            </select>
                            {paymentFrequencyError && (
                              <div className="invalid-feedback">Please select a Payment Frequency</div>
                            )}
                          </div>
                          <div className="col">
                            <input
                              type="text"
                              id="date"
                              ref={dueDateRef}
                              className={`form-control ${dueDateError ? "is-invalid" : ""}`}
                              value={
                                dueDate
                                  ? new Date(dueDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  })
                                  : ""
                              }
                              onChange={(e) => {
                                handleDueDateChange(e);
                                const inputDate = e.target.value;
                                const [day, month, year] = inputDate.split("-");
                                if (day && month && year) {
                                  const formattedDate = `${day}-${month}-${year}`;
                                  const parsedDate = new Date(formattedDate);
                                  if (!isNaN(parsedDate)) {
                                    setDueDate(parsedDate.toISOString().slice(0, 10));
                                  } else {
                                    console.error("Invalid date format");
                                  }
                                }
                              }}
                              onKeyDown={(e) => handleEnter(e, noOfInstallmentRef)}
                              placeholder="Due Date"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                            />
                            {dueDateError && (
                              <div className="invalid-feedback">Please select a Due Date</div>
                            )}
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col">
                            <input
                              type="number"
                              id="noofinstallment"
                              placeholder="No Of Installments"
                              name="noofinstallment"
                              className={`form-control ${noOfInstallmentError ? "is-invalid" : ""}`}
                              value={noOfInstallment}
                              onChange={handleNoOfInstallmentChange}
                              onKeyDown={(e) => handleEnter(e, installmentRef)}
                              ref={noOfInstallmentRef}
                            />
                            {noOfInstallmentError && (
                              <div className="invalid-feedback">Enter No Of Installments</div>
                            )}
                          </div>
                          <div className="col"></div>
                        </div>
                        <div class="pt-4 w-50">
                          <table class="table table-bordered text-center">
                            <thead>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Installment 1</td>
                                <td>01-01-2025</td>
                                <td>2,00,000</td>
                              </tr>
                              <tr>
                                <td>Installment 2</td>
                                <td>01-02-2025</td>
                                <td>2,00,000</td>
                              </tr>
                              <tr>
                                <td>Installment 3</td>
                                <td>01-03-2025</td>
                                <td>2,00,000</td>
                              </tr>
                              <tr>
                                <td>Installment 4</td>
                                <td>01-04-2025</td>
                                <td>2,00,000</td>
                              </tr>
                              <tr>
                                <td>Installment 5</td>
                                <td>01-05-2025</td>
                                <td>2,00,000</td>
                              </tr>
                              <tr>
                                <td>Installment 6</td>
                                <td>01-06-2025</td>
                                <td>2,00,000</td>
                              </tr>
                              <tr>
                                <td>Installment 7</td>
                                <td>01-07-2025</td>
                                <td>2,00,000</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    <div className="form-check pt-4">
                      <input
                        type="checkbox"
                        className={`form-check-input ${installmentError ? "is-invalid" : ""}`}
                        value={installment}
                        onChange={handleInstallmentChange}
                        onKeyDown={(e) => handleEnter(e, submitRef)}
                        ref={installmentRef}
                        id="installmentNotify"
                      />
                      Installment Notify
                      {installmentError && (
                        <div className="invalid-feedback">Please check the Installment Notify</div>
                      )}
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          ref={submitRef}
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Booking;
