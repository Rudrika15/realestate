import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { AddRoles } from "../../Api/Apikiran";
import { PermissionFetch } from "../../Api/Apikiran";

function AddRole() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [role_name, setRole_Name] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const fetchPermission = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token: ", token);

      const response = await axios.get(`${PermissionFetch}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === true) {
        console.log("Permissions data:", response.data.data);
        setPermissions(response.data.data);
      } else {
        toast.error("Failed to fetch permission data!");
      }
    } catch (error) {
      console.error("Error fetching permission:", error);
      toast.error("Error fetching permission.");
    }
  };

  useEffect(() => {
    fetchPermission();
  }, []);

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;

    setSelectedPermissions((prevSelectedPermissions) => {
      if (checked) {
        return [...prevSelectedPermissions, value];
      } else {
        return prevSelectedPermissions.filter(
          (permission) => permission !== value
        );
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role_name) {
      setError("Role name is required");
      return;
    }

    if (selectedPermissions.length === 0) {
      toast.error("Please select at least one permission.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        AddRoles,
        { role_name, permissions: selectedPermissions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast.success("Role added successfully!");
        setRole_Name("");
        setSelectedPermissions([]);
        setTimeout(() => {
          navigate("/role");
        }, 2000);
      } else {
        toast.error(response.data.message || "Failed to add role");
      }
    } catch (error) {
      toast.error("Failed to add role. Please try again.");
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
                          className={`form-control ${
                            error ? "is-invalid" : ""
                          }`}
                          id="role_name"
                          placeholder="Role Name"
                          value={role_name}
                          onChange={(e) => setRole_Name(e.target.value)}
                          name="roleName"
                        />
                        {error && (
                          <div className="invalid-feedback">{error}</div>
                        )}
                      </div>
                    </div>
                    <div className="container-fluid">
                      <div className="row">
                      {permissions && permissions.length > 0 ? (
                            permissions.map((permission) => (
                                <div  key={permission.id} className="col-md-3">
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id={`permission-${permission.id}`}
                                      name="permissions"
                                      value={permission.id}
                                      onChange={handlePermissionChange}
                                      checked={selectedPermissions.includes(
                                        permission.id.toString()
                                      )}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`permission-${permission.id}`}
                                    >
                                      {permission.permissionName}
                                    </label>
                                  </div>
                                </div>
                            ))
                          ) : (
                            <div>
                              <span colSpan="2">No permissions available</span>
                            </div>
                          )}
                      </div>
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
