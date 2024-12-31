import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

function AddRole() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!roleName.trim()) {
      setError("Role Name is required.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Role added successfully!");
      setRoleName("");
      navigate("/role");
    }, 2000);
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Add Role</title>
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
                      <h6 className="mb-4">Role</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/role">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className={`form-control ${error ? "is-invalid" : ""}`}
                          id="roleName"
                          placeholder="Role Name"
                          value={roleName}
                          onChange={handleRoleNameChange}
                          name="roleName"
                        />
                        {error && <div className="invalid-feedback">{error}</div>}
                      </div>
                    </div>

                   

                    {/* Group Checkboxes into a flex container */}
                    <div className="table-responsive">
                      <table className="table mt-4">
                        <tbody>
                          <tr>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="check1"
                                  name="option1"
                                  value="something"
                                />
                                <label className="form-check-label" htmlFor="check1">
                                  Option 1
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="check2"
                                  name="option2"
                                  value="something"
                                />
                                <label className="form-check-label" htmlFor="check2">
                                  Option 2
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="check3"
                                  name="option3"
                                  value="something"
                                />
                                <label className="form-check-label" htmlFor="check3">
                                  Option 3
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="check4"
                                  name="option4"
                                  value="something"
                                />
                                <label className="form-check-label" htmlFor="check4">
                                  Option 4
                                </label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary w-10"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="d-flex justify-content-center align-items-center">
                            <Spinner animation="border" size="sm" />
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRole;
