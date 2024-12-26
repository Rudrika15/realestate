import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

function EditRole() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [rolename, setRolename] = useState("");
  const [rolenameerror, setRolenameError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const rolenameRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!rolename) {
      setRolenameError(true);
      isValid = false;
    } else {
      setRolenameError(false);
    }
    if (isValid) {
      setLoading(true);
      toast.success("User Updated Successfully!");
      setTimeout(() => {
        setLoading(false);
        navigate("/role");
      }, 1000);
    }
  };
  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField?.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleRolenameChange = (e) => {
    setRolename(e.target.value);
    if (e.target.value) setRolenameError(false);
  };
  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Edit Role</title>
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
                      <h6 className="mb-4">Edit Role</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/role" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <form>
                    <div className="row mb-3 w-50">
                      <div className="col">
                        <input
                          type="email"
                          className={`form-control ${
                            rolenameerror ? "is-invalid" : ""
                          }`}
                          value={rolename}
                          ref={rolenameRef}
                          id="email"
                          placeholder="Rolename"
                          name="email"
                          onKeyDown={(e) => handleEnter(e, null)}
                          onChange={handleRolenameChange}
                        />
                        {rolenameerror && (
                          <div className="invalid-feedback">
                            rolename is required.
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      to=""
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
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
}

export default EditRole;
