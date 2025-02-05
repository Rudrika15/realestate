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
import { Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  console.log(new Date());

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
      console.log(response);

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

    if (!partner) validationErrors.partner = "Partner is required";
    if (!project) validationErrors.project = "Project is required";
    if (!incomeDate) validationErrors.incomeDate = "Income Date is required";
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
      validationErrors.amount = "Valid Amount is required";
    if (!paymentMode) validationErrors.paymentMode = "Payment Mode is required";

    if (paymentMode === "Cheque") {
      if (!chequeDate) validationErrors.chequeDate = "Cheque Date is required";
      if (!chequeNumber.trim())
        validationErrors.chequeNumber = "Cheque Number is required";
      if (!bankName.trim()) validationErrors.bankName = "Bank Name is required";
    }

    if (!remark.trim()) validationErrors.remark = "Remark is required";

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    setError({});

    console.log("Project Value Before Submission:", project); 

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authorization token found.");
        return;
      }

      const requestData = {
        projectId: Array.isArray(project)
          ? Number(project[0]?.id)
          : Number(project),
        incomeType: "Partner Income",
        amount: Number(amount),
        paymentMode,
        dateReceived: incomeDate,
        PartnerId: Array.isArray(partner)
          ? Number(partner[0]?.id)
          : Number(partner),
        bankName: paymentMode === "Cheque" ? bankName : "",
        chequeNumber: paymentMode === "Cheque" ? chequeNumber : "",
        chequeDate:
          paymentMode === "Cheque" && chequeDate
            ? new Date(chequeDate).toISOString().split("T")[0]
            : null, // Ensure valid date format
        remark,
      };

      console.log("Formatted Cheque Date:", requestData.chequeDate);

      const response = await axios.post(storePartnerIncome, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success(
          response.data.message || "Partner Income added successfully!"
        );
        console.log("Created Income Data:", response.data.data);
        setTimeout(() => {
          navigate("/partner-income");
        }, 1000);
      } else {
        toast.error(response.data.message || "Failed to add partner income.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        toast.error(
          error.response.data.message ||
            "An error occurred while adding income."
        );
      } else {
        console.error("Error:", error);
        toast.error("Failed to connect to the server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartner();
    fetchProjects();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "partner") {
      const selectedPartner = partner.find((p) => p.id == value);
      setProject(selectedPartner ? selectedPartner.projects : []);
      if (selectedPartner && selectedPartner.projects.length > 0) {
        setProject(selectedPartner.projects);
        setFormData((prev) => ({ ...prev, project: "" }));
      } else {
        setProject([]);
        setFormData((prev) => ({ ...prev, project: "" }));
      }
    }
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
                        <select
                          name="partner"
                          className="form-select"
                          value={formData.partner}
                          onChange={handleChange}
                        >
                          <option value="">Select Partner</option>
                          {partner.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.partnerName}
                            </option>
                          ))}
                        </select>
                        {error.partner && (
                          <div className="invalid-feedback">
                            {error.partner}
                          </div>
                        )}
                      </div>
                      <div className="col">
                        {/* <select name="project" className="form-select" value={formData.project} onChange={handleChange}>
                          <option value="">Select Project</option>
                          {project.map((p) => (
                            <option key={p.id} value={p.id}>{p.projectName}</option>
                          ))}
                        </select> */}
                        <select
                          name="project"
                          className="form-select"
                          value={formData.project}
                          onChange={handleChange}
                          disabled={!formData.partner}
                        >
                          <option value="">Select Project</option>
                          {project.map((p, index) => (
                            <option key={index} value={p.projectName}>
                              {p.projectName}
                            </option>
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
                          <DatePicker
                            id="date"
                            selected={incomeDate}
                            onChange={(date) => {
                              setIncomeDate(date);
                              if (date) {
                                setError((prev) => ({
                                  ...prev,
                                  incomeDate: "",
                                }));
                              }
                            }}
                            placeholderText="Income Date"
                            className={`form-control ${
                              error.incomeDate ? "is-invalid" : ""
                            }`}
                            dateFormat="dd/MM/yyyy"
                          />
                          {error.incomeDate && (
                            <div className="text-danger">
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
                            <DatePicker
                              id="date"
                              selected={chequeDate}
                              onChange={(date) => {
                                setChequeDate(date);
                                if (date) {
                                  setError((prev) => ({
                                    ...prev,
                                    chequeDate: "",
                                  })); // Clear error on selection
                                }
                              }}
                              placeholderText="Cheque Date"
                              className={`form-control ${
                                error.chequeDate ? "is-invalid" : ""
                              }`}
                              dateFormat="dd/MM/yyyy"
                            />
                            {error.chequeDate && (
                              <div className="text-danger">
                                {error.chequeDate}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-4">
                          <input
                            type="number"
                            className={`form-control ${
                              error.chequeNumber ? "is-invalid" : ""
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
                            type="text"
                            className={`form-control ${
                              error.bankName ? "is-invalid" : ""
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
                          type="number"
                          className={`form-control ${
                            error.amount ? "is-invalid" : ""
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
                      <div className="col pt-3 mb-3">
                        <textarea
                          className={`form-control ${
                            error.remark ? "is-invalid" : ""
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
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Submit"
                      )}
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
