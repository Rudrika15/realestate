import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [partner, setPartner] = useState({ name: "", percentage: "" }); 
  const [dynamicFields, setDynamicFields] = useState([{ projectName: "", percentage: "" }]); 
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

      if (response.data.status === true && response.data.data && response.data.data.length > 0) {
        const partnersData = response.data.data;

        const partnerData = partnersData.find((partner) => partner.partnerId === parseInt(id));
        if (partnerData) {
          setPartner({
            name: partnerData.project.projectName, 
            percentage: partnerData.percentage,
          });

          const fields = partnersData.map((partner) => ({
            projectName: partner.project.projectName,
            percentage: partner.percentage,
          }));
          setDynamicFields(fields); 
        }

        console.log(response.data.data);
        
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
        validationErrors[`percentage_${index}`] = "Percentage must be a valid number";
        isValid = false;
      } else if (parseFloat(field.percentage) < 0 || parseFloat(field.percentage) > 100) {
        validationErrors[`percentage_${index}`] = "Percentage must be between 0 and 100";
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

    setLoading(true);
    const PartnerData = {
      partner_id: id,
      partner_name: partner.name,
      dynamicFields, 
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
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
      toast.error("An error occurred while updating the partner.");
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
                          className={`form-control ${error.name ? "is-invalid" : ""}`}
                          placeholder="Partner Name"
                          name="name"
                          value={partner.name}
                          onChange={handlePartnerNameChange}
                        />
                        {error.name && (
                          <div className="invalid-feedback">{error.name}</div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>

                    {dynamicFields.map((field, index) => (
                      <div className="row mb-3" key={index}>
                        <div className="col-6">
                          <label className="form-label">Project Name</label>
                          <input
                            type="text"
                            className={`form-control ${error[`projectName_${index}`] ? "is-invalid" : ""}`}
                            placeholder="Project Name"
                            name="projectName"
                            value={field.projectName}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                          {error[`projectName_${index}`] && (
                            <div className="invalid-feedback">
                              {error[`projectName_${index}`]}
                            </div>
                          )}
                        </div>
                        <div className="col">
                          <label className="form-label">Percentage</label>
                          <input
                            type="number"
                            className={`form-control ${error[`percentage_${index}`] ? "is-invalid" : ""}`}
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
                          <div>
                            <span>
                              <i
                                className="bi bi-plus-circle-fill"
                                onClick={handleAddFields}
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
