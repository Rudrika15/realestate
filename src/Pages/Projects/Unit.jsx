import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

const Unit = () => {
  const [units, setUnits] = useState([
    {
      wing: "",
      flatName: "",
      size: "",
      extraWork: "",
      unitType: "",
      salesDeed: "",
    },
  ]);

  const [unitErrors, setUnitErrors] = useState({
    wingError: false,
    flatNameError: false,
    sizeError: false,
    extraWorkError: false,
    unitTypeError: false,
    salesDeedError: false,
  });

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedUnits = [...units];
    updatedUnits[index] = { ...updatedUnits[index], [name]: value };
    setUnits(updatedUnits);
  };

  const handleAddUnit = () => {
    setUnits([
      ...units,
      {
        wing: "",
        flatName: "",
        size: "",
        extraWork: "",
        unitType: "",
        salesDeed: "",
      },
    ]);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      wingError: false,
      flatNameError: false,
      sizeError: false,
      extraWorkError: false,
      unitTypeError: false,
      salesDeedError: false,
    };

    units.forEach((unit, index) => {
      if (!unit.wing.trim()) {
        errors.wingError = true;
        isValid = false;
      }
      if (!unit.flatName.trim()) {
        errors.flatNameError = true;
        isValid = false;
      }
      if (!unit.size.trim()) {
        errors.sizeError = true;
        isValid = false;
      }
      if (!unit.extraWork.trim()) {
        errors.extraWorkError = true;
        isValid = false;
      }
      if (!unit.unitType.trim()) {
        errors.unitTypeError = true;
        isValid = false;
      }
      if (!unit.salesDeed.trim()) {
        errors.salesDeedError = true;
        isValid = false;
      }
    });

    setUnitErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    navigate("/projects");
  };

  const handleEditUnit = (index) => {
    navigate("/edit-unit", { state: { unitData: units[index], index: index } });
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Units</title>
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
                      <h6 className="mb-4">Units</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/projects" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col">Wing</th>
                            <th scope="col">Flat Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Extra Work Amount</th>
                            <th scope="col">Unit Type</th>
                            <th scope="col">Sales Deed Amount</th>
                            <th scope="col" >Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {units.map((unit, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="text"
                                  name="wing"
                                  className={`form-control ${
                                    unitErrors.wingError ? "is-invalid" : ""
                                  }`}
                                  value={unit.wing}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                {unitErrors.wingError && (
                                  <div className="invalid-feedback">
                                    Enter a Wing
                                  </div>
                                )}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="flatName"
                                  className={`form-control ${
                                    unitErrors.flatNameError ? "is-invalid" : ""
                                  }`}
                                  value={unit.flatName}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                {unitErrors.flatNameError && (
                                  <div className="invalid-feedback">
                                    Enter a Flat Name
                                  </div>
                                )}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="size"
                                  className={`form-control ${
                                    unitErrors.sizeError ? "is-invalid" : ""
                                  }`}
                                  value={unit.size}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                {unitErrors.sizeError && (
                                  <div className="invalid-feedback">
                                    Enter the Size
                                  </div>
                                )}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="extraWork"
                                  className={`form-control ${
                                    unitErrors.extraWorkError
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={unit.extraWork}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                {unitErrors.extraWorkError && (
                                  <div className="invalid-feedback">
                                    Enter Extra Work Amount
                                  </div>
                                )}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="unitType"
                                  className={`form-control ${
                                    unitErrors.unitTypeError ? "is-invalid" : ""
                                  }`}
                                  value={unit.unitType}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                {unitErrors.unitTypeError && (
                                  <div className="invalid-feedback">
                                    Enter Unit Type
                                  </div>
                                )}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="salesDeed"
                                  className={`form-control ${
                                    unitErrors.salesDeedError
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={unit.salesDeed}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                {unitErrors.salesDeedError && (
                                  <div className="invalid-feedback">
                                    Enter Sales Deed Amount
                                  </div>
                                )}
                              </td>
                              <td className="d-flex gap-2  action-buttons"  >
                                <button
                                  onClick={() => handleEditUnit(index)}
                                  className="btn btn-warning btn-sm me-2"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <i
                                  className="bi bi-plus-circle-fill"
                                  onClick={handleAddUnit}
                                ></i>
                                <i
                                  className="bi bi-x-circle-fill"
                                  // onClick={() => removeExpense(index)}
                                ></i>
                              </td>
                              
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unit;
