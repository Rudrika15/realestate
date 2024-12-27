import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

function EditUser() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [passcode, setPasscode] = useState("");
    const [role, setRole] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passcodeError, setPasscodeError] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passcodeRef = useRef(null);
    const roleRef = useRef(null);
    const submitRef = useRef(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

    const handleEdit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!username) {
            setUsernameError(true);
            isValid = false;
        } else {
            setUsernameError(false);
        }

        if (!email) {
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }

        if (!passcode) {
            setPasscodeError(true);
            isValid = false;
        } else {
            setPasscodeError(false);
        }

        if (!role) {
            setRoleError(true);
            isValid = false;
        } else {
            setRoleError(false);
        }

        if (isValid) {
            setLoading(true);
            toast.success("User Updated Successfully!");
            setTimeout(() => {
                setLoading(false);
                navigate("/view-user");
            }, 1000);
        }
    };

    const handleEnter = (e, nextField) => {
        if (e.key === "Enter" && nextField?.current) {
            e.preventDefault();
            nextField.current.focus();
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value) setUsernameError(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value) setEmailError(false);
    };

    const handlePasscodeChange = (e) => {
        setPasscode(e.target.value);
        if (e.target.value) setPasscodeError(false);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setRoleError(false);
    };

    return (
        <>
            <Helmet>
                <title>React Estate | Edit User</title>
            </Helmet>
            <div className="container-fluid position-relative bg-white d-flex p-0">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-12">
                            <div className="bg-light rounded h-100 p-4">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="p-2">
                                        <h6 className="mb-4">User</h6>
                                    </div>
                                    <div className="p-2">
                                        <Link to="/view-user" className="">
                                            <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
                                        </Link>
                                    </div>
                                </div>
                                <form onSubmit={handleEdit}>
                                    <div className="row mb-3 w-50">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                                                placeholder="User Name"
                                                value={username}
                                                ref={usernameRef}
                                                onKeyDown={(e) => handleEnter(e, emailRef)}
                                                onChange={handleUsernameChange}
                                            />
                                            {usernameError && <div className="invalid-feedback">Username is required.</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-3 w-50">
                                        <div className="col">
                                            <input
                                                type="email"
                                                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                                placeholder="Email"
                                                value={email}
                                                ref={emailRef}
                                                onKeyDown={(e) => handleEnter(e, passcodeRef)}
                                                onChange={handleEmailChange}
                                            />
                                            {emailError && <div className="invalid-feedback">Email is required.</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-3 w-50">
                                        <div className="col">
                                            <input
                                                type="password"
                                                className={`form-control ${passcodeError ? 'is-invalid' : ''}`}
                                                placeholder="Passcode"
                                                value={passcode}
                                                ref={passcodeRef}
                                                onKeyDown={(e) => handleEnter(e, null)}
                                                onChange={handlePasscodeChange}
                                            />
                                            {passcodeError && <div className="invalid-feedback">Passcode is required.</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-3 w-50">
                                        <div className="col">
                                            <select
                                                className={`form-control bg-white ${roleError ? "is-invalid" : ""}`}
                                                value={role}
                                                ref={roleRef}
                                                onChange={handleRoleChange}
                                                onKeyDown={(e) => handleEnter(e, submitRef)}
                                            >
                                                <option value="">Select Role</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                            {roleError && (
                                                <div className="invalid-feedback">Please select a role.</div>
                                            )}
                                        </div>
                                    </div>
                                    <Link
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                        ref={submitRef}
                                    >
                                        {loading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            "Submit"
                                        )}
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <Link to="/view-user" className="">
                        <h6 className="mb-4">
                            <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                    </Link>
                </div>
            </div>
            <form onSubmit={handleEdit}>
                <div className="row mb-3 w-50">
                    <div className="col">
                        <input
                            type="text"
                            className={`form-control ${usernameError ? "is-invalid" : ""
                                }`}
                            placeholder="User Name"
                            value={username}
                            ref={usernameRef}
                            onKeyDown={(e) => handleEnter(e, emailRef)}
                            onChange={handleUsernameChange}
                        />
                        {usernameError && (
                            <div className="invalid-feedback">
                                Username is required.
                            </div>
                        )}
                    </div>
                </div>
                <div className="row mb-3 w-50">
                    <div className="col">
                        <input
                            type="email"
                            className={`form-control ${emailError ? "is-invalid" : ""
                                }`}
                            placeholder="Email"
                            value={email}
                            ref={emailRef}
                            onKeyDown={(e) => handleEnter(e, passcodeRef)}
                            onChange={handleEmailChange}
                        />
                        {emailError && (
                            <div className="invalid-feedback">
                                Email is required.
                            </div>
                        )}
                    </div>
                </div>
                <div className="row mb-3 w-50">
                    <div className="col">
                        <input
                            type="password"
                            className={`form-control ${passcodeError ? "is-invalid" : ""
                                }`}
                            placeholder="Passcode"
                            value={passcode}
                            ref={passcodeRef}
                            onKeyDown={(e) => handleEnter(e, null)}
                            onChange={handlePasscodeChange}
                        />
                        {passcodeError && (
                            <div className="invalid-feedback">
                                Passcode is required.
                            </div>
                        )}
                    </div>
                </div>
                <div className="row mb-3 w-50">
                    <div className="col">
                        <select
                            className={`form-control bg-white ${roleError ? "is-invalid" : ""
                                }`}
                            value={role}
                            ref={roleRef}
                            onChange={handleRoleChange}
                            onKeyDown={(e) => handleEnter(e, submitRef)}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        {roleError && (
                            <div className="invalid-feedback">
                                Please select a role.
                            </div>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    ref={submitRef}
                >
                    {loading ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>
        </div >
              </div >
            </div >
          </div >
        </div >
        </div>
      </div >
        <ToastContainer />
    </>
  );
}

export default EditUser;
