// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Expenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [xpenses, setExpenses] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };


  const handleDelete = () => {
    Swal.fire({
      title: "Are You sure You <br /> Want to Delete?",
      text: "Once you delete all data related to Expense will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete ",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your expense has been deleted.", "success");
        
      }
    });
  };

  return (
    <>
      <ToastContainer />
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
                    <div className="p-2 ">
                      <h6 className="mb-4">Expenses List</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/add-expenses" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-plus-circle-fill"></i> New Expense
                        </h6>
                      </Link>
                    </div>
                  </div>
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

                    <div className="col-12 col-md-4 d-flex gap-2 justify-content-between align-items-center">
                      <p className="m-0 text-nowrap">
                        Show 1-10 of 50 Expenses
                      </p>
                      <select className="form-select form-select-sm">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                  </div>

                  {}<table className="table table-bordered text-center">
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
                      <tr>
                        <td>1</td>
                        <td>24/12/24</td>
                        <td>demo</td>
                        <td>demo</td>
                        <td>10000</td>
                        <td>
                          <Link to="" className="btn btn-warning btn-sm me-2">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            onClick={handleDelete}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                      <td>2</td>
                        <td>26/3/24</td>
                        <td>demo</td>
                        <td>demo</td>
                        <td>10000</td>
                        <td>
                          <Link to="" className="btn btn-warning btn-sm me-2">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            onClick={handleDelete}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
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

export default Expenses;
