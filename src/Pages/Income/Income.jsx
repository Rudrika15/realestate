import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";

const Income = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [incomes, setIncomes] = useState([
    { id: 1, name: "John Doe", incomeHead: "Salary", amount: "5000", date: "15-02-2020" },
    { id: 2, name: "Jane Smith", incomeHead: "Business", amount: "7000", date: "15-02-2020" },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "Once you delete, all the data related to this income will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c4c4c4",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {

        const updatedIncomes = incomes.filter((income) => income.id !== id);


        setIncomes(updatedIncomes);


        Swal.fire({
          title: "Deleted!",
          text: "Your income has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const indexOfLastIncome = currentPage * itemsPerPage;
  const indexOfFirstIncome = indexOfLastIncome - itemsPerPage;
  const currentIncomes = incomes.slice(indexOfFirstIncome, indexOfLastIncome);

  return (
    <>
      <Helmet>
        <title>React Estate | Income</title>
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
                      <h6 className="mb-4">Income List</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/add-income" className="mb-4">
                        <h6>
                          <i className="bi bi-plus-circle-fill"></i> New Income
                        </h6>
                      </Link>
                    </div>
                  </div>

                  {currentIncomes.length === 0 ? (
                    <div className="text-center">
                      <img
                        src="img/image_2024_12_26T09_23_33_935Z.png"
                        alt="No Income"
                        className="img-fluid w-25 h-25"
                      />
                      <p className="text-dark">No Income Found</p>
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
                              <option value="">Income Category</option>
                              <option value="">Category 1</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Income Date</th>
                            <th scope="col">Income Head</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentIncomes.map((income) => (
                            <tr key={income.id}>
                              <td>{income.name || "N/A"}</td>
                              <td>{income.date || "N/A"}</td>
                              <td>{income.incomeHead || "N/A"}</td>
                              <td>{income.amount || "N/A"}</td>
                              <td>
                                <Link
                                  to={"/edit-income"}
                                  className="btn btn-warning btn-sm me-2"
                                >
                                  <i className="fas fa-edit"></i>
                                </Link>
                                <button
                                  onClick={() => handleDelete(income.id)} 
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

export default Income;
