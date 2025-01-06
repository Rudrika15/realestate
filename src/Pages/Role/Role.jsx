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

const Role = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen); 
  };

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("ViewRoleData"); // Check the API endpoint
      const res = await axios.get(ViewRoleData, {
        params: { page: currentPage },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.status === true) {
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
      } else {
        setError("Failed to load users.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("There was an error fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(); 
  },[]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are You Sure You Want to Delete?',
      text: 'Once you delete, all the data related to this user will be deleted.',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#c4c4c4',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`DeleteRole${id}`);
          
          if (res.data.status === true) {
            setData((prevData) => prevData.filter((user) => user.id !== id));
            Swal.fire({
              title: 'Deleted!',
              text: 'The user has been deleted.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'There was an error deleting the user.',
              icon: 'error',
              confirmButtonColor: '#d33',
            });
          }
        } catch (error) {
          console.error("Error deleting the user:", error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the user.',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
        }
      }
    });
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
                          {data.map((user) => (
                            <tr key={user.id}>
                              <td>{user.id}</td>
                              <td>{user.name}</td>
                              <td>
                                <select
                                  className="form-select"
                                  value={user.permission}
                                  onChange={(e) => {
                                    const updatedData = data.map((u) =>
                                      u.id === user.id
                                        ? { ...u, permission: e.target.value }
                                        : u
                                    );
                                    setData(updatedData);
                                  }}
                                >
                                  <option value="Admin">Admin</option>
                                  <option value="Editor">Editor</option>
                                  <option value="Viewer">Viewer</option>
                                </select>
                              </td>
                              <td>
                                <Link
                                  to="/edit-role"
                                  className="btn btn-warning btn-sm me-2"
                                >
                                   <i className="fas fa-edit"></i>
                                </Link>
                                <Link
                                  onClick={() => handleDelete(user.id)}
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
    </>
  );
};

export default Role;
