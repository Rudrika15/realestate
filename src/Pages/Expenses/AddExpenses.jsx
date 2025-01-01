import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import { numberToWords } from "number-to-words";

const AddExpenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [expenseDateError, setExpenseDateError] = useState(false);
  const [voucherNoError, setVoucherNoError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [expenseDate, setExpenseDate] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: "1",
      project: "",
      name: "",
      expenseHead: "",
      narration: "",
      amount: "",
      showRemove: true,
      projectError: false,
      nameError: false,
      expenseHeadError: false,
      narrationError: false,
      amountError: false,
    },
  ]);
  const [expenseHeads, setExpenseHeads] = useState([
    "Select",
    "Construction Materials",
    "Utilities",
    "Site Preparation",
  ]);
  const [newOption, setNewOption] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const addNewExpense = () => {
    const newExpense = {
      id: (expenses.length + 1).toString(),
      project: "",
      name: "",
      expenseHead: "",
      narration: "",
      amount: "",
      showRemove: true,
      projectError: false,
      nameError: false,
      expenseHeadError: false,
      narrationError: false,
      amountError: false,
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const removeExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
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

  const handleExpenseChange = (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);
  };

  const handleExpenseHeadChange = (index, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].expenseHead = value;
    setExpenses(updatedExpenses);
  };

  const handleNewOptionChange = (e) => {
    setNewOption(e.target.value);
  };

  const formatIndianNumbering = (num) => {
    if (isNaN(num)) return num;
    num = num.toString().split('.'); 
    let integerPart = num[0];
    const decimalPart = num[1] ? '.' + num[1] : '';
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    integerPart = integerPart.replace(regex, ',');
    return integerPart + decimalPart;
  };
  

  const calculateTotalAmount = () => {
    const totalAmount = expenses.reduce(
      (total, expense) => total + (parseFloat(expense.amount) || 0),
      0
    );
    return totalAmount; 
  };
  
  const convertAmountToWords = (amount) => {
    return numberToWords.toWords(amount).toUpperCase(); 
  };




  const handleNewOptionKeyDown = (e) => {
    if (e.key === "Enter" && newOption.trim()) {
      setExpenseHeads([...expenseHeads, newOption]);
      setNewOption("");
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const updatedExpenses = [...expenses];

    updatedExpenses.forEach((expense, index) => {
      if (!expense.project) {
        updatedExpenses[index].projectError = true;
        isValid = false;
      } else {
        updatedExpenses[index].projectError = false;
      }
      if (!/^[A-Za-z ]+$/.test(expense.name)) {
        updatedExpenses[index].nameError = true;
        isValid = false;
      } else {
        updatedExpenses[index].nameError = false;
      }

      if (!expense.expenseHead) {
        updatedExpenses[index].expenseHeadError = true;
        isValid = false;
      } else {
        updatedExpenses[index].expenseHeadError = false;
      }

      if (!expense.narration) {
        updatedExpenses[index].narrationError = true;
        isValid = false;
      } else {
        updatedExpenses[index].narrationError = false;
      }

      if (
        !expense.amount ||
        isNaN(expense.amount) ||
        parseFloat(expense.amount) <= 0
      ) {
        updatedExpenses[index].amountError = true;
        isValid = false;
      } else {
        updatedExpenses[index].amountError = false;
      }
    });

    if (!expenseDate) {
      isValid = false;
    }
    if (!voucherNo) {
      isValid = false;
    }

    setExpenseDateError(!expenseDate);
    setVoucherNoError(!voucherNo);
    setExpenses(updatedExpenses);

    if (!isValid) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/expenses", {
        state: {
          expenses,
          voucherDate: expenseDate,
          voucherNo,
        },
      });
    }, 2000);
  };

  const preventFormSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Voucher Expense</title>
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
                      <h6 className="mb-4">Voucher Expense</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/expenses">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>

                  <div className="row pt-1 pb-5 border-bottom">
                    <div className="col">
                      <input
                        type="text"
                        id="date"
                        className={`form-control ${
                          expenseDateError ? "is-invalid" : ""
                        }`}
                        value={formatDate(expenseDate)}
                        placeholder="Booking Date"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        onChange={(e) => setExpenseDate(e.target.value)}
                      />
                      {expenseDateError && (
                        <div className="invalid-feedback">
                          Please select a Expense date.
                        </div>
                      )}
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className={`form-control ${
                          voucherNoError ? "is-invalid" : ""
                        }`}
                        value={voucherNo}
                        placeholder="Voucher No"
                        onChange={(e) => setVoucherNo(e.target.value)}
                      />
                      {voucherNoError && (
                        <div className="invalid-feedback">
                          Please enter a voucher number.
                        </div>
                      )}
                    </div>
                    <div className="col"></div>
                  </div>

                  <div className="col">
                    <h6 className="pt-3 pb-2 ps-3">Project Details</h6>
                  </div>

                  <form onSubmit={handleSubmit} onKeyDown={preventFormSubmit}>
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th scope="col">Project</th>
                          <th scope="col">Name</th>
                          <th scope="col">Expense Head</th>
                          <th scope="col">Narration</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((expense, index) => (
                          <tr key={expense.id}>
                            <td>
                              <select
                                className={`form-select ${
                                  expense.projectError ? "is-invalid" : ""
                                }`}
                                value={expense.project}
                                onChange={(e) =>
                                  handleExpenseChange(
                                    index,
                                    "project",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="" selected>
                                  Select
                                </option>
                                <option>Shiv</option>
                                <option>Mahadev</option>
                                <option>Ganesh</option>
                              </select>
                              {expense.projectError && (
                                <div className="invalid-feedback">
                                  Please select a project.
                                </div>
                              )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className={`form-control ${
                                  expense.nameError ? "is-invalid" : ""
                                }`}
                                value={expense.name}
                                onChange={(e) =>
                                  handleExpenseChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                              {expense.nameError && (
                                <div className="invalid-feedback">
                                  Name can only contain letters and spaces.
                                </div>
                              )}
                            </td>
                            <td>
                              <select
                                className={`form-select ${
                                  expense.expenseHeadError ? "is-invalid" : ""
                                }`}
                                value={expense.expenseHead}
                                onChange={(e) =>
                                  handleExpenseHeadChange(index, e.target.value)
                                }
                              >
                                {expenseHeads.map((head, idx) => (
                                  <option key={idx} value={head}>
                                    {head}
                                  </option>
                                ))}
                                <option value="add-new-option">
                                  Add New Option
                                </option>
                              </select>
                              {expense.expenseHeadError && (
                                <div className="invalid-feedback">
                                  Please select an expense head.
                                </div>
                              )}
                              {expense.expenseHead === "add-new-option" && (
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={newOption}
                                    onChange={handleNewOptionChange}
                                    onKeyDown={handleNewOptionKeyDown}
                                    placeholder="Enter new option"
                                  />
                                </div>
                              )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className={`form-control ${
                                  expense.narrationError ? "is-invalid" : ""
                                }`}
                                value={expense.narration}
                                onChange={(e) =>
                                  handleExpenseChange(
                                    index,
                                    "narration",
                                    e.target.value
                                  )
                                }
                              />
                              {expense.narrationError && (
                                <div className="invalid-feedback">
                                  Please enter a narration.
                                </div>
                              )}
                            </td>
                            <td>
                              <input
                                type="number"
                                className={`form-control ${
                                  expense.amountError ? "is-invalid" : ""
                                }`}
                                value={expense.amount}
                                onChange={(e) =>
                                  handleExpenseChange(
                                    index,
                                    "amount",
                                    e.target.value
                                  )
                                }
                              />
                              {expense.amountError && (
                                <div className="invalid-feedback">
                                  Please enter a valid amount.
                                </div>
                              )}
                            </td>
                            <td className="text-center action-buttons">
                              {expense.showRemove && index !== 0 && (
                                <i
                                  className="bi bi-x-circle-fill"
                                  onClick={() => removeExpense(index)}
                                ></i>
                              )}
                              {index === expenses.length - 1 && (
                                <i
                                  className="bi bi-plus-circle-fill"
                                  onClick={addNewExpense}
                                ></i>
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="text-end">
                            Total Amount <br />
                            Amount In Word
                          </td>
                    
                          <td
                            className="text-start"
                            colSpan={2}
                            style={{ width: "130px" }}
                          >
                            {formatIndianNumbering(calculateTotalAmount())} <br />
                            {convertAmountToWords(calculateTotalAmount())}
                          </td>
                        </tr>
                      </tbody>
                    </table>

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

export default AddExpenses;
