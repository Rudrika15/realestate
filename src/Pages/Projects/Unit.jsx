import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { projectWiseUnit } from "../../Api/ApiDipak";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const Unit = () => {
  const [units, setUnits] = useState([
    {
      wing: "",
      unitNo: "",
      size: "",
      extraWorkAmount: "",
      unitType: "",
      saleDeedAmount: "",
    },
  ]);
  const [loading, setLoading] = useState(true);

  const [unitErrors, setUnitErrors] = useState({
    wingError: false,
    unitNoError: false,
    sizeError: false,
    extraWorkAmountError: false,
    unitTypeError: false,
    saleDeedAmountError: false,
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
  const id = useParams()
  // alert(id)
 const projecId = id.id
//  alert(id.id) 
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token not found! Please log in.");
      navigate("/");
    } else {
      const fetchProjects = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${projectWiseUnit}/${id.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          
          if (response.data.status === true && response.data.data) {
            // toast.success(response.data.message);
            setUnits(response.data.data);
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            toast.error("Session expired! Please log in again.");
            navigate("/");
          } else {
            console.error("Error fetching data:", error);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }
  }, [navigate]);

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
        unitNo: "",
        size: "",
        extraWorkAmount: "",
        unitType: "",
        saleDeedAmount: "",
      },
    ]);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      wingError: false,
      unitNoError: false,
      sizeError: false,
      extraWorkAmountError: false,
      unitTypeError: false,
      saleDeedAmountError: false,
    };

    units.forEach((unit) => {
      if (!unit.wing || !unit.wing.trim()) {
        errors.wingError = true;
        isValid = false;
      }
      if (!unit.unitNo || !unit.unitNo.trim()) {
        errors.unitNoError = true;
        isValid = false;
      }
      if (!unit.size || !unit.size.trim()) {
        errors.sizeError = true;
        isValid = false;
      }
      if (!unit.extraWorkAmount || !unit.extraWorkAmount.trim()) {
        errors.extraWorkAmountError = true;
        isValid = false;
      }
      if (!unit.unitType || !unit.unitType.trim()) {
        errors.unitTypeError = true;
        isValid = false;
      }
      if (!unit.saleDeedAmount || !unit.saleDeedAmount.trim()) {
        errors.saleDeedAmountError = true;
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

  const handleEditUnit = () => {
    navigate("/edit-unit");
  };

  return (
    <>
      <ToastContainer />

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
                    <div className="p-2">
                      <h6 className="mb-4">Units</h6>
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
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col">Project Id</th>
                            <th scope="col">Wing</th>
                            <th scope="col">Unit No</th>
                            <th scope="col">Size</th>
                            <th scope="col">Extra Work Amount</th>
                            <th scope="col">Unit Type</th>
                            <th scope="col">Sales Deed Amount</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {units.map((unit, index) => (
                            <tr key={index}>
                              <td>{unit.projectId}</td>
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
                                  name="unitNo"
                                  className={`form-control ${
                                    unitErrors.unitNoError ? "is-invalid" : ""
                                  }`}
                                  value={unit.unitNo}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                {unitErrors.unitNoError && (
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
                                  name="extraWorkAmount"
                                  className={`form-control ${
                                    unitErrors.extraWorkAmountError
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={unit.extraWorkAmount}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                {unitErrors.extraWorkAmountError && (
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
                                  name="saleDeedAmount"
                                  className={`form-control ${
                                    unitErrors.saleDeedAmountError
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={unit.saleDeedAmount}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                                {unitErrors.saleDeedAmountError && (
                                  <div className="invalid-feedback">
                                    Enter Sales Deed Amount
                                  </div>
                                )}
                              </td>
                              <td className="d-flex gap-2 action-buttons">
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
