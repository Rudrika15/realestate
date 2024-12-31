import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Spinner } from "react-bootstrap";

const EditExpenses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // Static data for the expenses
  const sampleExpenses = [
    { id: 1, date: "2024-12-24", voucherNo: "V123", head: "Construction Materials", narration: "Purchased materials for construction", amount: 10000 },
    { id: 2, date: "2024-03-26", voucherNo: "V124", head: "Utilities", narration: "Electricity bill for the site", amount: 2500 },
    { id: 3, date: "2024-01-15", voucherNo: "V125", head: "Site Preparation", narration: "Site leveling and clearance", amount: 5000 },
  ];

  const [expense, setExpense] = useState({
    date: "",
    voucherNo: "",
    head: "",
    narration: "",
    amount: "",
  });

  useEffect(() => {
    // Find the expense based on the id in the URL params
    const foundExpense = sampleExpenses.find(
      (expense) => expense.id === parseInt(id)
    );
    if (foundExpense) {
      setExpense(foundExpense); // Populate the form with the found expense data
    } else {
      navigate("/expenses"); // Redirect if no matching expense found
    }
  }, [id, navigate]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/expenses"); // Redirect after saving changes
    }, 2000); // Simulate API delay
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Edit Expense</title>
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
                  <h6 className="mb-4">Edit Expense</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Booking Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={expense.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col">
                        <label className="form-label">Voucher No</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Voucher Number"
                          name="voucherNo"
                          value={expense.voucherNo}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Expense Head</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Expense Head"
                          name="head"
                          value={expense.head}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col">
                        <label className="form-label">Narration</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Narration"
                          name="narration"
                          value={expense.narration}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col mb-3">
                        <label className="form-label">Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          name="amount"
                          value={expense.amount}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col"></div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Save Changes"
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

export default EditExpenses;
