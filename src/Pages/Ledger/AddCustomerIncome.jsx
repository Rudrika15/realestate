// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const AddCustomerIncome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [check, setCheck] = useState(null);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const files = useRef(null);


  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Add Customer Income</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="p-2 ">
                      <h6 className="mb-4">Add Customer Income</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/customer-income" className="">
                        <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
                      </Link>
                    </div>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col">
                        <input type="text" className="form-control" id="Customer Name" placeholder="Customer Name" name="Customer Name" />
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="Unit No" placeholder="Unit No" name="Unit No" />
                      </div>
                    </div>
                    <div className="row w-75">
                      <div className="col pt-3">
                          <textarea className="form-control" placeholder="Address" id="floatingTextarea"></textarea>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <input type="text" className="form-control" id="Sale Deed Price" placeholder="Sale Deed Price" name="Sale Deed Price" />
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" id="Status" placeholder="Status" name="Status" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col pt-3">
                        <div className="input-wrapper position-relative">
                          <input
                            type="date"
                            id="date"
                            className="form-control"
                            placeholder="dd-mm-yyyy"
                            onFocus={(e) => e.target.showPicker()}
                          />
                          <label
                            htmlFor="date"
                            className="placeholder-label"
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "13px",
                              transform: "translateY(-50%)",
                              pointerEvents: "none",
                            }}
                          >
                            Income Date
                          </label>
                        </div>
                      </div>
                      <div className="col pt-3">
                        <input
                          type="date"
                          id="date"
                          className="form-control"
                          placeholder="dd-mm-yyyy"
                          onFocus={(e) => e.target.showPicker()}
                        />
                        <label
                          htmlFor="date"
                          className="placeholder-label"
                          style={{
                            position: "absolute",
                            paddingLeft: '0.8rem',
                            transform: "translateY(-140%)",
                            pointerEvents: "none",
                          }}
                        >
                          Deposit Date
                        </label>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <input type="text" className="form-control" id="Amount" placeholder="Amount" name="Amount" />
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row pt-3">
                      <p>Payment Mode</p>
                      <div className="form-check" style={{ marginLeft: '1rem' }}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Cash
                        </label>
                      </div>
                      <div className="form-check pt-2" style={{ marginLeft: '1rem' }}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Cheque
                        </label>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <input type="text" className="form-control" id="Check No" placeholder="Check No" name="Check No" />
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <select className="form-select mb-3 w-50" aria-label="Default select example">
                          <option selected>Bank</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="file" className="form-label">Upload Check : </label>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf, .docx"
                        className="form-control"
                        multiple
                        id="check"
                        aria-describedby="check"
                        ref={files}
                        onChange={(e) => setCheck(e.target.files)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <style jsx="true">{`
                    .input-wrapper {
  position: absolute;
}

.input-wrapper input[type="date"] {
  padding-left: 1.5rem; /* Adds space for the label */
  padding-right: 1rem;  /* Adds space for the calendar icon */
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  background-color: #fff;
  width: 100%;
  height: 2.5rem;
}

   .placeholder-label {
  font-size: 1rem;
  color: #6c757d;
}


.input-wrapper input[type="date"]:focus {
  outline: none;
}


}
    }
                    `}</style >
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div >
      </div >
    </>
  );
};

export default AddCustomerIncome;
