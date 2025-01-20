import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link,useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { PermissionFetch } from "../../Api/Apikiran";
import { toast } from "react-toastify";

function Permission() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);

  const navigate=useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

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
      if (error.response && error.response.status === 401) {
        navigate('/'); 
    }
      toast.error("Error fetching permission.");
    }
  };

  const handleCheckboxChange = (id) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.id === id
          ? { ...permission, isChecked: !permission.isChecked }
          : permission
      )
    );
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
                      <Link to="/addnewpermission" className="">
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
                              <Link class="btn btn-warning btn-sm me-2">
                                <i className="bi bi-pen"></i>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
