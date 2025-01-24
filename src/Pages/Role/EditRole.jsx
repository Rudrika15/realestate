import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { EditRoleData, PermissionFetch, RoleHasPermission, updateRole } from "../../Api/Apikiran";

function EditRole() {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [role_name, setRole_name] = useState("");
  const [role_nameerror, setRole_nameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permissionsLoading, setPermissionsLoading] = useState(true);
  const navigate = useNavigate();
  const role_nameRef = useRef(null);
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const fetchRoleHasPermission = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token is missing. Please log in again.");
        return;
      }

      const response = await axios.get(`${RoleHasPermission}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === true) {
        const roleData = response.data.data;
        setRole_name(roleData.role_name);

        const permissionNames = roleData.permissions?.map((perm) => perm.permissionName) || [];
        setSelectedPermissions(permissionNames);
      } else {
        toast.error("Failed to fetch role permissions.");
      }
    } catch (error) {
      console.error("Error fetching role permissions:", error);
      if (error.response?.status === 401) {
        navigate("/");
      }
      toast.error("Error fetching role permissions.");
    }
  };

  const fetchPermissions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(PermissionFetch, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        setPermissions(response.data.data);
      } else {
        toast.error("Failed to fetch permission data!");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      if (error.response?.status === 401) {
        navigate("/");
      }
      toast.error("Error fetching permissions.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setPermissionsLoading(true);
      try {
        await fetchPermissions();
        await fetchRoleHasPermission();
      } finally {
        setPermissionsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;

    setSelectedPermissions((prevSelectedPermissions) =>
      checked
        ? [...prevSelectedPermissions, value]
        : prevSelectedPermissions.filter((name) => name !== value)
    );
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!role_name) {
      setRole_nameError(true);
      isValid = false;
    } else {
      setRole_nameError(false);
    }

    if (isValid) {
      setLoading(true);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token is missing. Please log in again.');
          setLoading(false);
          return;
        }

        const response = await axios.post(`${updateRole}/${id}`,
          {
            role_name,
            permissions: selectedPermissions, 
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.status === true) {
          toast.success(response.data.message || 'Role updated successfully');
          setTimeout(() => {
            navigate("/role");
          }, 1000);
          console.log(response.data.data); 
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
        toast.error('An error occurred while updating role details.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Edit Role</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <Topbar
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isTopbarOpen={isTopbarOpen}
            toggleTopbar={() => setIsTopbarOpen(!isTopbarOpen)}
          />
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Edit Role</h6>
                    <Link to="/role">
                      <h6>
                        <i className="bi bi-arrow-left-circle-fill"></i> Back
                      </h6>
                    </Link>
                  </div>
                  <form onSubmit={handleEdit}>
                    <div className="row mb-3 w-50">
                      <input
                        className={`form-control ${role_nameerror ? "is-invalid" : ""}`}
                        ref={role_nameRef}
                        onChange={(e) => {
                          setRole_name(e.target.value);
                          if (e.target.value) setRole_nameError(false);
                        }}
                        value={role_name}
                      />
                      {role_nameerror && (
                        <div className="invalid-feedback">Role name is required.</div>
                      )}
                    </div>
                    {permissionsLoading ? (
                      <div className="text-center">
                        <Spinner animation="border" />
                      </div>
                    ) : (
                      <div className="container-fluid">
                        <div className="row">
                          {permissions.map((permission) => (
                            <div key={permission.permissionName} className="col-md-3">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`permission-${permission.permissionName}`}
                                  name="permissions"
                                  value={permission.permissionName}  
                                  onChange={handlePermissionChange}
                                  checked={selectedPermissions.includes(permission.permissionName)}  
                                />
                                <label className="form-check-label" htmlFor={`permission-${permission.permissionName}`}>
                                  {permission.permissionName}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
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
}

export default EditRole;
