import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Spinner } from "react-bootstrap";
import { numberToWords } from "number-to-words";
import axios from "axios";
import { addExpense, addExpenseHead, getExpenseHead, getProject, storeExpense, storeExpenseHead } from "../../Api/DevanshiApi";
import { toast } from "react-toastify";

const AddExpenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseDateError, setExpenseDateError] = useState(false);
  const [voucherNoError, setVoucherNoError] = useState(false);
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [ExpenseHeadName, setExpenseHeadName] = useState("");

  const [loading, setLoading] = useState(false);
  const [expenseDate, setExpenseDate] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [modalType, setModalType] = useState("Add");
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
  const [expenseHeads, setExpenseHeads] = useState([]);
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
    if (value === "add-new-option") {
      setIsModalOpen(true);
    } else {
      const updatedExpenses = [...expenses];
      updatedExpenses[index].expenseHead = value;
      setExpenses(updatedExpenses);
    }
  };


  const handleNewOptionChange = (e) => {
    setNewOption(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNewOption = () => {
    if (newOption.trim() !== "") {
      setExpenseHeads((prevHeads) => [
        ...prevHeads,
        { id: prevHeads.length + 1, ExpenseHeadName: newOption.trim() },
      ]);
      setNewOption("");
      handleCloseModal();
    }
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

  const fetchProjects = async () => {
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
        setData(response.data.data);
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

  const fetchExpenseHead = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const response = await axios.get(getExpenseHead, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === true) {
        setExpenseHeads(response.data.data);
      } else {
        console.error("Expense heads data not found in the response.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchExpenseHead();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const updatedExpenses = [...expenses];

    updatedExpenses.forEach((expense, index) => {
      updatedExpenses[index].projectError = !expense.project;
      updatedExpenses[index].expenseHeadError = !expense.expenseHead;
      updatedExpenses[index].narrationError = !expense.narration.trim();
      updatedExpenses[index].amountError = !expense.amount || isNaN(expense.amount) || parseFloat(expense.amount) <= 0;

      if (!expense.project || !expense.expenseHead || !expense.narration.trim() || !expense.amount || isNaN(expense.amount) || parseFloat(expense.amount) <= 0) {
        isValid = false;
      }
    });

    if (!expenseDate || !voucherNo) {
      isValid = false;
      setExpenseDateError(!expenseDate);
      setVoucherNoError(!voucherNo);
    }

    setExpenses(updatedExpenses);

    if (!isValid) {
      toast.error("❌ Validation failed! Fix errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token missing. Please log in again.");
        setLoading(false);
        return;
      }

      const expenseData = {
        voucherNo,
        expenseDate,
        totalAmount: Number(calculateTotalAmount()),
        expenseDetails: expenses.map((expense) => ({
          name: expense.name,
          projectId: expense.project,
          ExpenseHeadId: expense.expenseHead,
          naration: expense.narration,
          amount: Number(expense.amount),
        })),
      };

      console.log("Sending data:", expenseData);

      const response = await axios.post(storeExpense, expenseData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        toast.success("✅ Expense added successfully!");
        console.log(response.data.status);

        setVoucherNo("");
        setExpenseDate("");
        setExpenses([]);

        console.log("Response Data:", response.data.data);
        navigate("/expenses")

      } else {
        toast.error(response.data.message || "Failed to add Expense");
      }
    } catch (error) {
      console.error("API Error: ", error);
      toast.error("Failed to add Expense. Please try again.");
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const addExpenseHead = async (e) => {
    setLoading(true);
    try {
      const token = localStorage. getItem("token");
      const response = await axios.post(
        storeExpenseHead,
        { ExpenseHeadName: newOption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === true) {
        setExpenseHeads((prevHeads) => [
          ...prevHeads,
          response.data.data,
        ]);
        toast.success("Expense Head added successfully!");
        setNewOption("");
        // setTimeout(() => {
        //   navigate("/expense");
        // }, 1000);
      } else {
        toast.error(response.data.message || "Failed to add Expense Head");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
      toast.error("Failed to add Expense Head. Please try again.");
    } finally {
      setLoading(false);
    }
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
                  <form onSubmit={handleSubmit}>
                    <div className="row pt-1 pb-5 border-bottom">
                      <div className="col">
                        <input
                          type="text"
                          id="date"
                          className={`form-control ${expenseDateError ? "is-invalid" : ""
                            }`}
                          value={formatDate(expenseDate)}
                          placeholder="Expense Date"
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
                          className={`form-control ${voucherNoError ? "is-invalid" : ""
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

                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th scope="col">Project</th>
                          <th scope="col">Narration</th>
                          <th scope="col">Expense Head</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((expense, index) => (
                          <tr key={expense.id}>
                            <td>
                              <select
                                className={`form-select ${expense.projectError ? "is-invalid" : ""
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
                                <option value="" disabled>
                                  Select
                                </option>
                                {data.map((project) => (
                                  <option key={project.id} value={project.id}>
                                    {project.projectName}
                                  </option>
                                ))}
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
                                className={`form-control ${expense.narrationError ? "is-invalid" : ""
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
                              <select
                                className={`form-select ${expense.expenseHeadError ? "is-invalid" : ""}`}
                                value={expense.expenseHead}
                                onChange={(e) => handleExpenseHeadChange(index, e.target.value)}
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                <option value="add-new-option" onClick={handleOpenModal}>
                                  Add new expense head...
                                </option>
                                {expenseHeads.map((expenseHead) => (
                                  <option key={expenseHead.id} value={expenseHead.ExpenseHeadName}>
                                    {expenseHead.ExpenseHeadName}
                                  </option>
                                ))}
                              </select>
                              {expense.expenseHeadError && (
                                <div className="invalid-feedback">Please select an expense head.</div>
                              )}

                              {/* Modal for Adding New Expense Head */}
                              <Modal show={isModalOpen} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Add New Expense Head</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={newOption}
                                    onChange={handleNewOptionChange}
                                    placeholder="Enter new expense head"
                                  />
                                </Modal.Body>
                                <Modal.Footer>
                                  <button className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={handleAddNewOption} // Add the new option
                                  >
                                    Add Expense Head
                                  </button>
                                </Modal.Footer>
                              </Modal>
                            </td>

                            <td>
                              <input
                                type="number"
                                className={`form-control ${expense.amountError ? "is-invalid" : ""
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
                    <input type="hidden"
                      value={formatIndianNumbering(calculateTotalAmount())}
                    />
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
