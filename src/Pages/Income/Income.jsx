import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import Allpermissions from "../Common component/Allpermissions";

const Income = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIncomeHead, setSelectedIncomeHead] = useState("");
  const [selectedIncomeDate, setSelectedIncomeDate] = useState("");
  const [expandedIncomeId, setExpandedIncomeId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [hideAll, setHideAll] = useState(false);
  const [permissionss, setPermissionss] = useState([]);
  const hasPermission = (permission) => permissionss.includes(permission);

  const [incomes, setIncomes] = useState([
    {
      id: 1,
      name: "a",
      incomeHead: "Salary",
      amount: "50,000",
      date: "15-02-2024",
      deleteId: 1,
    },
    {
      id: 2,
      name: "b",
      incomeHead: "Business",
      amount: "70,000",
      date: "16-02-2024",
      deleteId: 2,
    },
    {
      id: 3,
      name: "c",
      incomeHead: "Shop",
      amount: "10,000",
      date: "18-02-2024",
      deleteId: 3,
    },
    {
      id: 1,
      name: "d",
      incomeHead: "Salary",
      amount: "20,000",
      date: "20-02-2024",
      deleteId: 4,
    },
    {
      id: 2,
      name: "e",
      incomeHead: "Business",
      amount: "15,000",
      date: "22-02-2024",
      deleteId: 5,
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const handleDelete = (deleteId) => {
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
        const updatedIncomes = incomes.filter(
          (income) => income.deleteId !== deleteId
        );
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

  const filteredIncomes = incomes.filter((income) => {
    if (selectedIncomeHead && income.incomeHead !== selectedIncomeHead) {
      return false;
    }
    if (selectedIncomeDate && income.date !== selectedIncomeDate) {
      return false;
    }
    return true;
  });

  const groupedIncomes = filteredIncomes.reduce((acc, income) => {
    const existingGroup = acc.find((group) => group.id === income.id);

    if (existingGroup) {
      existingGroup.totalAmount += parseFloat(income.amount.replace(/,/g, ""));
      existingGroup.incomes.push(income);
    } else {
      acc.push({
        id: income.id,
        totalAmount: parseFloat(income.amount.replace(/,/g, "")),
        incomes: [income],
      });
    }

    return acc;
  }, []);

  const grandTotal = groupedIncomes.reduce(
    (total, group) => total + group.totalAmount,
    0
  );

  const indexOfLastIncome = currentPage * itemsPerPage;
  const indexOfFirstIncome = indexOfLastIncome - itemsPerPage;
  const currentIncomes = groupedIncomes.slice(
    indexOfFirstIncome,
    indexOfLastIncome
  );

  const toggleIncomeDetails = (id) => {
    if (showAll || hideAll) return;
    setExpandedIncomeId((prevState) => (prevState === id ? null : id));
  };

  const handleShowAllChange = (e) => {
    setShowAll(e.target.checked);
    setHideAll(false);
    if (e.target.checked) {
      setExpandedIncomeId(null);
    }
  };

  const handleHideAllChange = (e) => {
    setHideAll(e.target.checked);
    setShowAll(false);
    if (e.target.checked) {
      setExpandedIncomeId(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Income</title>
      </Helmet>
      <Allpermissions onFetchPermissions={setPermissionss} />

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
                      {hasPermission("new-income") && (
                        <Link to="/add-income" className="mb-4">
                          <h6>
                            <i className="bi bi-plus-circle-fill"></i> New
                            Income
                          </h6>
                        </Link>
                      )}
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
                            <select
                              className="form-select form-select-sm"
                              value={selectedIncomeHead}
                              onChange={(e) =>
                                setSelectedIncomeHead(e.target.value)
                              }
                            >
                              <option value="">Income Head</option>
                              <option value="Salary">Salary</option>
                              <option value="Business">Business</option>
                              <option value="Shop">Shop</option>
                            </select>
                          </div>
                          <div style={{ width: "30%" }}>
                            <select
                              className="form-select form-select-sm"
                              value={selectedIncomeDate}
                              onChange={(e) =>
                                setSelectedIncomeDate(e.target.value)
                              }
                            >
                              <option value="">Income Date</option>
                              <option value="15-02-2020">15-02-2020</option>
                              <option value="16-02-2020">16-02-2020</option>
                              <option value="18-02-2020">18-02-2020</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex gap-2 mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={showAll}
                          onChange={handleShowAllChange}
                        />
                        <label className="form-check-label">Show All</label>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={hideAll}
                          onChange={handleHideAllChange}
                        />
                        <label className="form-check-label">Hide All</label>
                      </div>

                      <div className="table-responsive">
                        <table className="table table-bordered ">
                          <tbody>
                            {currentIncomes.map((group) => (
                              <React.Fragment key={group.id}>
                                <tr
                                  style={{ cursor: "pointer" }}
                                  onClick={() => toggleIncomeDetails(group.id)}
                                >
                                  <td colSpan="3">
                                    <strong>ID: {group.id}</strong> | Total
                                    Amount: {group.totalAmount.toLocaleString()}
                                  </td>
                                </tr>

                                {(showAll || expandedIncomeId === group.id) && (
                                  <tr>
                                    <td colSpan="3">
                                      <table className="table table-bordered text-center">
                                        <thead>
                                          <tr>
                                            <th scope="col">Income Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Income Date</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Action</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {group.incomes.map((income) => (
                                            <tr key={income.id}>
                                              <td>{income.id}</td>
                                              <td>{income.name || "N/A"}</td>
                                              <td>{income.date || "N/A"}</td>
                                              <td>{income.amount || "N/A"}</td>
                                              <td>
                                                {hasPermission(
                                                  "edit-income"
                                                ) && (
                                                  <Link
                                                    to={"/edit-income"}
                                                    className="btn btn-warning btn-sm me-2"
                                                  >
                                                    <i className="fas fa-edit"></i>
                                                  </Link>
                                                )}
                                                {hasPermission(
                                                  "delete-income"
                                                ) && (
                                                  <button
                                                    onClick={() =>
                                                      handleDelete(
                                                        income.deleteId
                                                      )
                                                    }
                                                    className="btn btn-danger btn-sm"
                                                  >
                                                    <i className="fas fa-trash"></i>
                                                  </button>
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex justify-content-start ">
                        <h6>
                          <strong>Grand Total: </strong>
                          {grandTotal.toLocaleString()}
                        </h6>
                      </div>
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
