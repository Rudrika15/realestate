import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getProject, getPartner } from "../../Api/ApiDipak";
import axios from "axios";
import { storePartnerIncome } from "../../Api/DevanshiApi";
const AddPartnerIncome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [incomeDate, setIncomeDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState({});
  const [partner, setPartner] = useState([]);
  const [project, setProject] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };
  const fetchPartner = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        navigate("/");
        return;
      }
      const response = await axios.get(getPartner, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === true && response.data.data) {
        setPartner(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    }
  };
  const fetchProjects = async () => {
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
        setProject(response.data.data);
      } else {
        console.error("Projects data not found in the response.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate("/");
        } else {
          console.error("Error response:", error.response.data);
        }
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const validationErrors = {};
  
    // Validate fields
    if (!partner) {
      validationErrors.partner = "Partner is required";
      isValid = false;
    }
    if (!project) {
      validationErrors.project = "Project is required";
      isValid = false;
    }
    if (!incomeDate) {
      validationErrors.incomeDate = "Income Date is required";
      isValid = false;
    }
  
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      validationErrors.amount = "Valid Amount is required";
      isValid = false;
    }
  
    if (!paymentMode) {
      validationErrors.paymentMode = "Payment Mode is required";
      isValid = false;
    }
  
    if (paymentMode === "Cheque") {
      if (!chequeDate) {
        validationErrors.chequeDate = "Cheque Date is required";
        isValid = false;
      }
      if (!chequeNumber.trim()) {
        validationErrors.chequeNumber = "Cheque Number is required";
        isValid = false;
      }
      if (!bankName.trim()) {
        validationErrors.bankName = "Bank Name is required";
        isValid = false;
      }
    }
  
    // Removed remark validation based on your example
    // if (!remark.trim()) {
    //   validationErrors.remark = "Remark is required";
    //   isValid = false;
    // }
  
    if (!isValid) {
      setError(validationErrors);
      return;
    }
    setError({});
  
    // Log the values for debugging
    console.log('Amount:', amount);
    console.log('Request Data:', {
      projectId: formData.project,
      incomeType: "Partner Income",
      amount: Number(formData.amount), // Ensure amount is valid number
      paymentMode: formData.paymentMode,
      dateReceived: formData.incomeDate, // Ensure date format is correct
      PartnerId: formData.partner,
      bankName: formData.paymentMode === "Cheque" ? formData.bankName : "",
      chequeNumber: formData.paymentMode === "Cheque" ? formData.chequeNumber : "",
      chequeDate: formData.paymentMode === "Cheque" ? formData.chequeDate : "",
      remark: formData.remark,
    });
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authorization token found.");
        return;
      }
  
      const requestData = {
        projectId: formData.project,
        incomeType: "Partner Income",
        amount: Number(formData.amount), // Ensure amount is converted to number
        paymentMode: formData.paymentMode,
        dateReceived: formData.incomeDate, // Check the date format if necessary
        PartnerId: formData.partner,
        bankName: formData.paymentMode === "Cheque" ? formData.bankName : "",
        chequeNumber: formData.paymentMode === "Cheque" ? formData.chequeNumber : "",
        chequeDate: formData.paymentMode === "Cheque" ? formData.chequeDate : "",
        remark: formData.remark, // Optional based on your needs
      };
  
      console.log('Request Payload:', requestData);
  
      const response = await axios.post(storePartnerIncome, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.success) {
        toast.success(response.data.message || "Partner Income added successfully!");
        console.log(response.data.data);
        setTimeout(() => {
          navigate("/partner-income");
        }, 1000);
      } else {
        toast.error(response.data.message || "Failed to add partner income.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
      toast.error(error.response?.data?.message || "Failed to add partner income. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPartner()
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
                        <select name="partner" className="form-select" value={formData.partner} onChange={handleChange}>
                          <option value="">Select Partner</option>
                          {partner.map((p) => (
                            <option key={p.id} value={p.id}>{p.partnerName}</option>
                          ))}
                        </select>
                        {error.partner && (
                          <div className="invalid-feedback">
                            {error.partner}
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <select name="project" className="form-select" value={formData.project} onChange={handleChange}>
                          <option value="">Select Project</option>
                          {project.map((p) => (
                            <option key={p.id} value={p.id}>{p.projectName}</option>
                          ))}
                        </select>
                        {error.project && (
                          <div className="invalid-feedback">
                            {error.project}
                          </div>
                        )}
                      </div>
                      <div className="col ">
                        <div className="input-wrapper position-relative">
                          <input
                            type="text"
                            id="date"
                            className={`form-control ${error.incomeDate ? "is-invalid" : ""
                              }`}
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
                          {error.incomeDate && (
                            <div className="invalid-feedback">
                              {error.incomeDate}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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
                      {error.paymentMode && (
                        <div className="text-danger">{error.paymentMode}</div>
                      )}
                    </div>
                    {paymentMode === "Cheque" && (
                      <div className="row pt-3">
                        <div className="col-4">
                          <div className="input-wrapper position-relative">
                            <input
                              type="text"
                              id="date"
                              className={`form-control ${error.chequeDate ? "is-invalid" : ""
                                }`}
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
                            {error.chequeDate && (
                              <div className="invalid-feedback">
                                {error.chequeDate}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-4">
                          <input
                            type="number"
                            className={`form-control ${error.chequeNumber ? "is-invalid" : ""
                              }`}
                            placeholder="Cheque Number"
                            value={chequeNumber}
                            onChange={(e) => setChequeNumber(e.target.value)}
                          />
                          {error.chequeNumber && (
                            <div className="invalid-feedback">
                              {error.chequeNumber}
                            </div>
                          )}
                        </div>
                        <div className="col-4">
                          <input
                            type="number"
                            className={`form-control ${error.bankName ? "is-invalid" : ""
                              }`}
                            placeholder="Bank Name"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                          />
                          {error.bankName && (
                            <div className="invalid-feedback">
                              {error.bankName}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="row ">
                      <div className="col pt-3">
                        <input
                          type="text"
                          className={`form-control ${error.amount ? "is-invalid" : ""
                            }`}
                          id="amount"
                          placeholder="Amount"
                          name="amount"
                          onChange={(e) => setAmount(e.target.value)}
                          value={amount}
                        />
                        {error.amount && (
                          <div className="invalid-feedback">{error.amount}</div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row w-75">
                      <div className="col pt-3">
                        <textarea
                          className={`form-control ${error.remark ? "is-invalid" : ""
                            }`}
                          placeholder="Remark"
                          id="floatingTextarea"
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                        ></textarea>
                        {error.remark && (
                          <div className="invalid-feedback">{error.remark}</div>
                        )}
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
        </div>
      </div>
    </>
  );
};
export default AddPartnerIncome;
