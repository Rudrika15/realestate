import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

const AddExpenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [expense, setExpense] = useState("");

  const [expenses, setExpenses] = useState([
    {
      project: "Shiv",
      name: "Khilen Maniyar",
      expenseHead: "Construction Materials",
      narration: "Expense For Purchasing.....",
      amount: "15,00,000"
    },
    {
      project: "Mahadev",
      name: "Jigar Parmar",
      expenseHead: "Utilities",
      narration: "Expense For Purchasing.....",
      amount: "5,00,000"
    },
    {
      project: "Ganesh",
      name: "Jinal Pujara",
      expenseHead: "Site Preparation",
      narration: "Expense For Purchasing.....",
      amount: "14,00,000"
    }
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const addNewExpense = () => {
    const newExpense = {
      project: "",
      name: "",
      expenseHead: "",
      narration: "",
      amount: ""
    };
    setExpenses([...expenses, newExpense]);
  };

  const removeExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
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
                    <div className="p-2 ">
                      <h6 className="mb-4">Voucher Expense</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/expenses" className="">
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
                          expense
                            ? new Date(expense).toLocaleDateString("en-GB", {
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
                            setExpense(parsedDate);
                          }
                        }}
                        placeholder="Voucher Expense"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                      />
                    </div>
                    <div className="col">
                      <input
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
                        <tr key={index}>
                          <td>
                            <select className="form-select">
                              <option selected>{expense.project}</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={expense.name}
                              onChange={(e) => {
                                const updatedExpenses = [...expenses];
                                updatedExpenses[index].name = e.target.value;
                                setExpenses(updatedExpenses);
                              }}
                            />
                          </td>
                          <td>
                            <select className="form-select">
                              <option selected>{expense.expenseHead}</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={expense.narration}
                              onChange={(e) => {
                                const updatedExpenses = [...expenses];
                                updatedExpenses[index].narration = e.target.value;
                                setExpenses(updatedExpenses);
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={expense.amount}
                              onChange={(e) => {
                                const updatedExpenses = [...expenses];
                                updatedExpenses[index].amount = e.target.value;
                                setExpenses(updatedExpenses);
                              }}
                            />
                          </td>
                          <td className="text-center action-buttons">
                            <i
                              className="bi bi-x-circle-fill"
                              onClick={() => removeExpense(index)}
                            ></i>
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
                        <td className="text-end ">
                          Total Amount <br />
                          Amount In Word
                        </td>
                        <td colSpan={2}></td>
                      </tr>
                    </tbody>
                  </table>
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
