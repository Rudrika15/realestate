import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";  
import { AddPermissions } from "../../Api/Apikiran";

function AddNewPermission() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [permissionName, setPermissionName] = useState("");  
  const [permissionNameError, setPermissionNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); 
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const handleInputChange = (e) => {
    setPermissionName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!permissionName.trim()) {
        setPermissionNameError(true);
        return;
    }
    setPermissionNameError(false);

    setLoading(true);

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Token is missing. Please login again.");
            return;
        }

        
        const response = await axios.post(
            AddPermissions,  
            { permission: permissionName }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(response.data); 

        
        if (response.data && response.data.status) {
            toast.success("Permission added successfully!");
            setPermissionName(""); 
            setTimeout(() => {
                navigate("/permission");
            }, 1000);
        } else {
            toast.error(response.data.message || "Failed to add permission");
        }
    } catch (error) {
        console.error(error); 
        toast.error("Failed to add permission. Please try again.");
    } finally {
        setLoading(false);
    }
};

  return (
    <>
      <Helmet>
        <title>React Estate | Add Permission</title>
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
                    <h6>Add Permission</h6>
                    <Link to="/permission">
                      <h6>
                        <i className="bi bi-arrow-left-circle-fill"></i> Back
                      </h6>
                    </Link>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3 w-50">
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${
                            permissionNameError ? "is-invalid" : ""
                          }`}
                          placeholder="Permission Name"
                          value={permissionName}
                          onChange={handleInputChange} 
                        />
                        {permissionNameError && (
                          <div className="invalid-feedback">
                            Please enter a permission name
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddNewPermission;
