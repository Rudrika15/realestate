import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Spinner } from "react-bootstrap";

const EditIncome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  
  const sampleIncomes = [
    { id: 1, date: "2024-01-01", voucherNo: "V123", head: "Salary", narration: "Monthly salary", amount: 10000 },
    { id: 2, date: "2024-01-05", voucherNo: "V124", head: "Freelancing", narration: "Freelance project", amount: 3000 },
  ];

  const incomeId = 1; 
  const selectedIncome = sampleIncomes.find(income => income.id === incomeId) || {};

  const [income, setIncome] = useState({
    date: selectedIncome.date || "",
    voucherNo: selectedIncome.voucherNo || "",
    head: selectedIncome.head || "",
    narration: selectedIncome.narration || "",
    amount: selectedIncome.amount || "",
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncome((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/income"); 
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Edit Income</title>
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
                  <h6 className="mb-4">Edit Income</h6>
                  <form onSubmit={handleSubmit}>

                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Income Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={income.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Income Head</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Income Head"
                          name="head"
                          value={income.head}
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
                          value={income.narration}
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
                          value={income.amount}
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

export default EditIncome;
