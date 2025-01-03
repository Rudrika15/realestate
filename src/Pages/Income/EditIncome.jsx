import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Spinner } from "react-bootstrap";

const EditIncome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sampleIncomes = [
    {
      id: 1,
      date: "",
      name: "",
      head: "",
      amount: "",
    },
  ];

  const incomeId = 1;
  const selectedIncome =
    sampleIncomes.find((income) => income.id === incomeId) || {};

  const [income, setIncome] = useState({
    date: selectedIncome.date || "",
    name: selectedIncome.name || "",
    head: selectedIncome.head || "",
    amount: selectedIncome.amount || "",
  });

  const [incomeDate, setIncomeDate] = useState(income.date);
  const [incomeDateError, setIncomeDateError] = useState(false);

  const [errors, setErrors] = useState({
    nameError: false,
    headError: false,
    amountError: false,
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncome((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    const validationErrors = {
      nameError: false,
      headError: false,
      narrationError: false,
      amountError: false,
    };

    if (!incomeDate) {
      setIncomeDateError(true);
      validationErrors.dateError = true;
      isValid = false;
    } else {
      setIncomeDateError(false);
    }


    if (!income.name) {
      validationErrors.nameError = true;
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(income.name)) {

      validationErrors.nameError = true;
      isValid = false;
    }


    if (!income.head) {
      validationErrors.headError = true;
      isValid = false;
    }

    if (
      !income.amount ||
      isNaN(income.amount) ||
      parseFloat(income.amount) <= 0
    ) {
      validationErrors.amountError = true;
      isValid = false;
    }

    setErrors(validationErrors);

    if (!isValid) {
      return; 
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/income");
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Edit Income</title>
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
                    <div className="p-2">
                      <h6 className="mb-4">Edit Income</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/income">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.nameError ? "is-invalid" : ""
                          }`}
                          placeholder="Name"
                          name="name"
                          value={income.name}
                          onChange={handleInputChange}
                        />
                        {errors.nameError && (
                          <div className="invalid-feedback">
                            {income.name
                              ? "Name must only contain alphabets."
                              : "Name is required."}
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <label className="form-label">Income Date</label>
                        <input
                          type="text"
                          className={`form-control ${
                            incomeDateError ? "is-invalid" : ""
                          }`}
                          value={formatDate(incomeDate)}
                          placeholder="Income Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          onChange={(e) => setIncomeDate(e.target.value)}
                        />
                        {incomeDateError && (
                          <div className="invalid-feedback">
                            Please select an income date.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Income Head</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.headError ? "is-invalid" : ""
                          }`}
                          placeholder="Income Head"
                          name="head"
                          value={income.head}
                          onChange={handleInputChange}
                        />
                        {errors.headError && (
                          <div className="invalid-feedback">
                            Income Head is required.
                          </div>
                        )}
                      </div>
                      <div className="col mb-3">
                        <label className="form-label">Amount</label>
                        <input
                          type="number"
                          className={`form-control ${
                            errors.amountError ? "is-invalid" : ""
                          }`}
                          name="amount"
                          value={income.amount}
                          onChange={handleInputChange}
                          placeholder="Amount"
                        />
                        {errors.amountError && (
                          <div className="invalid-feedback">
                            Amount should be a positive number.
                          </div>
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
                        "Save Changes"
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

export default EditIncome;
