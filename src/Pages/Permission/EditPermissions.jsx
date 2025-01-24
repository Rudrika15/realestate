import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Helmet } from "react-helmet";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { singleUpdatePermission, updatedPermission } from "../../Api/Apikiran";

function EditPermissions() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permissionName, setPermissionName] = useState("");
  const [permissionNameError, setPermissionNameError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPermissionDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token is missing. Please log in again.");
        navigate("/");
        return;
      }
      const response = await axios.get(`${singleUpdatePermission}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status) {
        const { permissionName } =
          response.data.data;
        setPermissionName(permissionName || "");

      } else {
        toast.error(
          response?.data?.message || "Failed to fetch permission details."
        );
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
      toast.error("An error occurred while permission details.");
    }
  };

  useEffect(() => {
    fetchPermissionDetails();
  }, [id]);

  const handleValidation = () => {
    let isValid = true;

    if (!permissionName.trim()) {
      setPermissionNameError("Name is required");
      isValid = false;
    } else {
      setPermissionNameError("");
    }

    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!handleValidation()) {
      return;
    }
  
    setLoading(true);
  
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      
      if (!token) {
        toast.error('Token is missing. Please log in again.');
        setLoading(false);
        return;
      }
  
      const response = await axios.post(
        `${updatedPermission}/${id}`,
        { permissionName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log("API Response:", response.data);
  
      if (response.data.status === true) {
        toast.success(response.data.message || 'Permission updated successfully');
        setTimeout(() => {
          navigate("/permission");
        }, 1000);
      } else {
        toast.error(response?.data?.message || 'Failed to update permission.');
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Error Response:", error.response.data);
        if (error.response.status === 401) {
          navigate('/');
        }
      }
      toast.error('An error occurred while updating permission details.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Edit Permission</title>
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
                    <h6 className="mb-4">Edit Permission</h6>
                    <Link to="/permission" className="mb-4">
                      <h6>
                        <i className="bi bi-arrow-left-circle-fill"></i> Back
                      </h6>
                    </Link>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          value={permissionName}
                          onChange={(e) => setPermissionName(e.target.value)}
                          placeholder="Enter permission name"
                        />
                        {permissionNameError && (
                          <small className="text-danger">
                            {permissionNameError}
                          </small>
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

export default EditPermissions;
