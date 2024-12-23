// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
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
  const [unit, setUnit] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectproject || selectproject === " ") {
      toast.error("Please select a project!");
      return;
    }

    if (
      !name1 ||
      !percentage1 ||
      !name2 ||
      !percentage2 ||
      !name3 ||
      !percentage3
    ) {
      toast.error("All Fields Must Be Filled!");
      return;
    }

    if (
      !/^[A-Za-z ]+$/.test(name1) ||
      !/^[A-Za-z ]+$/.test(name2) ||
      !/^[A-Za-z ]+$/.test(name3)
    ) {
      toast.error("Names can only contain letters and spaces");
      return;
    }

    if (isNaN(percentage1) || isNaN(percentage2) || isNaN(percentage3)) {
      toast.error("Percentage must be a valid number!");
      return;
    }

    if (
      parseFloat(percentage1) < 0 ||
      parseFloat(percentage1) > 100 ||
      parseFloat(percentage2) < 0 ||
      parseFloat(percentage2) > 100 ||
      parseFloat(percentage3) < 0 ||
      parseFloat(percentage3) > 100
    ) {
      toast.error("Percentage must be between 0 and 100!");
      return;
    }

    toast.success("Successfully added partners!");
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
      <ToastContainer />
      <Helmet>
        <title>React Estate | Add Partners</title>
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
                      <h6 className="mb-4">Add Partners</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/partners" className="">
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
                          className="form-select form-select-sm mb-4 w-50"
                          aria-label=".form-select-sm example"
                          value={selectproject}
                          onChange={(e) => setselectproject(e.target.value)}
                        >
                          <option selected>Select Project</option>
                          <option value="demo">Demo</option>
                        </select>
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
                          className="form-control"
                          id="name2"
                          placeholder="Name"
                          value={name2}
                          onChange={(e) => setName2(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="percentage2"
                          placeholder="Percentage"
                          value={percentage2}
                          onChange={(e) => setPercentage2(e.target.value)}
                        />
                        <i className="bi bi-plus-circle-fill"></i>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
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
