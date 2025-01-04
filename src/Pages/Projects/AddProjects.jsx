import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidDownload } from "react-icons/bi";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { demoDownload } from "../../Api/ApiDipak"; 
import axios from "axios";

const AddProjects = () => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  const nameRef = useRef(null);
  const files = useRef(null);
  const submitRef = useRef(null);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const handleDownloadExcel = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Please login.");
        return;
      }

      const response = await axios.get(demoDownload, {
        responseType: "blob", 
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      const link = document.createElement("a");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      link.href = url;
      link.setAttribute("download", "template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
      toast.error("Failed to download Excel file");
    }
  };

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
    let isValid = true;
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required";
      isValid = false;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
      validationErrors.name = "Name can only contain letters and spaces";
      isValid = false;
    }

    if (!unit || unit.length === 0) {
      validationErrors.unit = "Unit is required";
      isValid = false;
    } else {
      const file = unit[0];

      if (file.size > 2 * 1024 * 1024) {
        validationErrors.unit = "File is larger than 2MB";
        isValid = false;
      }

      if (
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        validationErrors.unit = "Only Excel files (.xls, .xlsx) are allowed";
        isValid = false;
      }
    }

    if (!isValid) {
      setError(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setName("");
      files.current.value = null;
      setError({});
      navigate("/projects");
      toast.success("Project added successfully!");
    }, 2000);
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

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className=" col mb-3">
                        <label htmlFor="name" className="form-label">
                          Name :{" "}
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            error.name ? "is-invalid" : ""
                          }`}
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onKeyPress={(e) => handleEnter(e, files)}
                          ref={nameRef}
                        />
                        {error.name && (
                          <div className="invalid-feedback">{error.name}</div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="unit" className="form-label">
                            Upload Unit:
                          </label>
                          <input
                            type="file"
                            accept=".xls, .xlsx"
                            className={`form-control ${
                              error.unit ? "is-invalid" : ""
                            }`}
                            id="unit"
                            ref={files}
                            onChange={(e) => setUnit(e.target.files)}
                            onKeyPress={(e) => handleEnter(e, submitRef)}
                          />
                          {error.unit && (
                            <div className="invalid-feedback">{error.unit}</div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="file" className="form-label">
                            Template:
                          </label>

                          <div className="row">
                            <div
                              className="col-2"
                              style={{ textAlign: "center" }}
                            >
                              <BiSolidDownload
                                style={{ fontSize: "30px" }}
                                onClick={handleDownloadExcel}
                                className="BiSolidDownload"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      ref={submitRef}
                      disabled={loading}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Submit"
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

export default AddProjects;
