import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Projects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const staticData = [
    { id: 1, projectName: "Shiv", totalUnits: 5 },
    { id: 2, projectName: "Demo", totalUnits: 3 },
  ];

  const [data, setData] = useState(
    staticData.sort((a, b) => a.projectName.localeCompare(b.projectName))
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
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
                    <div className="p-2 ">
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

                  {data.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col">Project Name</th>
                            <th scope="col" className="w-25">
                              Total Units
                            </th>
                            <th scope="col " className="w-25">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((project) => (
                            <tr key={project.id}>
                              <td>{project.projectName}</td>
                              <td>{project.totalUnits}</td>
                              <td>
                                <Link
                                  to="/unit"
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
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleClick(project.id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
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
    </>
  );
};

export default Projects;
