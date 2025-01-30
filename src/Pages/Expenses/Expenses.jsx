import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import Allpermissions from "../Common component/Allpermissions";

const Expenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExpenseHead, setSelectedExpenseHead] = useState("");
  const [selectedExpensesDate, setselectedExpensesDate] = useState("");
  const [expandedVoucher, setExpandedVoucher] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [hideAll, setHideAll] = useState(false);

  const [permissions, setPermissions] = useState([]);
  const hasPermission = (permission) => permissions.includes(permission);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      voucherNo: 1,
      voucherDate: "23-12-2024",
      expenseHead: "Office Supplies",
      narration: "Demo",
      amount: "15,000",
    },
    {
      id: 2,
      voucherNo: 1,
      voucherDate: "23-12-2024",
      expenseHead: "Office Supplies",
      narration: "Demo",
      amount: "15,000",
    },
    {
      id: 3,
      voucherNo: 2,
      voucherDate: "25-12-2024",
      expenseHead: "Utilities",
      narration: "Demo",
      amount: "22,000",
    },
    {
      id: 4,
      voucherNo: 3,
      voucherDate: "30-12-2024",
      expenseHead: "Office Supplies",
      narration: "Demo",
      amount: "15,000",
    },
    {
      id: 5,
      voucherNo: 3,
      voucherDate: "30-12-2024",
      expenseHead: "Office Supplies",
      narration: "Demo",
      amount: "60,000",
    },
    {
      id: 6,
      voucherNo: 3,
      voucherDate: "30-12-2024",
      expenseHead: "Office Supplies",
      narration: "Demo",
      amount: "18,000",
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const handleDelete = (expenseId) => {
    Swal.fire({
      title: "Are You Sure You Want to Delete?",
      text: "Once you delete, all the data related to this expense will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c4c4c4",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedExpenses = expenses.filter(
          (expense) => expense.id !== expenseId
        );
        setExpenses(updatedExpenses);

        Swal.fire({
          title: "Deleted!",
          text: "The expense has been deleted.",
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

  const filteredExpenses = expenses.filter((expense) => {
    const matchesExpenseHead = selectedExpenseHead
      ? expense.expenseHead === selectedExpenseHead
      : true;
    const matchesDate = selectedExpensesDate
      ? expense.voucherDate === selectedExpensesDate
      : true;
    return matchesExpenseHead && matchesDate;
  });

  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  const handleExpenseHeadChange = (e) => {
    setSelectedExpenseHead(e.target.value);
    setCurrentPage(1);
  };

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const existingVoucher = acc.find(
      (voucher) => voucher.voucherNo === expense.voucherNo
    );

    if (existingVoucher) {
      existingVoucher.totalAmount += parseFloat(
        expense.amount.replace(/,/g, "")
      );
      existingVoucher.expenses.push(expense);
    } else {
      acc.push({
        voucherNo: expense.voucherNo,
        totalAmount: parseFloat(expense.amount.replace(/,/g, "")),
        expenses: [expense],
      });
    }

    return acc;
  }, []);

  const grandTotal = groupedExpenses.reduce(
    (total, voucher) => total + voucher.totalAmount,
    0
  );

  const toggleVoucherDetails = (voucherNo) => {
    if (hideAll) {
      return;
    }

    if (!showAll) {
      setExpandedVoucher((prevState) =>
        prevState === voucherNo ? null : voucherNo
      );
    }
  };

  const handleShowAllChange = (e) => {
    setShowAll(e.target.checked);
    setHideAll(false);
    if (e.target.checked) {
      setExpandedVoucher(null);
    }
  };

  const handleHideAllChange = (e) => {
    setHideAll(e.target.checked);
    setShowAll(false);
    if (e.target.checked) {
      setExpandedVoucher(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Expenses</title>
      </Helmet>
      <Allpermissions onFetchPermissions={setPermissions} />
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
                      {hasPermission("new-expenses") && (
                        <Link to="/add-expenses" className="mb-4">
                          <h6>
                            <i className="bi bi-plus-circle-fill"></i> New
                            Expense
                          </h6>
                        </Link>
                      )}
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
                            <select
                              className="form-select form-select-sm"
                              value={selectedExpenseHead}
                              onChange={handleExpenseHeadChange}
                            >
                              <option value="">Expense Category</option>
                              <option value="Office Supplies">
                                Office Supplies
                              </option>
                              <option value="Utilities">Utilities</option>
                            </select>
                          </div>
                          <div style={{ width: "30%" }}>
                            <select
                              className="form-select form-select-sm"
                              value={selectedExpensesDate}
                              onChange={(e) =>
                                setselectedExpensesDate(e.target.value)
                              }
                            >
                              <option value="">Expense Date</option>
                              <option value="23-12-2024">23-12-2024</option>
                              <option value="25-12-2024">25-12-2024</option>
                              <option value="30-12-2024">30-12-2024</option>
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
                        <table className="table table-bordered text-center">
                          <tbody>
                            {groupedExpenses.map((voucher) => (
                              <React.Fragment key={voucher.voucherNo}>
                                <tr
                                  style={{
                                    cursor: "pointer",
                                    textAlign: "start",
                                  }}
                                  onClick={() =>
                                    !showAll &&
                                    !hideAll &&
                                    toggleVoucherDetails(voucher.voucherNo)
                                  }
                                >
                                  <td colSpan="5">
                                    <strong>
                                      Voucher No: {voucher.voucherNo}
                                    </strong>{" "}
                                    | Total Amount:{" "}
                                    {voucher.totalAmount.toLocaleString()}
                                  </td>
                                </tr>

                                {(expandedVoucher === voucher.voucherNo ||
                                  showAll) &&
                                  !hideAll && (
                                    <tr>
                                      <td colSpan="6">
                                        <table className="table table-bordered text-center">
                                          <thead>
                                            <tr>
                                              <th scope="col">Voucher No</th>
                                              <th scope="col">
                                                Voucher Expense Date
                                              </th>
                                              <th scope="col">Expense Head</th>
                                              <th scope="col">Narration</th>
                                              <th scope="col">Amount</th>
                                              <th scope="col">Action</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {voucher.expenses.map((expense) => (
                                              <tr key={expense.id}>
                                                <td>
                                                  {expense.voucherNo || "N/A"}
                                                </td>
                                                <td>
                                                  {expense.voucherDate || "N/A"}
                                                </td>
                                                <td>
                                                  {expense.expenseHead || "N/A"}
                                                </td>
                                                <td>
                                                  {expense.narration || "N/A"}
                                                </td>
                                                <td>
                                                  {expense.amount || "N/A"}
                                                </td>
                                                <td>
                                                  {hasPermission(
                                                    "edit-expenses"
                                                  ) && (
                                                    <Link
                                                      to={"/edit-expenses"}
                                                      className="btn btn-warning btn-sm me-2"
                                                    >
                                                      <i className="fas fa-edit"></i>
                                                    </Link>
                                                  )}
                                                  {hasPermission(
                                                    "delete-expenses"
                                                  ) && (
                                                    <button
                                                      onClick={() =>
                                                        handleDelete(expense.id)
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

export default Expenses;
