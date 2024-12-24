// src/Pages/Add/Add.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

const AddProjects = () => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const nameRef = useRef(null);
  const files = useRef(null);
  const submitRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  // focus
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleKey = useCallback((event) => {
    if (event.key === "F4") {
      console.log(`form submit`);
      handleSubmit(event);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error("Name can only contain letters and spaces");
      return;
    }
    if (name.length < 4) {
      toast.error("Minimum 4 Characters ");
      return;
    }

    if (!unit) {
      toast.error("Unit is Required");
      return;
    }

    const file = unit[0]; // Get the first file

  if (file.size > 2 * 1024 * 1024) {
    toast.error("Image Is Larger Than 2MB");
    return;
  }

  // Check for valid image MIME types
  if (file.type === "image/jpeg" || file.type === "image/png") {
    toast.success("successfully");
  } else {
    toast.error("File Does Not Support. You Must Use .png or .jpg ");
    return;
  }
    setName("");
    files.current.value = null;
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Add Projects</title>
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
                      <h6 className="mb-4">Add Projects</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/projects" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
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
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name :{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={(e) => handleEnter(e, files)}
                        ref={nameRef}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="file" className="form-label">
                        Upload Unit:
                      </label>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf, .docx" 
                        className="form-control"
                        multiple
                        id="unit"
                        aria-describedby="unit"
                        onKeyPress={(e) => handleEnter(e, submitRef)}
                        ref={files}
                        onChange={(e) => setUnit(e.target.files)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      ref={submitRef}
                    >
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

export default AddProjects;
