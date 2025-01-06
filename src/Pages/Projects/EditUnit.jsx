import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import { Spinner } from "react-bootstrap"; 
import "react-toastify/dist/ReactToastify.css";

const EditUnit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unitData, index } = location.state || {};

  const [wing, setWing] = useState(unitData?.wing || "");
  const [flatName, setFlatName] = useState(unitData?.flatName || "");
  const [size, setSize] = useState(unitData?.size || "");
  const [extraWork, setExtraWork] = useState(unitData?.extraWork || "");
  const [unitType, setUnitType] = useState(unitData?.unitType || "");
  const [salesDeed, setSalesDeed] = useState(unitData?.salesDeed || "");

  const [wingError, setWingError] = useState("");
  const [flatNameError, setFlatNameError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [extraWorkError, setExtraWorkError] = useState("");
  const [unitTypeError, setUnitTypeError] = useState("");
  const [salesDeedError, setSalesDeedError] = useState("");

  const [loading, setLoading] = useState(false); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const handleSave = () => {
    let isValid = true;

    setWingError("");
    setFlatNameError("");
    setSizeError("");
    setExtraWorkError("");
    setUnitTypeError("");
    setSalesDeedError("");

    if (!wing) {
      setWingError("Wing is required.");
      isValid = false;
    }
    if (!flatName) {
      setFlatNameError("Flat Name is required.");
      isValid = false;
    }
    if (!size) {
      setSizeError("Size is required.");
      isValid = false;
    }
    if (!extraWork) {
      setExtraWorkError("Extra Work Amount is required.");
      isValid = false;
    }
    if (!unitType) {
      setUnitTypeError("Unit Type is required.");
      isValid = false;
    }
    if (!salesDeed) {
      setSalesDeedError("Sale Deed Amount is required.");
      isValid = false;
    }

    if (isValid) {
      setLoading(true); 
      setTimeout(() => {
        const updatedUnit = { wing, flatName, size, extraWork, unitType, salesDeed };
        navigate("/unit", { state: { updatedUnit, index } });
        setLoading(false); 
      }, 2000); 
    }
  };

  return (
    <>
      <Helmet>
        <title>Real Estate | Edit Unit</title>
      </Helmet>
      <ToastContainer />
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
                      <h6 className="mb-4">Edit Unit</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/unit" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <form>
                    <div className="row pt-3">
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${wingError ? "is-invalid" : ""}`}
                          id="wing"
                          placeholder="Wing"
                          name="wing"
                          value={wing}
                          onChange={(e) => setWing(e.target.value)}
                        />
                        {wingError && <div className="invalid-feedback">{wingError}</div>}
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${flatNameError ? "is-invalid" : ""}`}
                          id="flat name"
                          placeholder="Flat Name"
                          name="flat name"
                          value={flatName}
                          onChange={(e) => setFlatName(e.target.value)}
                        />
                        {flatNameError && <div className="invalid-feedback">{flatNameError}</div>}
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${sizeError ? "is-invalid" : ""}`}
                          id="Size"
                          placeholder="Size"
                          name="Size"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        />
                        {sizeError && <div className="invalid-feedback">{sizeError}</div>}
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${extraWorkError ? "is-invalid" : ""}`}
                          id="Extra Work Amount"
                          placeholder="Extra Work Amount"
                          name="Extra Work Amount"
                          value={extraWork}
                          onChange={(e) => setExtraWork(e.target.value)}
                        />
                        {extraWorkError && <div className="invalid-feedback">{extraWorkError}</div>}
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${unitTypeError ? "is-invalid" : ""}`}
                          id="Unit Type"
                          placeholder="Unit Type"
                          name="Unit Type"
                          value={unitType}
                          onChange={(e) => setUnitType(e.target.value)}
                        />
                        {unitTypeError && <div className="invalid-feedback">{unitTypeError}</div>}
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${salesDeedError ? "is-invalid" : ""}`}
                          id="Sale Deed Amount"
                          placeholder="Sale Deed Amount"
                          name="Sale Deed Amount"
                          value={salesDeed}
                          onChange={(e) => setSalesDeed(e.target.value)}
                        />
                        {salesDeedError && <div className="invalid-feedback">{salesDeedError}</div>}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" /> 
                      ) : (
                        "Save"
                      )}
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

export default EditUnit;
