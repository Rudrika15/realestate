import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";

const Expenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [voucherDate, setVoucherDate] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.expenses) {
      setExpenses(location.state.expenses);
      setVoucherDate(location.state.voucherDate);
      setVoucherNo(location.state.voucherNo);
    }
  }, [location.state]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "Once deleted, this data cannot be recovered.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setExpenses((prevExpenses) => {
          const updatedExpenses = prevExpenses.filter(
            (expense) => expense.id !== id
          );
          Swal.fire("Deleted!", "Your expense has been deleted.", "success");
          return updatedExpenses;
        });
      }
    });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = expenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  return (
    <>
      <Helmet>
        <title>React Estate | Expenses</title>
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
                      <h6 className="mb-4">Expenses List</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/add-expenses" className="mb-4">
                        <h6>
                          <i className="bi bi-plus-circle-fill"></i> New Expense
                        </h6>
                      </Link>
                    </div>
                  </div>

                  {currentExpenses.length === 0 ? (
                    <div className="text-center">
                      <img
                        src="img/image_2024_12_26T09_23_33_935Z.png"
                        alt="No Expenses"
                        className="img-fluid w-25 h-25"
                      />
                      <p className="text-dark">No Expenses Found</p>
                    </div>
                  ) : (
                    <>
                      <div className="row mb-4 d-flex align-items-center justify-content-between">
                        <div className="col-12 col-md-8 d-flex gap-3">
                          <div style={{ width: "30%" }}>
                            <select className="form-select form-select-sm">
                              <option value="">Project</option>
                              <option value="">Demo</option>
                            </select>
                          </div>
                          <div style={{ width: "30%" }}>
                            <select className="form-select form-select-sm">
                              <option value="">Expense Category</option>
                              <option value="">Category 1</option>
                            </select>
                          </div>
                        </div>
                      </div>


                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col">Voucher No</th>
                            <th scope="col">Voucher Expense Date</th>
                            <th scope="col">Expense Head</th>
                            <th scope="col">Narration</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentExpenses.map((expense) => (
                            <tr key={expense.id}>
                              <td>{voucherNo || "N/A"}</td>
                              <td>{voucherDate || "N/A"}</td>
                              <td>{expense.expenseHead || "N/A"}</td>
                              <td>{expense.narration || "N/A"}</td>
                              <td>{expense.amount || "N/A"}</td>
                              <td>
                                <Link
                                  to={`/edit-expenses/${expense.id}`}
                                  className="btn btn-warning btn-sm me-2"
                                >
                                  <i className="fas fa-edit"></i>
                                </Link>
                                <button
                                  onClick={() => handleDelete(expense.id)}
                                  className="btn btn-danger btn-sm"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;
