import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { addUsers } from "../../Api/DevanshiApi";
import axios from "axios";
import { ViewRoleData } from "../../Api/Apikiran";
import Multiselect from "multiselect-react-dropdown";

function AddUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [authPasscode, setAuthPasscode] = useState("");
  const [role, setRole] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userNameError, setUserNameError] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);
  const [authPasscodeError, setAuthPasscodeError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passcodeRef = useRef(null);
  const authpasscodeRef = useRef(null);
  const roleRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(ViewRoleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status) {
        setRole(response.data.data);
      } else {
        toast.error("Failed to fetch role data!");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Error fetching roles!");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

    const handleAdd = async (e) => {
      e.preventDefault();
      let isValid = true;

      if (!userName.trim()) {
        setUserNameError(true);
        isValid = false;
      } else {
        setUserNameError(false);
      }

      if (!passcode.trim()) {
        setPasscodeError(true);
        isValid = false;
      } else {
        setPasscodeError(false);
      }

      if (!authPasscode.trim()) {
        setAuthPasscodeError(true);
        isValid = false;
      } else {
        setAuthPasscodeError(false);
      }

      if (selectedRoles.length === 0) {
        setRoleError(true);
        isValid = false;
      } else {
        setRoleError(false);
      }

      if (!isValid) return;
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          addUsers,
          {
            userName,
            passcode,
            authPasscode,
            roles: selectedRoles,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          toast.success("User added successfully!");
          setUserName("");
          setPasscode("");
          setAuthPasscode("");
          setSelectedRoles([]);
          setTimeout(() => {
            navigate("/view-user");
          }, 1000);
        } else {
          toast.error(response.data.message || "Failed to add user");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/");
        }
        toast.error("Failed to add user. Please try again.");
      } finally {
        setLoading(false);
      }
    };

  const handleInputChange = (setter, errorSetter) => (e) => {
    setter(e.target.value);
    if (e.target.value.trim() !== "") {
      errorSetter(false);
    }
  };

  const handleRoleChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedRoles(selectedOptions);
    setRoleError(selectedOptions.length === 0);
  };

  const handleEnter = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextField?.current) {
        nextField.current.focus();
      }
    }
  };

  const handleSelect = (selectedList) => {
    setSelectedRoles(selectedList);
  };

  const handleRemove = (selectedList) => {
    setSelectedRoles(selectedList);
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Add User</title>
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
                    <h6>Add User</h6>
                    <Link to="/view-user">
                      <h6>
                        <i className="bi bi-arrow-left-circle-fill"></i> Back
                      </h6>
                    </Link>
                  </div>
                  <form onSubmit={handleAdd}>
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${userNameError ? "is-invalid" : ""
                            }`}
                          placeholder="User Name"
                          value={userName}
                          ref={usernameRef}
                          onChange={handleInputChange(
                            setUserName,
                            setUserNameError
                          )}
                          onKeyDown={(e) => handleEnter(e, passcodeRef)}
                        />
                        {userNameError && (
                          <div className="invalid-feedback">
                            Enter a Username
                          </div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          type="password"
                          className={`form-control ${passcodeError ? "is-invalid" : ""
                            }`}
                          placeholder="Passcode"
                          value={passcode}
                          ref={passcodeRef}
                          onChange={handleInputChange(
                            setPasscode,
                            setPasscodeError
                          )}
                          onKeyDown={(e) => handleEnter(e, authpasscodeRef)}
                        />
                        {passcodeError && (
                          <div className="invalid-feedback">
                            Enter a Passcode
                          </div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          type="password"
                          className={`form-control ${authPasscodeError ? "is-invalid" : ""
                            }`}
                          placeholder="Auth Passcode"
                          value={authPasscode}
                          ref={authpasscodeRef}
                          onChange={handleInputChange(
                            setAuthPasscode,
                            setAuthPasscodeError
                          )}
                          onKeyDown={(e) => handleEnter(e, roleRef)}
                        />
                        {authPasscodeError && (
                          <div className="invalid-feedback">
                            Auth Passcode must match Passcode
                          </div>
                        )}
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <Multiselect
                          options={role}
                          displayValue="role_name"
                          onSelect={handleSelect}
                          onRemove={handleRemove}
                          placeholder="Select Role"
                          showCheckbox={true}
                          className="bg-white"
                        />
                      </div>
                      <div className="col"></div>
                    </div>
                    <button
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
      <ToastContainer />
    </>
  );
}

export default AddUser;
