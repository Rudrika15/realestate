import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import { numberToWords } from "number-to-words";

// Format date function
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

const AddIncome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [incomeDate, setIncomeDate] = useState("");
  const [incomes, setIncomes] = useState([
    {
      id: "1",
      project: "",
      name: "",
      incomeHead: "",
      narration: "",
      amount: "",
      showRemove: true,
      expenseHeadError: false,
    },
  ]);
  const [incomeHeads, setIncomeHeads] = useState([
    "Construction Materials",
    "Utilities",
    "Site Preparation",
  ]);
  const [newOption, setNewOption] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const addNewIncome = () => {
    const newIncome = {
      id: (incomes.length + 1).toString(),
      project: "",
      name: "",
      incomeHead: "",
      narration: "",
      amount: "",
      showRemove: true,
      expenseHeadError: false,
    };
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
  };

  const removeIncome = (index) => {
    const updatedIncomes = incomes.filter((_, i) => i !== index);
    setIncomes(updatedIncomes);
  };

  const handleIncomeChange = (index, field, value) => {
    const updatedIncomes = [...incomes];
    updatedIncomes[index][field] = value;
    setIncomes(updatedIncomes);

    const updatedErrors = { ...errors };
    delete updatedErrors[`${field}${index}`];
    setErrors(updatedErrors);
  };

  const handleIncomeHeadChange = (index, value) => {
    const updatedIncomes = [...incomes];
    updatedIncomes[index].incomeHead = value;
    setIncomes(updatedIncomes);
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
    const totalAmount = incomes.reduce(
      (total, incomes) => total + (parseFloat(incomes.amount) || 0),
      0
    );
    return totalAmount; 
  };
  
  const convertAmountToWords = (amount) => {
    return numberToWords.toWords(amount).toUpperCase(); 
  };


  const handleNewOptionKeyDown = (e) => {
    if (e.key === "Enter" && newOption.trim()) {
      setIncomeHeads([...incomeHeads, newOption]);
      setNewOption("");
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const validationError = {};

    if (!incomeDate) {
      validationError.incomeDate = "Please select an income date.";
      isValid = false;
    }

    incomes.forEach((income, index) => {
      if (!income.project) {
        validationError[`project${index}`] = "Please select a project.";
        isValid = false;
      }

      if (!income.name) {
        validationError[`name${index}`] = "Please enter a name for the income.";
        isValid = false;
      }
      if (!/^[A-Za-z ]+$/.test(income.name)) {
        validationError[`name${index}`] =
          "Name can only contain letters and spaces.";
        isValid = false;
      }

      if (!income.incomeHead) {
        validationError[`incomeHead${index}`] = "Please select an income head.";
        isValid = false;
      }

      if (!income.amount) {
        validationError[`amount${index}`] = "Please enter an amount.";
        isValid = false;
      }
      if (isNaN(income.amount)) {
        validationError[`amount${index}`] = "Amount must be a valid number.";
        isValid = false;
      }
      if (parseFloat(income.amount) <= 0) {
        validationError[`amount${index}`] = "Amount must be greater than zero.";
        isValid = false;
      }

      if (!income.narration) {
        validationError[`narration${index}`] = "Please enter a narration.";
        isValid = false;
      }
      if (income.narration.length > 255) {
        validationError[`narration${index}`] =
          "Narration must be less than 255 characters.";
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(validationError);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/income", {
        state: {
          incomes,
          voucherDate: incomeDate,
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
        <title>React Estate | Voucher Income</title>
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
                      <h6 className="mb-4">Voucher Income</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/income">
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
                          errors.incomeDate ? "is-invalid" : ""
                        }`}
                        value={formatDate(incomeDate)}
                        onChange={(e) => {
                          const inputDate = e.target.value;
                          const [day, month, year] = inputDate.split("-");
                          if (day && month && year) {
                            const formattedDate = `${day}-${month}-${year}`;
                            const parsedDate = new Date(formattedDate);
                            if (!isNaN(parsedDate)) {
                              setIncomeDate(
                                parsedDate.toISOString().slice(0, 10)
                              );
                            } else {
                              console.error("Invalid date format");
                            }
                          }
                        }}
                        placeholder="Income Date"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                      />
                      {errors.incomeDate && (
                        <div className="invalid-feedback">
                          {errors.incomeDate}
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
                          <th scope="col">Income Head</th>
                          <th scope="col">Narration</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incomes.map((income, index) => (
                          <tr key={income.id}>
                            <td>
                              <select
                                className={`form-select ${
                                  errors[`project${index}`] ? "is-invalid" : ""
                                }`}
                                value={income.project}
                                onChange={(e) =>
                                  handleIncomeChange(
                                    index,
                                    "project",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select Project</option>
                                <option>Shiv</option>
                                <option>Mahadev</option>
                                <option>Ganesh</option>
                              </select>
                              {errors[`project${index}`] && (
                                <div className="invalid-feedback">
                                  {errors[`project${index}`]}
                                </div>
                              )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className={`form-control ${
                                  errors[`name${index}`] ? "is-invalid" : ""
                                }`}
                                value={income.name}
                                onChange={(e) =>
                                  handleIncomeChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                              {errors[`name${index}`] && (
                                <div className="invalid-feedback">
                                  {errors[`name${index}`]}
                                </div>
                              )}
                            </td>
                            <td>
                              <select
                                className={`form-select ${
                                  errors[`incomeHead${index}`]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                value={income.incomeHead}
                                onChange={(e) =>
                                  handleIncomeHeadChange(index, e.target.value)
                                }
                              >
                                <option value="">Select Income Head</option>
                                {incomeHeads.map((head, idx) => (
                                  <option key={idx} value={head}>
                                    {head}
                                  </option>
                                ))}
                                <option value="add-new-option">
                                  Add New Option
                                </option>
                              </select>
                              {errors[`incomeHead${index}`] && (
                                <div className="invalid-feedback">
                                  {errors[`incomeHead${index}`]}
                                </div>
                              )}
                              {income.incomeHead === "add-new-option" && (
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
                                  errors[`narration${index}`]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                value={income.narration}
                                onChange={(e) =>
                                  handleIncomeChange(
                                    index,
                                    "narration",
                                    e.target.value
                                  )
                                }
                              />
                              {errors[`narration${index}`] && (
                                <div className="invalid-feedback">
                                  {errors[`narration${index}`]}
                                </div>
                              )}
                            </td>
                            <td>
                              <input
                                type="number"
                                className={`form-control ${
                                  errors[`amount${index}`] ? "is-invalid" : ""
                                }`}
                                value={income.amount}
                                onChange={(e) =>
                                  handleIncomeChange(
                                    index,
                                    "amount",
                                    e.target.value
                                  )
                                }
                        
                              />
                              {errors[`amount${index}`] && (
                                <div className="invalid-feedback">
                                  {errors[`amount${index}`]}
                                </div>
                              )}
                            </td>
                            <td className="text-center action-buttons">
                              {income.showRemove && index !== 0 && (
                                <i
                                  className="bi bi-x-circle-fill"
                                  onClick={() => removeIncome(index)}
                                ></i>
                              )}
                              {index === incomes.length - 1 && (
                                <i
                                  className="bi bi-plus-circle-fill"
                                  onClick={addNewIncome}
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
                            style={{ width:'100px' }}
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

export default AddIncome;
