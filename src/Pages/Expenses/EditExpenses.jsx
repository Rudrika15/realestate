import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { singleIdExpense, updatedExpense } from "../../Api/DevanshiApi"; // API import

const EditExpenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [expense, setExpense] = useState({
    voucherNo: "",
    date: "",
    head: "",
    narration: "",
    amount: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    const validationErrors = {
      voucherNoError: false,
      headError: false,
      narrationError: false,
      amountError: false,
    };

    if (!expense.date) {
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

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Token is missing. Please log in again.");
        setLoading(false);
        return;
      }

      const requestData = {
        voucherNo: expense.voucherNo,
        expenseDate: expense.date,
        naration: expense.narration,  
        amount: expense.amount,
        projectId: expense.projectId || 2,
        expenseHeadId: expense.head,
      };
      

      console.log("Request Payload: ", requestData);  

      const response = await axios.post(`${updatedExpense}/${expense.id}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response Data: ", response.data); 

      if (response.data.status) {
        toast.success(response.data.message || "Expense updated successfully");
        setTimeout(() => {
          navigate("/expenses");
        }, 1000);
      } else {
        toast.error(response.data.message || "Failed to update expense.");
      }
    } catch (error) {
      console.error("API Error: ", error);

      if (error.response && error.response.status === 401) {
        navigate("/");
      }

      toast.error("An error occurred while updating expense details.");
    } finally {
      setLoading(false);
    }
  };


  const fetchExpenseDetails = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token is missing. Please log in again.");
        return;
      }
  
      console.log("Fetching from URL:", `${singleIdExpense}${id}`); // Debug log
  
      const response = await axios.get(`${singleIdExpense}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("API Response:", response.data); // Debug log
  
      if (response.data.status) {
        const { expenseDetail, expenseMaster } = response.data.data;
        setExpense({
          voucherNo: expenseMaster?.voucherNo || "",
          date: expenseMaster?.expenceDate || "",
          head: expenseDetail?.ExpenseHeadId || "",
          narration: expenseDetail?.naration || "",
          amount: expenseDetail?.amount || "",
        });
      } else {
        toast.error(response?.data?.message || "Failed to fetch expense details.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
      toast.error("An error occurred while fetching expense details.");
    }
  };
  

  useEffect(() => {
    console.log("Expense ID:", id); // Debugging log
  
    if (id) {
      fetchExpenseDetails(id);
    } else {
      toast.error("Expense ID is missing.");
    }
  }, [id]);
  

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
                          value={formatDate(expense.date)}
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          onChange={(e) => setExpense((prev) => ({ ...prev, date: e.target.value }))}
                        />
                        {expenseDateError && (
                          <div className="invalid-feedback">Please select an Expense date.</div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Expense Head</label>
                        <input
                          type="text"
                          className={`form-control ${errors.headError ? "is-invalid" : ""}`}
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
