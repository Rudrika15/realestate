import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Swal from "sweetalert2";
import axios from "axios";
import { getProject } from "../../Api/ApiDipak";
import Multiselect from "multiselect-react-dropdown";

const Projects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");

          return;
        }

        const response = await axios.get(getProject, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.status === true && response.data.data) {
          setData(response.data.data);
          // toast.success(response.data.message);
        } else {
          console.error("Projects data not found in the response.");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            navigate("/");
          } else {
            console.error("Error response:", error.response.data);
          }
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "It may affect projects as well.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c4c4c4",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((project) => project.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The project has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Projects</title>
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
                      <h6 className="mb-4">Projects</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/add-projects" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-plus-circle-fill"></i> New Project
                        </h6>
                      </Link>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : currentData.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col">Project Id</th>
                            <th scope="col">Project Name</th>
                            <th scope="col" className="w-25">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentData.map((project) => (
                            <tr key={project.id}>
                              <td>{project.id}</td>
                              <td>{project.projectName}</td>
                              <td>
                                <Link
                                  to={`/unit/${project.id}`}
                                  className="btn btn-info btn-sm me-2"
                                >
                                  <i className="fas fa-eye"></i>
                                </Link>
                                <Link
                                  to="/edit-projects"
                                  className="btn btn-warning btn-sm me-2"
                                >
                                  <i className="fas fa-edit"></i>
                                </Link>

                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm me-2"
                                  onClick={() => handleClick(project.id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                                <Link
                                  to={`/project-stage/${project.id}`}
                                  className="btn btn-secondary btn-sm"
                                >
                                  <i className="bi bi-bar-chart"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-end">
                          <li
                            className={`page-item ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(currentPage - 1)}
                            >
                              &laquo; Previous
                            </button>
                          </li>

                          {Array.from({ length: totalPages }, (_, i) => (
                            <li
                              key={i + 1}
                              className={`page-item ${
                                currentPage === i + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          ))}

                          <li
                            className={`page-item ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(currentPage + 1)}
                            >
                              Next &raquo;
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src="img/image_2024_12_26T09_23_33_935Z.png"
                        alt="No Projects"
                        className="img-fluid w-25 h-25"
                      />
                      <p className="text-dark">No Projects Found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Projects;
