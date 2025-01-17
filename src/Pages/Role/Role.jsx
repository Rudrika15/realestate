import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { DeleteRole, ViewRoleData } from "../../Api/Apikiran";
import axios from "axios";
import Swal from "sweetalert2";
import { RoleHasPermission } from "../../Api/Apikiran";

const Role = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(ViewRoleData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.status === true) {
        setData(res.data.data);
      } else {
        setError("Failed to load users.");
      }
    } catch (error) {
      setError("There was an error fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are You Sure You Want to Delete?",
      text: "Once you delete, all the data related to this user will be deleted.",
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
        const response = await axios.delete(`${DeleteRole}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === true) {
          Swal.fire({
            title: "Deleted!",
            text: "The Role has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          setData(data.filter((item) => item.id !== id));
        } else {
          toast.error("Failed to delete role!");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the role!");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Role</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <Topbar toggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="p-2">
                      <h6 className="mb-4">Role List</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/add-role" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-plus-circle-fill"></i> New Role
                        </h6>
                      </Link>
                    </div>
                  </div>
                  {data.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col" className="w-25">
                              Role Id
                            </th>
                            <th scope="col">Role Name</th>
                            <th scope="col">Permission</th>
                            <th scope="col" className="w-25">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((role) => (
                            <tr key={role.id}>
                              <td>{role.id}</td>
                              <td>{role.role_name}</td>
                              <td>
                                <div>
                                  {role.Permissions.length > 0 ? (
                                    <select
                                      aria-label="Permissions"
                                      className="form-select form-select-sm w-80"
                                      defaultValue=""
                                    >
                                      <option value="" disabled>
                                        Select Permission
                                      </option>
                                      {role.Permissions.map(
                                        (permission, index) => (
                                          <option
                                            key={index}
                                            value={permission.permissionName}
                                          >
                                            {permission.permissionName}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  ) : (
                                    <div>No data</div>
                                  )}
                                </div>
                              </td>

                              <td>
                                <Link
                                  to={`/edit-role`}
                                  className="btn btn-warning btn-sm me-2"
                                >
                                  <i className="fas fa-edit"></i>
                                </Link>
                                <Link
                                  onClick={() => handleDelete(role.id)}
                                  className="btn btn-danger btn-sm"
                                >
                                  <i className="fas fa-trash"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src="img/image_2024_12_26T09_23_33_935Z.png"
                        alt="No Users"
                        className="img-fluid w-25 h-25"
                      />
                      <p className="text-dark">No Role Found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        /* Optional additional styling */
        .form-select:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
        }

        .form-select:hover {
          border-color: #0056b3;
        }
      `}</style>
    </>
  );
};

export default Role;
