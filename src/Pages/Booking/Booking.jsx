import React, { useRef, useState, useEffect, useCallback } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import {
  addBroker,
  getBroker,
  getProject,
  getProjectWiseStage,
  projectWiseStage,
} from "../../Api/DevanshiApi";
import { projectWiseUnit } from "../../Api/ApiDipak";

function Booking() {
  const [projectName, setProjectName] = useState("");
  const [unit, setUnit] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [remark, setRemark] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [extra, setExtra] = useState("");
  const [work, setWork] = useState("");
  const [paymentplan, setPaymentPlan] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [tokenPaymentDate, setTokenPaymentDate] = useState("");
  const [pendingAmount, setPendingAmount] = useState("");
  const [pendingPaymentDate, setPendingPaymentDate] = useState("");
  const [showTokenFields, setShowTokenFields] = useState(false);
  const [showTokenFields1, setShowTokenFields1] = useState(false);
  const [showTokenFields2, setShowTokenFields2] = useState(false);
  const [showTokenFields3, setShowTokenFields3] = useState(false);
  const [installment, setInstallment] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [loanPaymentDate, setLoanPaymentDate] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [downPaymentDate, setDownPaymentDate] = useState("");
  const [noOfInstallment, setNoOfInstallment] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [bankName, setBankName] = useState("");
  const [status, setStatus] = useState("");
  const [agent, setAgent] = useState("");
  const [projectWiseStage, setProjectWiseStage] = useState("");

  const [projectError, setProjectError] = useState(false);
  const [unitError, setUnitError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [customerNameError, setCustomerNameError] = useState("");
  const [customerContactError, setCustomerContactError] = useState("");
  const [customerAddressError, setCustomerAddressError] = useState("");
  const [remarkError, setRemarkError] = useState("");
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
  const [amountError, setAmountError] = useState("");
  const [loanDateError, setLoanDateError] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [agentError, setAgentError] = useState("");

  const projectRef = useRef(null);
  const unitRef = useRef(null);
  const dateRef = useRef(null);
  const customerNameRef = useRef(null);
  const customerContactRef = useRef(null);
  const customerAddressRef = useRef(null);
  const remarkRef = useRef(null);
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
  const amountRef = useRef(null);
  const brokerNameRef = useRef(null);
  const brokerAddressRef = useRef(null);
  const brokerContactRef = useRef(null);
  const modalSubmitRef = useRef(null);
  const loanDateRef = useRef(null);
  const bankNameRef = useRef(null);
  const statusRef = useRef(null);
  const agentRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [brokers, setBrokers] = useState([]);
  const [brokerName, setBrokerName] = useState("");
  const [brokerNameError, setbrokerNameError] = useState("");
  const [brokerContactError, setbrokerContactError] = useState("");
  const [brokerAddressError, setbrokerAddressError] = useState("");
  const [brokerMobileNumber, setbrokerMobileNumber] = useState("");
  const [brokerAddress, setBrokerAddress] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const remainingAmount = saleAmount - tokenAmount - downPayment;
  const installmentAmount = remainingAmount / noOfInstallment;

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue === "addBroker") {
      setModalType("Add Broker");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOption("");
    setBrokerName("");
    setbrokerMobileNumber("");
    setBrokerAddress("");
  };

  const fetchBroker = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${getBroker}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === true) {
        setBrokers(response.data.data);
      } else {
        toast.error("Failed to fetch Broker data!");
      }
    } catch (error) {
      console.error("Error fetching broker:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const storeBroker = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!brokerName) {
      setbrokerNameError(true);
      isValid = false;
    } else {
      setbrokerNameError(false);
    }

    if (!brokerAddress) {
      setbrokerAddressError(true);
      isValid = false;
    } else {
      setbrokerAddressError(false);
    }

    if (!brokerMobileNumber) {
      setbrokerMobileNumber(true);
      isValid = false;
    } else {
      setbrokerMobileNumber(false);
    }

    if (!isValid) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        addBroker,
        {
          brokerName,
          brokerMobileNumber,
          brokerAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data;
      if (result.status) {
        setBrokers((prevBrokers) => [
          ...prevBrokers,
          {
            id: result.data.id,
            brokerName: result.data.brokerName,
            brokerAddress: result.data.brokerAddress,
            brokerMobileNumber: result.data.brokerMobileNumber,
          },
        ]);
        setBrokerName("");
        setbrokerMobileNumber("");
        setBrokerAddress("");
        handleCloseModal();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error adding broker:", error);
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
    }
  };

  const [rows, setRows] = useState([{ downPayment: "", downPaymentDate: "" }]);

  const [rows1, setRows1] = useState([
    { customerName: "", customerContact: "" },
  ]);

  const handleAddRow = () => {
    const lastRow = rows[rows.length - 1];
    if (lastRow.downPayment && lastRow.downPaymentDate) {
      return;
    }
    setRows([...rows, { downPayment: "", downPaymentDate: "" }]);
  };

  const handleAddRow1 = () => {
    const lastRow = rows1[rows1.length - 1];
    if (lastRow.customerName && lastRow.customerContact) {
      return;
    }
    setRows1([...rows1, { customerName: "", customerContact: "" }]);
  };

  const handleInputChangeGeneric = (index, field, value, rowArrayName) => {
    if (rowArrayName === "rows1") {
      const updatedRows1 = [...rows1];
      updatedRows1[index][field] = value;

      if (field === "customerName" && value.trim() !== "") {
        setCustomerNameError(false);
      }
      if (field === "customerContact" && value.trim() !== "") {
        setCustomerContactError(false);
      }

      setRows1(updatedRows1);
    } else if (rowArrayName === "rows") {
      const updatedRows = [...rows];
      updatedRows[index][field] = value;

      if (field === "downPayment" && value.trim() !== "") {
        setDownPaymentError(false);
      }
      if (field === "downPaymentDate" && value.trim() !== "") {
        setDownPaymentDateError(false);
      }

      setRows(updatedRows);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

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

  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField?.current) {
      e.preventDefault();
      nextField.current.focus();
    }
    if (e.key === "Enter" && nextField?.current) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getFrequencyInMonths = (frequency) => {
    switch (frequency) {
      case "Monthly":
        return 1;
      case "Bi-monthly":
        return 2;
      case "Quarterly":
        return 3;
      case "Semi-Annually":
        return 6;
      case "Annually":
        return 12;
      default:
        return 0;
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

    if (!amount) {
      setAmountError(true);
      isValid = false;
    } else {
      setAmountError(false);
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

    if (!remark) {
      setRemarkError(true);
      isValid = false;
    } else {
      setRemarkError(false);
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
      setNoOfInstallmentError(true);
      isValid = false;
    } else {
      setNoOfInstallmentError(false);
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
    const projectId = e.target.value;
    setSelectedProject(projectId);
    setSelectedUnit("");
    fetchUnit(projectId);
    fetchProjectWiseStage(projectId);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (e.target.value) setAmountError(false);
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const handleBookingDateChange = (e) => {
    setBookingDate(e.target.value);
    if (e.target.value) setBookingError(false);
  };

  const handleCustomerNameChange = (index, value) => {
    const updatedCustomerNames = [...customerName];
    updatedCustomerNames[index] = value;
    setCustomerName(updatedCustomerNames);
    if (value) setCustomerNameError(false);
  };

  const handleCustomerContactChange = (index, value) => {
    const updatedCustomerNames = [...customerContact];
    updatedCustomerNames[index] = value;
    setCustomerContact(updatedCustomerNames);
    if (value) setCustomerContactError(false);
  };

  const handleCustomerAddressChange = (e) => {
    setCustomerAddress(e.target.value);
    if (e.target.value) setCustomerAddressError(false);
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
    if (e.target.value) setRemarkError(false);
  };

  const handleSaleAmountChange = (e) => {
    console.log("samount Selected:", e.target.value);
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

  const handleBankChange = (e) => {
    setBankName(e.target.value);
    if (e.target.value) setBankNameError(false);
  };

  const handleTokenPaymentDateChange = (e) => {
    setTokenPaymentDate(e.target.value);
    if (e.target.value) setTokenPaymentDateError(false);
  };

  const handleLoanDateChange = (e) => {
    setLoanDate(e.target.value);
    if (e.target.value) setLoanDateError(false);
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

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState([]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await axios.get(getProject, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === true && response.data.data) {
        setProjects(response.data.data);
      } else {
        console.error("Projects data not found in the response.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUnit = async (projectId) => {
    if (!projectId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found! Please log in.");
        navigate("/");
        return;
      }

      const response = await axios.get(`${projectWiseUnit}/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === true && response.data.data) {
        setUnits(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Session expired! Please log in again.");
        navigate("/");
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectWiseStage = async (projectId) => {
    if (!projectId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        toast.error("Token not found! Please log in.");
        navigate("/");
        return;
      }

      const response = await axios.get(`${getProjectWiseStage}/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === true) {
        setProjectWiseStage(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Session expired! Please log in again.");
        navigate("/");
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchUnit();
    fetchBroker();
    fetchProjectWiseStage();
  }, []);

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
                          className="form-control bg-white"
                          value={selectedOption}
                          onChange={handleSelectChange}
                        >
                          <option value="">Select a Broker</option>
                          <option value="addBroker">Add Broker</option>
                          {brokers.map((broker) => (
                            <option key={broker.id} value={broker.id}>
                              {broker.brokerName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col"></div>
                    </div>
                    <Modal
                      show={showModal}
                      onHide={handleCloseModal}
                      dialogClassName="custom-modal"
                    >
                      <Modal.Header
                        closeButton
                        className="d-flex justify-content-center"
                      >
                        <Modal.Title className="w-100 text-center">
                          {modalType} Broker
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="row pt-4">
                          <div className="col position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Name"
                              name="name"
                              ref={brokerNameRef}
                              onKeyDown={(e) =>
                                handleEnter(e, brokerContactRef)
                              }
                              value={brokerName}
                              onChange={(e) => setBrokerName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col position-relative">
                            <input
                              type="number"
                              className="form-control"
                              id="Mobile Number"
                              placeholder="Mobile Number"
                              name="Mobile Number"
                              ref={brokerContactRef}
                              value={brokerMobileNumber}
                              onKeyDown={(e) =>
                                handleEnter(e, brokerAddressRef)
                              }
                              onChange={(e) =>
                                setbrokerMobileNumber(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col position-relative">
                            <textarea
                              className="form-control"
                              placeholder="Address"
                              id="floatingTextarea"
                              value={brokerAddress}
                              ref={brokerAddressRef}
                              onKeyDown={(e) => handleEnter(e, modalSubmitRef)}
                              onChange={(e) => setBrokerAddress(e.target.value)}
                            />
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-secondary w-25"
                          onClick={storeBroker}
                          ref={modalSubmitRef}
                        >
                          Submit
                        </button>
                      </Modal.Footer>
                    </Modal>
                    <div className="row pt-4">
                      <div className="col">
                        <select
                          className={`form-control bg-white ${projectError ? "is-invalid" : ""}`}
                          value={selectedProject}
                          ref={projectRef}
                          onChange={handleProjectChange}
                          onKeyDown={(e) => handleEnter(e, unitRef)}
                        >
                          <option value="" disabled>
                            Project Name
                          </option>
                          {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                              {project.projectName}
                            </option>
                          ))}
                        </select>
                        {projectError && (
                          <div className="invalid-feedback">Please select a Project</div>
                        )}
                      </div>

                      <div className="col">
                        <select
                          className={`form-control bg-white ${unitError ? "is-invalid" : ""}`}
                          value={selectedUnit}
                          ref={unitRef}
                          onChange={handleUnitChange}
                          onKeyDown={(e) => handleEnter(e, dateRef)}
                        >
                          <option value="" disabled>
                            Unit No
                          </option>
                          {units.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                              {unit.unitNo}
                            </option>
                          ))}
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
                          className={`form-control ${bookingError ? "is-invalid" : ""
                            }`}
                          value={formatDate(bookingDate)}
                          onChange={(e) => handleBookingDateChange(e)}
                          onKeyDown={(e) => handleEnter(e, customerNameRef)}
                          placeholder="Booking Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                        {bookingError && (
                          <div className="invalid-feedback">
                            Please select a booking Date
                          </div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>
                    <hr />
                    <p className="text-dark fs-5">Customer Details</p>
                    {rows1.map((row, index) => (
                      <div className="row pt-2 mb-3" key={`row1-${index}`}>
                        <div className="col position-relative">
                          <input
                            type="text"
                            className={`form-control ${customerNameError ? "is-invalid" : ""
                              }`}
                            id="name"
                            placeholder="Name"
                            name="name"
                            value={row.customerName}
                            ref={customerNameRef}
                            onChange={(e) =>
                              handleInputChangeGeneric(
                                index,
                                "customerName",
                                e.target.value,
                                "rows1"
                              )
                            }
                            onKeyDown={(e) =>
                              handleEnter(e, customerContactRef)
                            }
                          />
                          {customerNameError && (
                            <div className="invalid-feedback">
                              Enter a Customer Name
                            </div>
                          )}
                        </div>
                        <div className="col">
                          <input
                            type="number"
                            className={`form-control ${customerContactError ? "is-invalid" : ""
                              }`}
                            id="Contact No"
                            placeholder="Contact No"
                            name="Contact No"
                            value={row.customerContact}
                            onChange={(e) =>
                              handleInputChangeGeneric(
                                index,
                                "customerContact",
                                e.target.value,
                                "rows1"
                              )
                            }
                            onKeyDown={(e) =>
                              handleEnter(e, customerAddressRef)
                            }
                            ref={customerContactRef}
                          />
                          {index === rows1.length - 1 && (
                            <i
                              className="bi bi-plus-circle-fill icon-2"
                              onClick={() =>
                                setRows1([
                                  ...rows1,
                                  { customerName: "", customerContact: "" },
                                ])
                              }
                            ></i>
                          )}
                          {customerContactError && (
                            <div className="invalid-feedback">
                              Enter a Customer Contact Number
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="row">
                      <div className="col pt-2">
                        <textarea
                          className={`form-control ${customerAddressError ? "is-invalid" : ""
                            }`}
                          placeholder="Address"
                          id="floatingTextarea"
                          value={customerAddress}
                          onChange={handleCustomerAddressChange}
                          onKeyDown={(e) => handleEnter(e, remarkRef)}
                          ref={customerAddressRef}
                        ></textarea>
                        {customerAddressError && (
                          <div className="invalid-feedback">
                            Enter a Customer Address
                          </div>
                        )}
                      </div>
                      <div className="col  pt-2">
                        <div className="col position-relative">
                          <textarea
                            className={`form-control ${remarkError ? "is-invalid" : ""
                              }`}
                            placeholder="Remark"
                            id="floatingTextarea"
                            value={remark}
                            onChange={handleRemarkChange}
                            onKeyDown={(e) => handleEnter(e, saleAmountRef)}
                            ref={remarkRef}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <p class="text-dark fs-5">Payment Details</p>
                    <div className="row">
                      <div className="col">
                        <input
                          type="number"
                          className={`form-control ${saleAmountError ? "is-invalid" : ""
                            }`}
                          id="Sale Deed Amount"
                          placeholder="Sale Deed Amount"
                          name="Sale Deed Amount"
                          value={saleAmount}
                          onChange={handleSaleAmountChange}
                          onKeyDown={(e) => handleEnter(e, extraRef)}
                          ref={saleAmountRef}
                        />
                        {saleAmountError && (
                          <div className="invalid-feedback">
                            Enter a Sale Deed Amount
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          className={`form-control ${extraError ? "is-invalid" : ""
                            }`}
                          id="Extra Work Amount"
                          placeholder="Extra Work Amount"
                          name="Extra Work Amount"
                          value={extra}
                          onChange={handleExtraChange}
                          onKeyDown={(e) => handleEnter(e, workRef)}
                          ref={extraRef}
                        />
                        {extraError && (
                          <div className="invalid-feedback">
                            Enter an Extra Work Amount
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input
                          type="number"
                          className={`form-control ${workError ? "is-invalid" : ""
                            }`}
                          id="Work Amount"
                          placeholder="Work Amount"
                          name="Work Amount"
                          value={work}
                          onChange={handleWorkChange}
                          onKeyDown={(e) => handleEnter(e, tokenAmountRef)}
                          ref={workRef}
                        />
                        {workError && (
                          <div className="invalid-feedback">
                            Enter Work Amount
                          </div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>
                    <hr />

                    <p class="text-dark fs-5">Payment Terms</p>
                    <div className="d-flex align-items-center flex-wrap">
                      {/* <div className="form-check me-5 mb-3">
                        <input
                          type="checkbox"
                          id="token-payment"
                          className="form-check-input"
                        />
                        <label htmlFor="token-payment" className="form-check-label">
                          Token Payment
                        </label>
                      </div> */}
                      <div className="form-check me-5 mb-3">
                        <input
                          type="checkbox"
                          id="down-payment"
                          className="form-check-input"
                        />
                        <label htmlFor="down-payment" className="form-check-label">
                          Down Payment
                        </label>
                      </div>
                      <div className="form-check me-5 mb-3">
                        <input
                          type="checkbox"
                          id="installment-payment"
                          className="form-check-input"
                        />
                        <label htmlFor="installment-payment" className="form-check-label">
                          Installment Payment
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          id="loan-payment"
                          className="form-check-input"
                        />
                        <label htmlFor="loan-payment" className="form-check-label">
                          Loan Payment
                        </label>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <input
                          type="text"
                          id="date"
                          ref={loanDateRef}
                          className={`form-control ${loanDateError ? "is-invalid" : ""
                            }`}
                          value={formatDate(loanDate)}
                          onChange={(e) => handleLoanDateChange(e)}
                          onKeyDown={(e) => handleEnter(e, downPaymentRef)}
                          placeholder="Loan Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                        {loanDateError && (
                          <div className="invalid-feedback">
                            Please select a Loan Date
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${bankNameError ? "is-invalid" : ""
                            }`}
                          id="tokenamount"
                          placeholder="Bank Name"
                          name="tokenamount"
                          value={bankName}
                          onChange={handleBankChange}
                          onKeyDown={(e) =>
                            handleEnter(e, tokenPaymentDateRef)
                          }
                          ref={bankNameRef}
                        />
                        {bankNameError && (
                          <div className="invalid-feedback">
                            Enter Bank Name
                          </div>
                        )}
                      </div>
                    </div>
                    <>
                      <p
                        className="text-gray"
                        onClick={() => setShowTokenFields((prev) => !prev)}
                      >
                        {" "}
                        Token Payment{" "}
                        <i className="bi bi-plus-circle-fill icon-3"></i>
                      </p>
                      {showTokenFields && (
                        <div className="row mb-4">
                          <div className="col">
                            <input
                              type="number"
                              className={`form-control ${tokenAmountError ? "is-invalid" : ""
                                }`}
                              id="tokenamount"
                              placeholder="Token Amount"
                              name="tokenamount"
                              value={tokenAmount}
                              onChange={handleTokenAmountChange}
                              onKeyDown={(e) =>
                                handleEnter(e, tokenPaymentDateRef)
                              }
                              ref={tokenAmountRef}
                            />
                            {tokenAmountError && (
                              <div className="invalid-feedback">
                                Enter Token Amount
                              </div>
                            )}
                          </div>
                          <div className="col">
                            <input
                              type="text"
                              id="date"
                              ref={tokenPaymentDateRef}
                              className={`form-control ${tokenPaymentDateError ? "is-invalid" : ""
                                }`}
                              value={formatDate(tokenPaymentDate)}
                              onChange={(e) => handleTokenPaymentDateChange(e)}
                              onKeyDown={(e) => handleEnter(e, downPaymentRef)}
                              placeholder="Token Payment Date"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                            />
                            {tokenPaymentDateError && (
                              <div className="invalid-feedback">
                                Please select a Token Payment Date
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                    <div>
                      <p
                        className="text-gray"
                        onClick={() => setShowTokenFields1((prev) => !prev)}
                      >
                        Down Payment{" "}
                        <i className="bi bi-plus-circle-fill icon-3"></i>
                      </p>
                      {showTokenFields1 && (
                        <div>
                          {rows.map((row, index) => (
                            <div className="row pt-2 mb-3" key={`row-${index}`}>
                              <div className="col">
                                <input
                                  type="number"
                                  className={`form-control ${downPaymentError ? "is-invalid" : ""
                                    }`}
                                  id="downpayment"
                                  placeholder="Down Payment"
                                  name="downpayment"
                                  value={row.downPayment}
                                  onChange={(e) =>
                                    handleInputChangeGeneric(
                                      index,
                                      "downPayment",
                                      e.target.value,
                                      "rows"
                                    )
                                  }
                                  onKeyDown={(e) =>
                                    handleEnter(e, downPaymentDateRef)
                                  }
                                  ref={downPaymentRef}
                                />
                                {downPaymentError && (
                                  <div className="invalid-feedback">
                                    Enter Down Payment
                                  </div>
                                )}
                              </div>
                              <div className="col">
                                <input
                                  type="text"
                                  id="date"
                                  ref={downPaymentDateRef}
                                  className={`form-control ${downPaymentDateError ? "is-invalid" : ""
                                    }`}
                                  value={formatDate(row.downPaymentDate)}
                                  onChange={(e) =>
                                    handleInputChangeGeneric(
                                      index,
                                      "downPaymentDate",
                                      e.target.value,
                                      "rows"
                                    )
                                  }
                                  onKeyDown={(e) =>
                                    handleEnter(e, paymentFrequencyRef)
                                  }
                                  placeholder="Down Payment Date"
                                  onFocus={(e) => (e.target.type = "date")}
                                  onBlur={(e) => (e.target.type = "text")}
                                />
                                {index === rows.length - 1 && (
                                  <i
                                    className="bi bi-plus-circle-fill icon-4"
                                    onClick={
                                      () =>
                                        setRows([
                                          ...rows,
                                          {
                                            downPayment: "",
                                            downPaymentDate: "",
                                          },
                                        ])
                                    }
                                  ></i>
                                )}
                                {downPaymentDateError && (
                                  <div className="invalid-feedback">
                                    Please select a Down Payment Date
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <p
                        className="text-gray"
                        onClick={() => setShowTokenFields2((prev) => !prev)}
                      >
                        Installment Payment{" "}
                        <i className="bi bi-plus-circle-fill icon-3"></i>
                      </p>
                      {showTokenFields2 && (
                        <>
                          <div className="row pt-4">
                            <div className="col">
                              <select
                                className={`form-control bg-white ${paymentFrequencyError ? "is-invalid" : ""
                                  }`}
                                value={paymentFrequency}
                                onChange={handlePaymentFrequencyChange}
                                onKeyDown={(e) => handleEnter(e, dueDateRef)}
                                ref={paymentFrequencyRef}
                              >
                                <option value="" disabled>
                                  Payment Frequency
                                </option>
                                <option value="Monthly">Monthly</option>
                                <option value="Bi-monthly">Bi-monthly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Semi-Annually">
                                  Semi-Annually
                                </option>
                                <option value="Annually">Annually</option>
                              </select>
                              {paymentFrequencyError && (
                                <div className="invalid-feedback">
                                  Please select a Payment Frequency
                                </div>
                              )}
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                id="date"
                                ref={dueDateRef}
                                className={`form-control ${dueDateError ? "is-invalid" : ""
                                  }`}
                                value={formatDate(dueDate)}
                                onChange={handleDueDateChange}
                                onKeyDown={(e) =>
                                  handleEnter(e, noOfInstallmentRef)
                                }
                                placeholder="Due Date"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                              />
                              {dueDateError && (
                                <div className="invalid-feedback">
                                  Please select a Due Date
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row pt-4">
                            <div className="col">
                              <input
                                type="number"
                                id="noofinstallment"
                                ref={noOfInstallmentRef}
                                onKeyDown={(e) =>
                                  handleEnter(e, installmentRef)
                                }
                                placeholder="No Of Installments"
                                className={`form-control ${noOfInstallmentError ? "is-invalid" : ""
                                  }`}
                                value={noOfInstallment}
                                onChange={handleNoOfInstallmentChange}
                                min="1"
                              />
                              {noOfInstallmentError && (
                                <div className="invalid-feedback">
                                  Enter a valid number of installments
                                </div>
                              )}
                            </div>
                            <div className="col"></div>
                          </div>
                          <div className="pt-3 w-50 mb-4">
                            <table className="table table-bordered text-center">
                              <thead>
                                <tr>
                                  <th>Installment</th>
                                  <th>Due Date</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Array.from({ length: noOfInstallment }).map(
                                  (_, idx) => {
                                    const installmentDate = new Date(dueDate);
                                    installmentDate.setMonth(
                                      installmentDate.getMonth() +
                                      idx *
                                      getFrequencyInMonths(paymentFrequency)
                                    );
                                    const formattedDate =
                                      installmentDate.toLocaleDateString(
                                        "en-GB",
                                        {
                                          day: "2-digit",
                                          month: "2-digit",
                                          year: "numeric",
                                        }
                                      );
                                    const formattedAmount =
                                      new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 2,
                                      }).format(installmentAmount);

                                    return (
                                      <tr key={idx}>
                                        <td>Installment {idx + 1}</td>
                                        <td>{formattedDate}</td>
                                        <td>{formattedAmount}</td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                      <div>
                        <p
                          className="text-gray"
                          onClick={() => setShowTokenFields3((prev) => !prev)}
                        >
                          Construction Linked Payment{" "}
                          <i className="bi bi-plus-circle-fill icon-3"></i>
                        </p>
                      </div>
                      {showTokenFields3 && (
                        <div className="row pt-4">
                          <div className="col">
                          </div>

                          <div className="d-flex align-items-center">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <table className="table table-bordered w-50 text-center">
                                <thead>
                                  <tr>
                                    <th scope="col">Installment</th>
                                    <th scope="col">Project Stage Name</th>
                                    <th scope="col">Project Stage Percentage</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {projectWiseStage.length > 0 ? (
                                    projectWiseStage.map((stage, index) => (
                                      <tr key={stage.id}>
                                        <td>{index + 1}</td>
                                        <td>{stage.projectStageName}</td>
                                        <td>{stage.projectStagePer}%</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="3">No data available</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="form-check pt-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={installment}
                          onChange={(e) => setInstallment(e.target.checked)}
                          onKeyDown={(e) => handleEnter(e, submitRef)}
                          ref={installmentRef}
                          id="installmentNotify"
                        />
                        <label htmlFor="installmentNotify">
                          Installment Notify
                        </label>
                      </div>

                      <div className="row pt-4">
                        <div className="col">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            ref={submitRef}
                            disabled={loading}
                            onClick={handleSubmit}
                          >
                            {loading ? "Submitting..." : "Submit"}
                          </button>
                        </div>
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
