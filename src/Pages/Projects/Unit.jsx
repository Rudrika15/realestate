// src/Pages/Add/Add.js
import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

const Unit = () => {

   // Initial state for rows of units
   const [units, setUnits] = useState([
    {
      wing: '',
      flatName: '',
      size: '',
      extraWork: '',
      unitType: '',
      salesDeed: '',
    }
  ]);

  const navigate = useNavigate(); // For navigation

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };


    // Handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const updatedUnits = [...units];
      updatedUnits[index] = { ...updatedUnits[index], [name]: value };
      setUnits(updatedUnits);
    };

    // Handle add unit click
    const handleAddUnit = () => {
      setUnits([
        ...units,
        {
          wing: '',
          flatName: '',
          size: '',
          extraWork: '',
          unitType: '',
          salesDeed: '',
        }
      ]);
    };

    const handleEditUnit = (index) => {
      // Passing selected unit data to EditUnit page
      navigate('/edit-unit', { state: { unitData: units[index], index: index } });
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
                  <div className="d-flex justify-content-between   mb-3">
                    <div className="p-2 ">
                      <h6 className="mb-4">Units</h6>
                    </div>
                    <div className="p-2 ">
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
                        <th scope="col">Sales Deed Amount</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        {units.map((unit, index) => (
                        <tr key={index}>
                          <td><input type="text" name="wing" className="form-control" value={unit.wing} onChange={(e) => handleInputChange(e, index)} /></td>
                          <td><input type="text" name="flatName" className="form-control" value={unit.flatName} onChange={(e) => handleInputChange(e, index)} /></td>
                          <td><input type="text" name="size" className="form-control" value={unit.size} onChange={(e) => handleInputChange(e, index)} /></td>
                          <td><input type="text" name="extraWork" className="form-control" value={unit.extraWork} onChange={(e) => handleInputChange(e, index)} /></td>
                          <td><input type="text" name="unitType" className="form-control" value={unit.unitType} onChange={(e) => handleInputChange(e, index)} /></td>
                          <td><input type="text" name="salesDeed" className="form-control" value={unit.salesDeed} onChange={(e) => handleInputChange(e, index)} /></td>
                          <td>
                          <button onClick={() => handleEditUnit(index)} className="btn btn-warning btn-sm me-2">
                              <i className="fas fa-edit"></i>
                           </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                      <button type="submit" className="btn btn-primary mt-3" onClick={handleAddUnit}>Add Unit</button>
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
