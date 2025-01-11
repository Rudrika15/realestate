import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { addPartner, getProject } from "../../Api/ApiDipak";

function AddPartners() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectProject, setSelectProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const selectProjectRef = useRef(null);
  const nameRef = useRef(null);
  const percentageRef = useRef(null);
  const submitRef = useRef(null);

  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const validateForm = () => {
    const errors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name.trim()) {
      errors.name = "Name is required.";
    } else if (!nameRegex.test(name.trim())) {
      errors.name = "Name must only contain letters.";
    }
    if (!selectProject) {
      errors.selectProject = "Project is required.";
    }
    if (!percentage) {
      errors.percentage = "Percentage is required.";
    } else if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      errors.percentage = "Percentage must be a number between 0 and 100.";
    }

    return errors;
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    if (field === "name") {
      setName(value);
    } else if (field === "percentage") {
      setPercentage(value);
    } else if (field === "selectProject") {
      setSelectProject(value);
    }

    setError((prevState) => {
      const newErrors = { ...prevState };
      delete newErrors[field];
      return newErrors;
    });
  };
  useEffect(() => {
    const fetchProjects = async () => {
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
          setProjects(response.data.data);
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
        } else {
          console.error("Error message:", error.message);
        }
      }
    };

    fetchProjects();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setError(formErrors);
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    if (!selectProject) {
      setError((prevState) => ({
        ...prevState,
        selectProject: "Please select a project",
      }));
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      if (!token) {
        navigate("/");
        return;
      }

      const partnerData = {
        partner_name: name.trim(),
        percentage: percentage.trim(),
        projectId: selectProject,
      };
      console.log("Sending data:", partnerData);
      const response = await axios.post(addPartner, partnerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          
        },
      });

      console.log("Response from API:", response);

      if (response.status === 200) {
        setLoading(false);
        navigate("/partners");
      }
    } catch (error) {
      console.error("Error submitting data:", error);

      if (error.response) {
        console.error("Error response:", error.response.data);
      }

      if (error.response && error.response.status === 401) {
        navigate("/");
      }
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>React Estate | Add Partners</title>
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
                      <h6 className="mb-4">Add Partners</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/partners">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col">
                        <select
                          className={`form-select form-select-sm p-2 ${
                            error.selectProject ? "is-invalid" : ""
                          }`}
                          value={selectProject}
                          onChange={(e) =>
                            handleInputChange(e, "selectProject")
                          }
                          ref={selectProjectRef}
                        >
                          <option value="">Select Project</option>
                          {Array.isArray(projects) &&
                            projects.map((project) => (
                              <option key={project.id} value={project.id}>
                                {project.projectName}
                              </option>
                            ))}
                        </select>

                        {error.selectProject && (
                          <div className="invalid-feedback">
                            {error.selectProject}
                          </div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>

                    <div className="row pt-4">
                      <div className="col">
                        <div className="input-container">
                          <input
                            type="text"
                            className={`form-control mb-1 ${
                              error.name ? "is-invalid" : ""
                            }`}
                            placeholder="Name"
                            value={name}
                            onChange={(e) => handleInputChange(e, "name")}
                            ref={nameRef}
                          />
                          {error.name && (
                            <div className="invalid-feedback">{error.name}</div>
                          )}
                        </div>
                      </div>

                      <div className="col position-relative">
                        <div className="input-container">
                          <input
                            type="number"
                            className={`form-control mb-1 ${
                              error.percentage ? "is-invalid" : ""
                            }`}
                            placeholder="Percentage"
                            value={percentage}
                            onChange={(e) => handleInputChange(e, "percentage")}
                            ref={percentageRef}
                          />
                          {error.percentage && (
                            <div className="invalid-feedback">
                              {error.percentage}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      ref={submitRef}
                      disabled={loading}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Submit"
                      )}
                    </button>

                    {error.api && (
                      <div className="invalid-feedback">{error.api}</div>
                    )}
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

export default AddPartners;
