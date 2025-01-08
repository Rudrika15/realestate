import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom';

function AddProjectStage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [percentage, setPercentage] = useState("");
  const [wing, setWing] = useState("");
  const [stageDate, setStageDate] = useState("");
  const [titleError, setTitleError] = useState("");
  const [percentageError, setPercentageError] = useState("");
  const [wingError, setWingError] = useState("");
  const [stageDateError, setStageDateError] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      const day = ("0" + d.getDate()).slice(-2);
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return "";
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Add Project Stage</title>
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
                      <h6 className="mb-4">Project Stage</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/project-stage" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col">
                        <select
                          className={`form-control bg-white`}
                        // value={unit}
                        // ref={unitRef}
                        // onChange={handleUnitChange}
                        // onKeyDown={(e) => handleEnter(e, dateRef)}
                        >
                          <option value="" disabled>Title</option>
                          <option value="demo">Foundation</option>
                          <option value="demo">RCC</option>
                        </select>
                        {/* {unitError && (
                          <div className="invalid-feedback">Please select a Unit</div>
                        )} */}
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          className={`form-control`}
                          id="percentage"
                          placeholder="Percentage"
                          name="percentage"
                        // value={extra}
                        // onChange={handleExtraChange}
                        // onKeyDown={(e) => handleEnter(e, workRef)}
                        // ref={extraRef}
                        />
                        {/* {extraError && (
                          <div className="invalid-feedback">Enter an Extra Work Amount</div>
                        )} */}
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <select
                          className={`form-control bg-white`}
                        // value={unit}
                        // ref={unitRef}
                        // onChange={handleUnitChange}
                        // onKeyDown={(e) => handleEnter(e, dateRef)}
                        >
                          <option value="" disabled>Wing</option>
                          <option value="demo">All Wings</option>
                          <option value="demo">A</option>
                          <option value="demo">B</option>
                        </select>
                        {/* {unitError && (
                          <div className="invalid-feedback">Please select a Unit</div>
                        )} */}
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          id="date"
                          // ref={dateRef}
                          className={`form-control`}
                          value={formatDate(stageDate)}
                          // onChange={(e) => handleBookingDateChange(e)}
                          // onKeyDown={(e) => handleEnter(e, customerNameRef)}
                          placeholder="Stage Date"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                        <i
                          className="bi bi-plus-circle-fill icon-2"
                        ></i>
                        {/* {bookingError && (
                          <div className="invalid-feedback">Please select a booking Date</div>
                        )} */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProjectStage
