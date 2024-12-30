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

  
  const sampleExpenses = [
    { id: 1, date: "24/12/24", voucherNo: "V123", head: "Demo", narration: "Demo", amount: 10000 },
    { id: 2, date: "26/03/24", voucherNo: "V124", head: "Demo", narration: "Demo", amount: 20000 },
  ];

  const [expense, setExpense] = useState({
    date: "",
    voucherNo: "",
    head: "",
    narration: "",
    amount: "",
  });

  useEffect(() => {
    // Find the selected expense by ID
    const foundExpense = sampleExpenses.find(
      (expense) => expense.id === parseInt(id)
    );
    if (foundExpense) {
      setExpense(foundExpense); // Set expense data in the state
    } else {
      navigate("/expenses"); // Redirect if not found
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
    }, 2000);
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
                    {/* Booking Date and Voucher No */}
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

                    {/* Expense Head and Narration */}
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

                    {/* Amount */}
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

                    {/* Submit Button */}
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
