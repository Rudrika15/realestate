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
  const [tokenpaymentDate, setTokenPaymentDate] = useState("");
  const [pendingpaymentDate, setPendingPaymentDate] = useState("");
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
                    <p style={{ fontSize: "1.1rem", color: "black" }}>
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
                    <div className="row">
                      <div className="col">
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
                            if (day && month && year) {
                              const formattedDate = `${day}-${month}-${year}`;
                              const parsedDate = new Date(formattedDate);
                              if (!isNaN(parsedDate)) {
                                setBookingDate(parsedDate.toISOString().slice(0, 10));
                              } else {
                                console.error("Invalid date format");
                              }
                            }
                          }}
                          placeholder="Booking Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                      </div>
                      <div className="col"></div>
                    </div>
                    <hr />
                    <p
                      style={{ fontSize: "1.1rem", color: "black" }}
                    >
                      Customer Details
                    </p>
                    <div className="row">
                      <div className="col position-relative">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Name"
                          name="name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          onKeyPress={(e) => handleEnter(e, customerContactRef)}
                          ref={customerNameRef}
                        />
                        <i
                          className="bi bi-plus-circle-fill"
                          style={{
                            position: 'absolute',
                            right: '-0.4rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'black',
                            cursor: 'pointer',
                          }}
                        ></i>
                      </div>

                      <div className="col">
                        <input
                          type="number"
                          className="form-control"
                          id="Contact No"
                          placeholder="Contact No"
                          name="Contact No"
                          value={customerContact}
                          onChange={(e) => setCustomerContact(e.target.value)}
                          onKeyPress={(e) => handleEnter(e, customerAddressRef)}
                          ref={customerContactRef}
                        />
                        <i
                          className="bi bi-plus-circle-fill"
                          style={{
                            position: 'absolute',
                            right: '27px',
                            transform: 'translateY(-135%)',
                            color: 'black',
                            cursor: 'pointer',
                          }}
                        ></i>
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
                        <select
                          className="form-select mb-3"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          onKeyPress={(e) => handleEnter(e, unitRef)}
                          ref={inputRef}
                        >
                          <option value="">Payment Plan</option>
                          <option value="fullamount">Full Amount</option>
                          <option value="installment">Installment</option>
                          <option value="loan">Loan</option>
                        </select>
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row">
                      <div className="col">
                      <input
                          type="text"
                          className="form-control"
                          id="tokenamount"
                          placeholder="Token Amount"
                          name="tokenamount"
                          // value="tokenamount"
                        />
                      </div>
                      <div className="col">
                      <input
                          type="text"
                          id="date"
                          className="form-control"
                          value={
                            tokenpaymentDate
                              ? new Date(tokenpaymentDate).toLocaleDateString("en-GB", {
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
                                setTokenPaymentDate(parsedDate.toISOString().slice(0, 10));
                              } else {
                                console.error("Invalid date format");
                              }
                            }
                          }}
                          placeholder="Token Payment Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                      <input
                          type="text"
                          className="form-control"
                          id="pendingamount"
                          placeholder="Pending Amount"
                          name="pendingamount"
                          // value="pendingamount"
                        />
                      </div>
                      <div className="col">
                      <input
                          type="text"
                          id="date"
                          className="form-control"
                          value={
                            pendingpaymentDate
                              ? new Date(pendingpaymentDate).toLocaleDateString("en-GB", {
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
                                setPendingPaymentDate(parsedDate.toISOString().slice(0, 10));
                              } else {
                                console.error("Invalid date format");
                              }
                            }
                          }}
                          placeholder="Pending Payment Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
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
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div >
      </div >
    </>
  );
}

export default Booking;
