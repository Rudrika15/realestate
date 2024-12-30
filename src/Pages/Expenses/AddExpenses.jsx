import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import { numberToWords } from "number-to-words";

const AddExpenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
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
    },
  ]);
  const [expenseHeads, setExpenseHeads] = useState([
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
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const removeExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
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

  const convertAmountToWords = (amount) => {
    return numberToWords.toWords(amount).toUpperCase();
  };

  // const formatAmountInIndianStyle = (amount) => {
  //   return new Intl.NumberFormat('en-IN').format(amount);
  // };
  
  // const calculateTotalAmount = () => {
  //   const totalAmount = expenses.reduce(
  //     (total, expense) => total + (parseFloat(expense.amount) || 0),
  //     0
  //   );
  //   return formatAmountInIndianStyle(totalAmount);
  // };
  

  const calculateTotalAmount = () => {
    return expenses.reduce(
      (total, expense) => total + (parseFloat(expense.amount) || 0),
      0
    );
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
      <ToastContainer />
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
                        className="form-control"
                        value={
                          expenseDate
                            ? new Date(expenseDate).toLocaleDateString("en-GB", {
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
                              setExpenseDate(parsedDate.toISOString().slice(0, 10));
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
                    <div className="col">
                      <input
                        onChange={(e) => setVoucherNo(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Voucher No"
                      />
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
                                className="form-select"
                                value={expense.project}
                                onChange={(e) =>
                                  handleExpenseChange(index, "project", e.target.value)
                                }
                              >
                                <option>Shiv</option>
                                <option>Mahadev</option>
                                <option>Ganesh</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value={expense.name}
                                onChange={(e) =>
                                  handleExpenseChange(index, "name", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <select
                                className="form-select"
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
                                className="form-control"
                                value={expense.narration}
                                onChange={(e) =>
                                  handleExpenseChange(index, "narration", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                value={expense.amount}
                                onChange={(e) =>
                                  handleExpenseChange(index, "amount", e.target.value)
                                }
                              />
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
                          <td className="text-start" colSpan={2}>
                            {calculateTotalAmount()} <br />
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
