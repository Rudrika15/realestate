import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";  

function AddRole() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [role_Name, setRole_Name] = useState(""); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]); 
  const navigate = useNavigate(); 

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const handleRoleNameChange = (e) => {
    setRole_Name(e.target.value);
    setError(""); 
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;

    
    if (checked) {
      setPermissions([...permissions, value]);
    } else {
  
      setPermissions(permissions.filter(permission => permission !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role_Name.trim()) {
      setError("Role Name is required.");
      return;
    }
    
    const data = {
      role_Name,
      permissions, 
    };

    try {
      setLoading(true); 
      const response = await axios.post("/AddRole", data); 
      if (response.data.status) {
        toast.success('Role added successfully');
        setTimeout(() => navigate('/role'), 1000);  
      } else {
        toast.error(response.data.message || 'Failed to add role');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);  
    }
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
                          value={role_Name}
                          onChange={handleRoleNameChange}
                          name="roleName"
                        />
                        {error && <div className="invalid-feedback">{error}</div>}
                      </div>
                    </div>

                  
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
                                  value="permission1"
                                  onChange={handlePermissionChange}
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
                                  value="permission2"
                                  onChange={handlePermissionChange}
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
                                  value="permission3"
                                  onChange={handlePermissionChange}
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
                                  value="permission4"
                                  onChange={handlePermissionChange}
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
//how to add role api
//how to  add permission api 
//how  to right permission and to get a role view display
