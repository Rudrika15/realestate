import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Helmet } from "react-helmet";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { PermissionFetch, updatedPermission } from "../../Api/Apikiran";

function EditPermission() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permissionName, setpermissionName] = useState("");
  const [permissionNameError, setPermissionNameError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPermission = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token is missing. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await axios.get(`${PermissionFetch}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data); // Log the response to check

      if (response.data.status) {
        const { permissionName } = response.data.data;
        setpermissionName(permissionName || "");
      } else {
        toast.error(
          response?.data?.message || "Failed to fetch permission details."
        );
      }
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response && error.response.status === 401) {
        navigate("/permission");
      } else if (error.response && error.response.status === 404) {
        toast.error("Permission not found.");
      } else {
        toast.error("An error occurred while fetching permission details.");
      }
    }
  };

  useEffect(() => {
    fetchPermission();
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

    if (!handleValidation()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token is missing. Please log in again.");
        setLoading(false);
        navigate("/");
        return;
      }

      const response = await axios.post(
        `${updatedPermission}/${id}`,
        {
          permissionName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === true) {
        toast.success(
          response.data.message || "Permission updated successfully"
        );
        setTimeout(() => {
          navigate("/permission");
        }, 1000);
      } else {
        toast.error(response?.data?.message || "Failed to update permission.");
        console.log("Fetched permission name:", permissionName);
        
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
      toast.error("An error occurred while updating permission details.");
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
                          onChange={(e) => setpermissionName(e.target.value)}
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

export default EditPermission;
