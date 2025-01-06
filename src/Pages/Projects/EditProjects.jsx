import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import Topbar from "../../Components/Topbar/Topbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

const EditProjects = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { projectId, projectName, totalUnits } = location.state || {};

  const [formData, setFormData] = useState({
    projectName: projectName || "",
    // totalUnits: totalUnits || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    projectNameError: false,
    // totalUnitsError: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const validationErrors = {
      projectNameError: false,
      // totalUnitsError: false,
    };

    if (!formData.projectName.trim()) {
      validationErrors.projectNameError = true;
      isValid = false;
    }

    // if (
    //   !formData.totalUnits ||
    //   isNaN(formData.totalUnits) ||
    //   parseFloat(formData.totalUnits) <= 0
    // ) {
    //   validationErrors.totalUnitsError = true;
    //   isValid = false;
    // }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Project updated successfully!");
      navigate("/projects");
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Edit Project</title>
      </Helmet>

      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar />
        <div className="content">
          <Topbar />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="p-2">
                      <h6 className="mb-4">Edit Project</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/projects">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col mb-3">
                        <label>Project Name</label>
                        <input
                          type="text"
                          name="projectName"
                          value={formData.projectName}
                          onChange={handleChange}
                          className={`form-control mt-1 ${
                            errors.projectNameError ? "is-invalid" : ""
                          }`}
                          placeholder="Project Name"
                        />
                        {errors.projectNameError && (
                          <div className="invalid-feedback">
                            Project Name is required.
                          </div>
                        )}
                      </div>

                      <div className="col mb-3">
                        {/* <label>Total Units</label>
                        <input
                          type="number"
                          name="totalUnits"
                          value={formData.totalUnits}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.totalUnitsError ? "is-invalid" : ""
                          }`}
                          placeholder="Total Units"
                        />
                        {errors.totalUnitsError && (
                          <div className="invalid-feedback">
                            Total Units must be a positive number.
                          </div>
                        )} */}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Save Changes"
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
};

export default EditProjects;
