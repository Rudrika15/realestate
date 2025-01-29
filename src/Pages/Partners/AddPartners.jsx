import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { addPartner, getProject } from "../../Api/ApiDipak";

function AddPartners() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [inputFields, setInputFields] = useState([
    { selectProject: "", percentage: "" },
  ]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const percentageRef = useRef(null);
  const submitRef = useRef(null);

  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddInput = () => {
    setInputFields([...inputFields, { selectProject: "", percentage: "" }]);
  };

  const validateForm = () => {
    const errors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name.trim()) {
      errors.name = "Name is required.";
    } else if (!nameRegex.test(name.trim())) {
      errors.name = "Name must only contain letters.";
    }

    // Validate each pair of selectProject and percentage
    inputFields.forEach((field, index) => {
      if (!field.selectProject) {
        errors[`selectProject-${index}`] = "Project is required.";
      }
      if (!field.percentage) {
        errors[`percentage-${index}`] = "Percentage is required.";
      } else if (
        isNaN(field.percentage) ||
        field.percentage < 0 ||
        field.percentage > 100
      ) {
        errors[`percentage-${index}`] =
          "Percentage must be a number between 0 and 100.";
      }
    });

    return errors;
  };

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    const updatedFields = [...inputFields];
    updatedFields[index][field] = value;
    setInputFields(updatedFields);

    setError((prevState) => {
      const newErrors = { ...prevState };
      if (field === "name") {
        delete newErrors.name;
      } else {
        delete newErrors[`${field}-${index}`];
      }
      return newErrors;
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (error.name) {
      setError((prevState) => {
        const newErrors = { ...prevState };
        delete newErrors.name;
        return newErrors;
      });
    }
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
          toast.success(response.data.message);
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
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const partnerData = {
        partner_name: name.trim(),
        projectPartners: inputFields.map((field) => ({
          projectId: field.selectProject,
          percentage: parseFloat(field.percentage.trim()),
        })),
      };
  
      console.log(partnerData); 
  
      const response = await axios.post(addPartner, partnerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        toast.success("Partner added successfully!");
        setLoading(false);
        navigate("/partners");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
      setLoading(false);
    }
  };
  
  return (
    <>
      <ToastContainer />

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
                        <div className="input-container">
                          <input
                            type="text"
                            className={`form-control mb-1 ${
                              error.name ? "is-invalid" : ""
                            }`}
                            placeholder="Name"
                            value={name}
                            onChange={handleNameChange}
                            ref={nameRef}
                          />
                          {error.name && (
                            <div className="invalid-feedback">{error.name}</div>
                          )}
                        </div>
                      </div>
                      <div className="col"></div>
                    </div>

                    {inputFields.map((inputField, index) => (
                      <div key={index} className="row pt-4">
                        <div className="col">
                          <select
                            className={`form-select form-select-sm p-2 ${
                              error[`selectProject-${index}`]
                                ? "is-invalid"
                                : ""
                            }`}
                            value={inputField.selectProject}
                            onChange={(e) =>
                              handleInputChange(e, index, "selectProject")
                            }
                          >
                            <option value="">Select Project</option>
                            {projects.map((project) => (
                              <option key={project.id} value={project.id}>
                                {project.projectName}
                              </option>
                            ))}
                          </select>
                          {error[`selectProject-${index}`] && (
                            <div className="invalid-feedback">
                              {error[`selectProject-${index}`]}
                            </div>
                          )}
                        </div>
                        <div className="col input-container">
                          <input
                            type="number"
                            className={`form-control mb-1 ${
                              error[`percentage-${index}`] ? "is-invalid" : ""
                            }`}
                            placeholder="Percentage"
                            value={inputField.percentage}
                            onChange={(e) =>
                              handleInputChange(e, index, "percentage")
                            }
                          />
                          {index === inputFields.length - 1 && (
                            <i
                              className="bi bi-plus-circle-fill icon-2"
                              onClick={handleAddInput}
                            ></i>
                          )}
                          {error[`percentage-${index}`] && (
                            <div className="invalid-feedback">
                              {error[`percentage-${index}`]}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

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


