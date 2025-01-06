import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";
import { Spinner } from "react-bootstrap";

const EditExpenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sampleExpenses = [
    {
      id: 1,
      date: "",
      voucherNo: "",
      head: "",
      narration: "",
      amount: "",
    },
  
  ];

  const expensesId = 1;
  const selectedExpense =
    sampleExpenses.find((expense) => expense.id === expensesId) || {};

  const [expense, setExpense] = useState({
    date: selectedExpense.date || "",
    voucherNo: selectedExpense.voucherNo || "",
    head: selectedExpense.head || "",
    narration: selectedExpense.narration || "",
    amount: selectedExpense.amount || "",
  });

  const [expenseDate, setExpenseDate] = useState(expense.date);
  const [expenseDateError, setExpenseDateError] = useState(false);

  const [errors, setErrors] = useState({
    voucherNoError: false,
    headError: false,
    narrationError: false,
    amountError: false,
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
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
      voucherNoError: false,
      headError: false,
      narrationError: false,
      amountError: false,
    };

    if (!expenseDate) {
      setExpenseDateError(true);
      isValid = false;
    } else {
      setExpenseDateError(false);
    }

    if (!expense.voucherNo) {
      validationErrors.voucherNoError = true;
      isValid = false;
    }

    if (!expense.head) {
      validationErrors.headError = true;
      isValid = false;
    }

    if (!expense.narration) {
      validationErrors.narrationError = true;
      isValid = false;
    }

    if (!expense.amount || isNaN(expense.amount) || parseFloat(expense.amount) <= 0) {
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
      navigate("/expenses");
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Edit Expense</title>
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
                      <h6 className="mb-4">Edit Expenses</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/expenses">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Voucher No</label>
                        <input
                          type="text"
                          className={`form-control ${errors.voucherNoError ? "is-invalid" : ""}`}
                          placeholder="Voucher Number"
                          name="voucherNo"
                          value={expense.voucherNo}
                          onChange={handleInputChange}
                        />
                        {errors.voucherNoError && (
                          <div className="invalid-feedback">Voucher Number is required.</div>
                        )}
                      </div>
                      <div className="col">
                        <label className="form-label">Expense Date</label>
                        <input
                          type="text"
                          className={`form-control ${expenseDateError ? "is-invalid" : ""}`}
                          id="date"
                          value={formatDate(expenseDate)}
                          placeholder="Expense Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          onChange={(e) => setExpenseDate(e.target.value)}
                        />
                        {expenseDateError && (
                          <div className="invalid-feedback">Please select a Expense date.</div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Expense Head</label>
                        <input
                          type="text"
                          className={`form-control ${errors.headError ? "is-invalid" : ""}`}
                          placeholder="Expense Head"
                          name="head"
                          value={expense.head}
                          onChange={handleInputChange}
                        />
                        {errors.headError && (
                          <div className="invalid-feedback">Expense Head is required.</div>
                        )}
                      </div>

                      <div className="col">
                        <label className="form-label">Narration</label>
                        <input
                          type="text"
                          className={`form-control ${errors.narrationError ? "is-invalid" : ""}`}
                          placeholder="Narration"
                          name="narration"
                          value={expense.narration}
                          onChange={handleInputChange}
                        />
                        {errors.narrationError && (
                          <div className="invalid-feedback">Narration is required.</div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col mb-3">
                        <label className="form-label">Amount</label>
                        <input
                          type="number"
                          className={`form-control ${errors.amountError ? "is-invalid" : ""}`}
                          name="amount"
                          value={expense.amount}
                          onChange={handleInputChange}
                          placeholder="Amount"
                        />
                        {errors.amountError && (
                          <div className="invalid-feedback">Amount should be a positive number.</div>
                        )}
                      </div>
                      <div className="col"></div>
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

export default EditExpenses;
