// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const EditUnit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
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
                        <input type="text" className="form-control" id="wing" placeholder="Wing" name="wing" />
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="flat name" placeholder="Flat Name" name="flat name" />
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input type="text" className="form-control" id="Size" placeholder="Size" name="Size" />
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="Extra Work Amount" placeholder="Extra Work Amount" name="Extra Work Amount" />
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <input type="text" className="form-control" id="Unit Type" placeholder="Unit Type" name="Unit Type" />
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="Sale Deed Amount" placeholder="Sale Deed Amount" name="Sale Deed Amount" />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default EditUnit;
