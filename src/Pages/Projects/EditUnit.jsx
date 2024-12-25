// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const EditUnit = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { unitData, index } = location.state || {};

  const [wing, setWing] = useState(unitData?.wing || '');
  const [flatName, setFlatName] = useState(unitData?.flatName || '');
  const [size, setSize] = useState(unitData?.size || '');
  const [extraWork, setExtraWork] = useState(unitData?.extraWork || '');
  const [unitType, setUnitType] = useState(unitData?.unitType || '');
  const [salesDeed, setSalesDeed] = useState(unitData?.salesDeed || '');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const handleSave = () => {
    // Update the unit data in the parent component (Unit.js)
    const updatedUnit = { wing, flatName, size, extraWork, unitType, salesDeed };
    // Go back to the Unit page and pass updated data to the parent
    navigate("/unit", { state: { updatedUnit, index } });
  };

  return (
    <>
      <Helmet>
        <title>Real Estate | Edit Unit</title>
      </Helmet>
      <ToastContainer />
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between   mb-3">
                    <div className="p-2 ">
                      <h6 className="mb-4">Edit Unit</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/unit" className="">
                        <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
                      </Link>
                    </div>
                  </div>
                  {/* <div className="d-flex justify-content-between mb-3">
                                            <div className="p-3 w-30">
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text bg-white">
                                                        <i class="bi bi-search"></i>
                                                    </span>
                                                    <input type="text" class="form-control border-start-0" placeholder="Search" aria-label="Search" />
                                                </div>
                                            </div>
                                        </div> */}
                  <form>
                    <div className="row pt-3">
                      <div className="col">
                        <input type="text" className="form-control" id="wing" placeholder="Wing" name="wing" value={wing}
                          onChange={(e) => setWing(e.target.value)}/>
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="flat name" placeholder="Flat Name" name="flat name" value={flatName}
                          onChange={(e) => setFlatName(e.target.value)} />
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input type="text" className="form-control" id="Size" placeholder="Size" name="Size" value={size}
                          onChange={(e) => setSize(e.target.value)}/>
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="Extra Work Amount" placeholder="Extra Work Amount" name="Extra Work Amount" value={extraWork}
                          onChange={(e) => setExtraWork(e.target.value)} />
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input type="text" className="form-control" id="Unit Type" placeholder="Unit Type" name="Unit Type" value={unitType}
                          onChange={(e) => setUnitType(e.target.value)}/>
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="Sale Deed Amount" placeholder="Sale Deed Amount" name="Sale Deed Amount" value={salesDeed}
                          onChange={(e) => setSalesDeed(e.target.value)} />
                      </div>
                    </div>
                    <button type="button" className="btn btn-primary mt-3" onClick={handleSave}>Save</button>
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
