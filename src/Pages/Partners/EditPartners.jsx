import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link } from "react-router-dom";

import Topbar from "../../Components/Topbar/Topbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

const EditPartners = () => {
  const [partner, setPartner] = useState({ id: "", name: "", percentage: "" });
  const [error, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.partner) {
      setPartner(location.state.partner);
    } else {
      navigate("/partners");
    }
  }, [location, navigate]);

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

    // Percentage validation
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const partners = JSON.parse(localStorage.getItem("partnersData")) || [];
    const updatedPartners = partners.map((p) =>
      p.id === partner.id ? partner : p
    );
    localStorage.setItem("partnersData", JSON.stringify(updatedPartners));
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/partners");
    }, 2000);
  };

  const preventFormSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
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
                  <form onSubmit={handleSubmit} onKeyDown={preventFormSubmit}>
                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            error.name ? "is-invalid" : ""
                          }`}
                          placeholder="Partner Name"
                          name="name"
                          value={partner.name}
                          onChange={handleInputChange}
                        />
                        {error.name && (
                          <div className="invalid-feedback">{error.name}</div>
                        )}
                      </div>
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
