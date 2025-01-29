import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import Topbar from "../../Components/Topbar/Topbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import {
  fetchPartner, // fetch partner
  editPartner, // fetch project and per.
  getProject, // fetch partner drop down
  deletePartner, // partner wise data delete
  updatePartner,
} from "../../Api/ApiDipak";

const EditPartners = () => {
  const [partner, setPartner] = useState({ name: "" });
  const [dynamicFields, setDynamicFields] = useState([
    { projectName: "", percentage: "" },
  ]);
  const [projects, setProjects] = useState([]);
  const [error, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPartners = async () => {
    // partner fetch
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token is missing.");
        return;
      }
      const response = await axios.get(`${fetchPartner}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPartner({ name: response.data.data.partnerName || "" });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error fetching partner:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Session expired! Please log in again.");
        navigate("/");
      }
    }
  };

  const fetchProjects = async () => {
    // Multipal Project fetch in dropdown
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
      if (error.response && error.response.status === 401) {
        navigate("/");
      } else {
        console.error("Error response:", error.response.data);
      }
    }
  };

  const fetchProject = async () => {
    // multipal project fetch
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token is missing.");
        return;
      }

      const response = await axios.get(`${editPartner}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (
        response.data.status === true &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const partnersData = response.data.data;
        const partnerData = partnersData.find(
          (partner) => partner.partnerId === parseInt(id)
        );
        if (partnerData) {
          const fields = partnersData.map((partner) => ({
            projectName: partner.project.projectName,
            percentage: partner.percentage,
            id: partner.id,
          }));
          setDynamicFields(fields);
        }
      }
    } catch (error) {
      console.error("Error fetching partner:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Session expired! Please log in again.");
        navigate("/");
      }
      toast.error("Error fetching partner.");
    }
  };

  useEffect(() => {
    fetchPartners();
    fetchProjects();
    fetchProject();
  }, [id]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFields = [...dynamicFields];
    updatedFields[index][name] = value;
    setDynamicFields(updatedFields);

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleAddFields = () => {
    setDynamicFields([...dynamicFields, { projectName: "", percentage: "" }]);
  };

  const handlePartnerNameChange = (e) => {
    const { value } = e.target;
    setPartner({ ...partner, name: value });
  };

  const validateFields = () => {
    let isValid = true;
    const validationErrors = {};

    dynamicFields.forEach((field, index) => {
      if (!field.projectName) {
        validationErrors[`projectName_${index}`] = "Project name is required";
        isValid = false;
      }
      if (!field.percentage) {
        validationErrors[`percentage_${index}`] = "Percentage is required";
        isValid = false;
      } else if (isNaN(field.percentage)) {
        validationErrors[`percentage_${index}`] =
          "Percentage must be a valid number";
        isValid = false;
      } else if (
        parseFloat(field.percentage) < 0 ||
        parseFloat(field.percentage) > 100
      ) {
        validationErrors[`percentage_${index}`] =
          "Percentage must be between 0 and 100";
        isValid = false;
      }
    });
    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    const percentages = dynamicFields.map((field) => field.percentage);
    const projectIds = dynamicFields.map((field) => {
      const project = projects.find(
        (project) => project.projectName === field.projectName
      );
      return project ? project.id : null;
    });
    const filteredProjectIds = projectIds.filter((id) => id !== null);

    const PartnerData = {
      // partner_id: id,
      // partner_name: partner.name,
      percentages,
      projectIds: filteredProjectIds,
    };

    console.log(PartnerData);

    const token = localStorage.getItem("token");

    try {
      if (!token) {
        toast.error("Token is missing or expired.");
        return;
      }
      const response = await axios.post(`${updatePartner}/${id}`, PartnerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      if (response.data.status === true) {
        toast.success("Partner updated successfully!");
        navigate("/partners");
      } else {
        toast.error("Failed to update partner.");
      }
    } catch (error) {
      console.error("Error updating partner:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    }
  };

  const handleDelete = async (id) => {
    // project wise delete
    // console.log("Deleting project with ID:", id);
    const confirmDelete = await Swal.fire({
      title: "Are You Sure You Want to Delete?",
      text: "Once you delete, all the data related to this project will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c4c4c4",
      customClass: {
        title: "swal-title",
        text: "swal-text",
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
    });

    if (confirmDelete.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token is missing.");
          return;
        }
        const response = await axios.delete(`${deletePartner}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status === true) {
          Swal.fire({
            title: "Deleted!",
            text: "The project has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          toast.success(response.data.message);
          setDynamicFields(dynamicFields.filter((field) => field.id !== id));
        } else {
          toast.error("Failed to delete project.");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Session expired! Please log in again.");
          navigate("/");
        }
        toast.error("An error occurred while deleting the project.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Edit Partner</title>
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
                      <h6 className="mb-4">Edit Partners</h6>
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
                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Partner Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            error.name ? "is-invalid" : ""
                          }`}
                          placeholder="Partner Name"
                          name="name"
                          value={partner.name}
                          onChange={handlePartnerNameChange}
                          readOnly
                        />
                        {error.name && (
                          <div className="invalid-feedback">{error.name}</div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>

                    {dynamicFields.map((field, index) => (
                      <div className="row mb-3" key={index}>
                        <div className="col-6 ">
                          <label className="form-label">Project Name</label>
                          <select
                            className={`form-select form-select-sm p-2 ${
                              error[`selectProject-${index}`]
                                ? "is-invalid"
                                : ""
                            }`}
                            value={field.projectName}
                            onChange={(e) => handleInputChange(e, index)}
                            name="projectName"
                          >
                            <option value="">Select Project</option>
                            {projects.map((project) => (
                              <option
                                key={project.id}
                                value={project.projectName}
                              >
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

                        <div className="col">
                          <label className="form-label">Percentage</label>
                          <input
                            type="number"
                            className={`form-control ${
                              error[`percentage_${index}`] ? "is-invalid" : ""
                            }`}
                            placeholder="Percentage"
                            name="percentage"
                            value={field.percentage}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                          {error[`percentage_${index}`] && (
                            <div className="invalid-feedback">
                              {error[`percentage_${index}`]}
                            </div>
                          )}
                        </div>
                        <div className="col mt-1">
                          <label className="form-label">&nbsp;</label>
                          <div className="d-flex gap-2">
                            <span>
                              <i
                                className="bi bi-plus-circle-fill"
                                onClick={handleAddFields}
                                style={{ cursor: "pointer" }}
                              ></i>
                            </span>
                            <span>
                              <i
                                className="bi bi-x-circle-fill"
                                onClick={() => handleDelete(field.id)}
                                style={{ cursor: "pointer" }}
                              ></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      disabled={loading}
                    >
                      {loading ? (
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

export default EditPartners;
