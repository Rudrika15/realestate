import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import Topbar from "../../Components/Topbar/Topbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { editPartner, updatePartner } from "../../Api/ApiDipak";

const EditPartners = () => {
  const [partner, setPartner] = useState({  name: "", percentage: "" });
  const [Xyz, setXyz] = useState(""); 

  const [projectName, setProjectName] = useState(""); 
  const [error, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPartner = async () => {
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

      console.log(response.data.data.ProjectPartners[0]);

      if (response.data.status === true) {
        
        const {  name=response.data.data.ProjectPartners[0].partnerName, percentage, project } = response.data.data;
        setPartner({  name , percentage });
        setProjectName(project ? project.projectName : ""); 
      } else {
        toast.error("Failed to fetch partner data!");
      }
    } catch (error) {
      console.error("Error fetching partner:", error);
      toast.error("Error fetching partner.");
    }
  };

  useEffect(() => {
    fetchPartner();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartner((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateFields = () => {
    let isValid = true;
    const validationErrors = {};
    if (!partner.name) {
      validationErrors.name = "Please enter Name for partner";
      isValid = false;
    } else if (!/^[A-Za-z ]+$/.test(partner.name)) {
      validationErrors.name = "Name can only contain letters and spaces";
      isValid = false;
    }
    if (!partner.percentage) {
      validationErrors.percentage = "Please enter Percentage for partner";
      isValid = false;
    } else if (isNaN(partner.percentage)) {
      validationErrors.percentage = "Percentage must be a valid number";
      isValid = false;
    } else if (
      parseFloat(partner.percentage) < 0 ||
      parseFloat(partner.percentage) > 100
    ) {
      validationErrors.percentage = "Percentage must be between 0 and 100";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    setLoading(true);
    const PartnerData = {
      partner_id: id,
      partner_name: partner.name,
      percentage: partner.percentage,
      project_id: partner.projectId, 
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token is missing or expired.");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${updatePartner}/${id}`, PartnerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === true) {
        toast.success("Partner updated successfully!");
        setTimeout(() => {
          setLoading(false);
          navigate("/partners");
        }, 1000);
      } else {
        toast.error("Failed to update partner.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating partner:", error);
      toast.error("An error occurred while updating the partner.");
      setLoading(false);
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
                        <label className="form-label">Project Name</label>
                        <input
                          type="text"
                          className={`form-control`}
                          placeholder="Project Name"
                          name="projectName"
                          value={projectName}
                        />
                      </div>
                      <div className="col">
                        <label className="form-label"> Partner Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            error.name ? "is-invalid" : ""
                          }`}
                          placeholder="Partner Name"
                          name="name"
                          value={partner.name}
                          onChange={handleInputChange}
                          readOnly

                        />
                        {error.name && (
                          <div className="invalid-feedback">{error.name}</div>
                        )}
                      </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Percentage</label>
                        <input
                          type="number"
                          className={`form-control ${
                            error.percentage ? "is-invalid" : ""
                          }`}
                          placeholder="Percentage"
                          name="percentage"
                          value={partner.percentage}
                          onChange={handleInputChange}
                        />
                        {error.percentage && (
                          <div className="invalid-feedback">
                            {error.percentage}
                          </div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
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
