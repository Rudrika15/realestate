import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
// import Footer from "../../Components/Footer/Footer";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

function AddPartners() {
  const [selectproject, setselectproject] = useState("");
  const [partners, setPartners] = useState([{ name: "", percentage: "" }]);
  const [error, setErrors] = useState({});

  const selectprojectRef = useRef(null);
  const nameRef = useRef(null);
  const partnersRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    selectprojectRef.current.focus();
  }, []);

  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleAddPartner = () => {
    setPartners([...partners, { name: "", percentage: "" }]);
  };

  const handleRemovePartner = (index) => {
    const updatedPartners = [...partners];
    updatedPartners.splice(index, 1);
    setPartners(updatedPartners);
  };

  const handleInputChange = (index, e) => {
    const updatedPartners = [...partners];
    updatedPartners[index][e.target.name] = e.target.value;
    setPartners(updatedPartners);

    const updatedErrors = { ...error };
    delete updatedErrors[`${e.target.name}${index}`];
    setErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const validationError = {};

    if (!selectproject) {
      validationError.selectproject = "Please select a project.";
      isValid = false;
    }

    partners.forEach((partner, index) => {
      if (!partner.name) {
        validationError[`name${index}`] = `Please enter Name for partner ${
          index + 1
        }`;
        isValid = false;
      }

      if (!/^[A-Za-z ]+$/.test(partner.name)) {
        validationError[`name${index}`] = `Name for partner ${
          index + 1
        } can only contain letters and spaces`;
        isValid = false;
      }

      if (!partner.percentage) {
        validationError[
          `percentage${index}`
        ] = `Please enter Percentage for partner ${index + 1}`;
        isValid = false;
      }

      if (isNaN(partner.percentage)) {
        validationError[`percentage${index}`] = `Percentage for partner ${
          index + 1
        } must be a valid number!`;
        isValid = false;
      }

      if (
        parseFloat(partner.percentage) < 0 ||
        parseFloat(partner.percentage) > 100
      ) {
        validationError[`percentage${index}`] = `Percentage for partner ${
          index + 1
        } must be between 0 and 100!`;
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(validationError);
      return;
    }

    setselectproject("");
    setPartners([{ name: "", percentage: "" }]);
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Add Partners</title>
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
                          className={`form-select form-select-sm mb-1 w-50 ${
                            error.selectproject ? "is-invalid" : ""
                          }`}
                          value={selectproject}
                          onChange={(e) => setselectproject(e.target.value)}
                          ref={selectprojectRef}
                          onKeyPress={(e) => handleEnter(e, nameRef)}
                        >
                          <option value="">Select Project</option>
                          <option value="demo">Demo</option>
                        </select>
                        {error.selectproject && (
                          <div className="invalid-feedback">
                            {error.selectproject}
                          </div>
                        )}
                      </div>
                    </div>

                    {partners.map((partner, index) => (
                      <div className="row pt-4" key={index}>
                        <div className="col">
                          <div className="input-container">
                            <input
                              type="text"
                              className={`form-control mb-1 ${
                                error[`name${index}`] ? "is-invalid" : ""
                              }`}
                              placeholder="Name"
                              value={partner.name}
                              onChange={(e) => handleInputChange(index, e)}
                              name="name"
                              ref={nameRef}
                              onKeyPress={(e) => handleEnter(e, partnersRef)}
                            />
                            {error[`name${index}`] && (
                              <div className="invalid-feedback">
                                {error[`name${index}`]}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col position-relative">
                          <div className="input-container">
                            <input
                              type="text"
                              className={`form-control mb-1 ${
                                error[`percentage${index}`] ? "is-invalid" : ""
                              }`}
                              placeholder="Percentage"
                              value={partner.percentage}
                              onChange={(e) => handleInputChange(index, e)}
                              name="percentage"
                              ref={partnersRef}
                              onKeyPress={(e) => handleEnter(e, submitRef)}
                            />
                            {error[`percentage${index}`] && (
                              <div className="invalid-feedback">
                                {error[`percentage${index}`]}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-1">
                          {index === 0 && (
                            <i
                              className="bi bi-plus-circle-fill"
                              onClick={handleAddPartner}
                            ></i>
                          )}
                          {partners.length > 1 && index !== 0 && (
                            <i
                              className="bi-x-circle-fill"
                              onClick={() => handleRemovePartner(index)}
                            ></i>
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      ref={submitRef}
                      // onKeyPress={(e) => handleEnter(e, selectprojectRef)}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer />   */}
        </div>
      </div>

      <style jsx="true">{`
        .bi-plus-circle-fill {
          cursor: pointer;
          color: black;
          display: inline-block;
          padding-top: 6px;
        }
        .bi-x-circle-fill {
          color: #eb3423;
          cursor: pointer;
          display: inline-block;
          padding-top: 6px;
        }
      `}</style>
    </>
  );
}

export default AddPartners;
