// src/Pages/Add/Add.js
import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import Footer from '../../Components/Footer/Footer';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Unit = () => {
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
        <title>React Estate | Units</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div class="d-flex justify-content-between   mb-3">
                    <div class="p-2 ">
                      <h6 className="mb-4">Units</h6>
                    </div>
                    <div class="p-2 ">
                      <Link to="/projects" className="">
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
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Wing</th>
                        <th scope="col">Flat Name</th>
                        <th scope="col">Size</th>
                        <th scope="col">Extra Work Amount</th>
                        <th scope="col">Unit Type</th>
                        <th scope="col">Sale Deed Amount</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <Link to="/edit-unit" className="btn btn-warning btn-sm me-2">
                            <i className="fas fa-edit"></i>
                          </Link >
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <Link to="/EditUnit" className="btn btn-warning btn-sm me-2">
                            <i className="fas fa-edit"></i>
                          </Link >
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <Link to="/EditUnit" className="btn btn-warning btn-sm me-2">
                            <i className="fas fa-edit"></i>
                          </Link >
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default Unit;
