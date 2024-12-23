import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

function AddPartners() {
  const [selectproject, setselectproject] = useState("");
  const [name1, setName1] = useState("");
  const [percentage1, setPercentage1] = useState("");
  const [name2, setName2] = useState("");
  const [percentage2, setPercentage2] = useState("");
  const [name3, setName3] = useState("");
  const [percentage3, setPercentage3] = useState("");
  const [error, setErrors] = useState({});

  const selectprojectRef = useRef(null);
  const name1Ref = useRef(null);
  const percentage1Ref = useRef(null);
  const name2Ref = useRef(null);
  const percentage2Ref = useRef(null);
  const name3Ref = useRef(null);
  const percentage3Ref = useRef(null);
  const submitRef = useRef(null);

  // focus
  useEffect(() => {
    selectprojectRef.current.focus();
  }, []);

  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = {};
    setErrors({});

    if (!selectproject) {
      validationError.selectproject = "Please select a project.";
    }

    if (!name1) {
      validationError.name1 = "Please enter Name";
    }
    if (!name2) {
      validationError.name2 = "Please enter Name";
    }
    if (!name3) {
      validationError.name3 = "Please enter Name";
    }

    if (!/^[A-Za-z ]+$/.test(name1)) {
      validationError.name1 = "Name can only contain letters and spaces";
    }
    if (!/^[A-Za-z ]+$/.test(name2)) {
      validationError.name2 = "Name can only contain letters and spaces";
    }
    if (!/^[A-Za-z ]+$/.test(name3)) {
      validationError.name3 = "Name can only contain letters and spaces";
    }

    if (!percentage1) {
      validationError.percentage1 = "Please enter Percentage";
    }
    if (!percentage2) {
      validationError.percentage2 = "Please enter Percentage";
    }
    if (!percentage3) {
      validationError.percentage3 = "Please enter Percentage";
    }

    if (isNaN(percentage1)) {
      validationError.percentage1 = "Percentage must be a valid number!";
    }
    if (isNaN(percentage2)) {
      validationError.percentage2 = "Percentage must be a valid number!";
    }
    if (isNaN(percentage3)) {
      validationError.percentage3 = "Percentage must be a valid number!";
    }

    if (parseFloat(percentage1) < 0 || parseFloat(percentage1) > 100) {
      validationError.percentage1 = "Percentage must be between 0 and 100!";
    }
    if (parseFloat(percentage2) < 0 || parseFloat(percentage2) > 100) {
      validationError.percentage2 = "Percentage must be between 0 and 100!";
    }
    if (parseFloat(percentage3) < 0 || parseFloat(percentage3) > 100) {
      validationError.percentage3 = "Percentage must be between 0 and 100!";
    }

    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
      return;
    }

    setselectproject("");
    setName1("");
    setPercentage1("");
    setName2("");
    setPercentage2("");
    setName3("");
    setPercentage3("");

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
                    <div className="p-2 ">
                      <h6 className="mb-4">Add Partners</h6>
                    </div>
                    <div className="p-2 ">
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
                          className="form-select form-select-sm mb-1 w-50"
                          value={selectproject}
                          onChange={(e) => setselectproject(e.target.value)}
                          ref={selectprojectRef}
                          onKeyPress={(e) => handleEnter(e, name1Ref)}
                        >
                          <option value="">Select Project</option>
                          <option value="demo">Demo</option>
                        </select>
                        {error.selectproject && (
                          <p style={{ color: "red", fontSize: "0.9rem" }} className="ms-3">
                            {error.selectproject}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="name2"
                          placeholder="Name"
                          value={name2}
                          onChange={(e) => setName1(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="percentage1"
                          placeholder="Percentage"
                          value={percentage1}
                          onChange={(e) => setPercentage1(e.target.value)}
                        />
                        <i className="bi bi-x-circle-fill"></i>
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control mb-1"
                          placeholder="Name"
                          value={name1}
                          onChange={(e) => setName1(e.target.value)}
                          ref={name1Ref}
                          onKeyPress={(e) => handleEnter(e, percentage1Ref)}
                        />
                        {error.name1 && (
                          <p style={{ color: "red", fontSize: "0.9rem" }} className="ms-3">
                            {error.name1}
                          </p>
                        )}
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control mb-1"
                          placeholder="Percentage"
                          value={percentage1}
                          onChange={(e) => setPercentage1(e.target.value)}
                          ref={percentage1Ref}
                          onKeyPress={(e) => handleEnter(e, name2Ref)}
                        />
                        {error.percentage1 && (
                          <p style={{ color: "red", fontSize: "0.9rem" }} className="ms-3">
                            {error.percentage1}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row pt-4">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control mb-1"
                          placeholder="Name"
                          value={name2}
                          onChange={(e) => setName2(e.target.value)}
                          ref={name2Ref}
                          onKeyPress={(e) => handleEnter(e, percentage2Ref)}
                        />
                        {error.name2 && (
                          <p style={{ color: "red", fontSize: "0.9rem" }} className="ms-3">
                            {error.name2}
                          </p>
                        )}
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control mb-1"
                          placeholder="Percentage"
                          value={percentage2}
                          onChange={(e) => setPercentage2(e.target.value)}
                          ref={percentage2Ref}
                          onKeyPress={(e) => handleEnter(e, name3Ref)}
                        />
                        <i className="bi bi-plus-circle-fill"></i>
                      </div>
                    </div>

                    <div className="row pt-4">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control mb-1"
                          placeholder="Name"
                          value={name3}
                          onChange={(e) => setName3(e.target.value)}
                          ref={name3Ref}
                          onKeyPress={(e) => handleEnter(e, percentage3Ref)}
                        />
                        {error.name3 && (
                          <p style={{ color: "red", fontSize: "0.9rem" }} className="ms-3">
                            {error.name3}
                          </p>
                        )}
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control mb-1"
                          placeholder="Percentage"
                          value={percentage3}
                          onChange={(e) => setPercentage3(e.target.value)}
                          ref={percentage3Ref}
                          onKeyPress={(e) => handleEnter(e, submitRef)}
                        />
                        {error.percentage3 && (
                          <p style={{ color: "red", fontSize: "0.9rem" }} className="ms-3">
                            {error.percentage3}
                          </p>
                        )}
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3" ref={submitRef}>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <style jsx="true">{`
        .bi-plus-circle-fill {
            position: absolute;
            right: 27px;
            transform: translateY(-135%);
            color: black;
            cursor: pointer;
          }
        .bi-x-circle-fill{
            position: absolute;
            right: 27px;
            transform: translateY(-135%);
            color: #eb3423;
            cursor: pointer;
          }
    `}</style >
    </>
  );
}

export default AddPartners;
