import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteExpense, getExpense } from "../../Api/DevanshiApi";

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

const Expenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();

  
  const formatIndianNumbering = (num) => {
    if (isNaN(num)) return num;
    num = parseFloat(num).toFixed(2);
    const parts = num.split(".");
    let integerPart = parts[0];
    const decimalPart = parts[1] === "00" ? "" : "." + parts[1];
    if (integerPart.length <= 3) return integerPart + decimalPart;
    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
    const formattedInteger =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    return formattedInteger + decimalPart;
  };
 

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are You Sure You Want to Delete?",
      text: "Once you delete, all the data related to this user will be deleted.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c4c4c4",
      customClass: {
        title: "swal-title",
        text: "swal-text",
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
    });

    if (confirmDelete.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${deleteExpense}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === true) {
          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          setExpenses(expenses.filter((item) => item.id !== id));
        } else {
          toast.error("Failed to delete Expense!");
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
        toast.error("An error occurred while deleting the user!");
      }
    }
  };

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(getExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("API Response:", response.data);
  
      if (response.data.status === true) {
        setExpenses(response.data.data);
      } else {
        // Clear the expenses if response status is false
        setExpenses([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      if (error.response && error.response.status === 401) {
        navigate("/"); 
      } else {
        toast.error("Failed to fetch expenses. Please try again.");
        setExpenses([]);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchExpenses();
  }, []);
  
  const clearExpenses = () => {
    setExpenses([]);
  };
  

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <Helmet>
        <title>React Estate | Expenses</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <Topbar
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isTopbarOpen={isTopbarOpen}
            toggleTopbar={() => setIsTopbarOpen(!isTopbarOpen)}
          />
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-4">Expenses List</h6>
                    <Link to="/add-expenses">
                      <h6 className="mb-4">
                        <i className="bi bi-plus-circle-fill"></i> Add Expense
                      </h6>
                    </Link>
                  </div>

                  {loading ? (
                    <p>Loading...</p>
                  ) : expenses.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th>Voucher No</th>
                            <th>Expense Date</th>
                            <th>Expense Head</th>
                            <th>Narration</th>
                            <th >Amount</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expenses.map((expense) =>
                            expense.details && expense.details.length > 0 ? (
                              expense.details.map((detail) => (
                                <tr key={detail.id}>
                                  <td>{expense.voucherNo || "N/A"}</td>
                                  <td>{formatDate(expense.expenceDate)}</td> 
                                  <td>{detail.ExpenseHeadId || "N/A"}</td>
                                  <td>{detail.naration || "N/A"}</td>
                                  <td className="text-start">{formatIndianNumbering(detail.amount || "N/A")}
                                    {/* {detail.amount || "N/A"} */}

                                  </td>
                                  <td>
                                    <Link
                                      to={`/edit-expenses/${detail.id}`}
                                      className="btn btn-warning btn-sm me-2"
                                    >
                                      <i className="fas fa-edit"></i>
                                    </Link>
                                    <Link
                                      className="btn btn-danger btn-sm"
                                      onClick={() => handleDelete(detail.id)}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr key={expense.id}>
                                <td>{expense.voucherNo || "N/A"}</td>
                                <td>{formatDate(expense.expenceDate)}</td> 
                                <td>{expense.ExpenseHeadId || "N/A"}</td>
                                <td>{expense.naration || "N/A"}</td>
                                <td className="text-start">{formatIndianNumbering(expense.totalAmount || "N/A")}</td>
                                <td>
                                  <Link
                                    to={`/edit-expenses/${expense.id}`}
                                    className="btn btn-warning btn-sm me-2"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </Link>
                                  <Link
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(expense.id)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </Link>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src="img/image_2024_12_26T09_23_33_935Z.png"
                        alt="No Expenses"
                        className="img-fluid w-25 h-25"
                      />
                      <p className="text-dark">No Expenses Found</p>
                    </div>
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
