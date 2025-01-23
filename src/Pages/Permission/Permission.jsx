import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import axios from "axios";
import { PermissionFetch, PermissionDelete } from "../../Api/Apikiran";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Permission() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  // Fetch permissions from API
  const fetchPermission = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(PermissionFetch, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === true) {
        setPermissions(response.data.data);
      } else {
        toast.error("Failed to fetch permission data!");
      }
    } catch (error) {
      console.error("Error fetching permission:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      } else {
        toast.error("Error fetching permission data.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle permission deletion
  const handleDeletePermission = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are You Sure You Want to Delete?",
      text: "Once you delete, all the data related to this permission will be deleted.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c4c4c4",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${PermissionDelete}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === true) {
          Swal.fire({
            title: "Deleted!",
            text: "The permission has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          fetchPermission(); 
        } else {
          toast.error("Failed to delete permission!");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the permission!");
        if (error.response && error.response.status === 401) {
          navigate("/");
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };

  const handleEditPermission = (id) => {
    navigate(`/editpermission/${id}`);
  };

  useEffect(() => {
    fetchPermission();
  }, []);

  return (
    <>
      <Helmet>
        <title>React Estate | Permission</title>
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
                      <h6 className="mb-4">Permission</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/addnewpermission">
                        <h6 className="mb-4">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                          >
                            Add Permission
                          </button>
                        </h6>
                      </Link>
                    </div>
                  </div>

                  <div className="table-responsive">
                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      <table className="table table-bordered mt-4">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Option</th>
                          </tr>
                        </thead>
                        <tbody>
                          {permissions.map((permission) => (
                            <tr key={permission.id}>
                              <td>{permission.permissionName}</td>
                              <td>
                                <button
                                  className="btn btn-warning btn-sm me-2"
                                  onClick={() =>
                                    handleEditPermission(permission.id)
                                  }
                                  aria-label={`Edit permission ${permission.permissionName}`}
                                >
                                  <i className="bi bi-pen"></i> Edit
                                </button>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    handleDeletePermission(permission.id)
                                  }
                                  aria-label={`Delete permission ${permission.permissionName}`}
                                >
                                  <i className="bi bi-trash"></i> Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Permission;
