import React, { useRef, useState, useEffect, useCallback } from "react";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { Spinner } from "react-bootstrap";

function Booking() {
  // const [selectOption, setSelectOption] = useState("");
  // const [loanAmount, setLoanAmount] = useState("");
  // const [bankDetails, setBankDetails] = useState("");
  // const [paymentFrequence, setPaymentFrequence] = useState(""); 
  // const [amount, setAmount] = useState("");
  // const [totalInstallments, setTotalInstallments] = useState("");
  // const [tokenpaymentDate, setTokenPaymentDate] = useState("");
  // const [pendingpaymentDate, setPendingPaymentDate] = useState("");
  // const [downPayment, setDownPayment] = useState("");
  // const [paymentDuration, setPaymentDuration] = useState("");

  const [projectName, setProjectName] = useState("");
  const [unit, setUnit] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [extra, setExtra] = useState("");
  const [work, setWork] = useState("");
  const [installment, setInstallment] = useState("");

  const [projectError, setProjectError] = useState(false);
  const [unitError, setUnitError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [customerNameError, setCustomerNameError] = useState("");
  const [customerContactError, setCustomerContactError] = useState("");
  const [customerAddressError, setCustomerAddressError] = useState("");
  const [saleAmountError, setSaleAmountError] = useState("");
  const [extraError, setExtraError] = useState("");
  const [workError, setWorkError] = useState("");
  const [installmentError, setInstallmentError] = useState("");

  const projectRef = useRef(null);
  const unitRef = useRef(null);
  const dateRef = useRef(null);
  const customerNameRef = useRef(null);
  const customerContactRef = useRef(null);
  const customerAddressRef = useRef(null);
  const saleAmountRef = useRef(null);
  const extraRef = useRef(null);
  const workRef = useRef(null);
  const installmentRef = useRef(null);
  const submitRef = useRef(null);

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

  const handleExtraChange = (e) => {
    setExtra(e.target.value);
    if (e.target.value) setExtraError(false);
  };

  const handleWorkChange = (e) => {
    setWork(e.target.value);
    if (e.target.value) setWorkError(false);
  };

  const handleInstallmentChange = (e) => {
    setInstallment(e.target.value);
    if (e.target.value) setInstallmentError(false);
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
                          <option value="1">1</option>
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
                          onKeyDown={(e) => handleEnter(e, submitRef)}
                          ref={workRef}
                        />
                        {workError && (
                          <div className="invalid-feedback">Enter Work Amount</div>
                        )}
                      </div>
                      <div className="col"></div>
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
      </div>
    </>
  );
}

export default Booking;
