import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

function AddUser() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [passcode, setPasscode] = useState("");
    const [role, setRole] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passcodeError, setPasscodeError] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const passcodeRef = useRef(null);
    const roleRef = useRef(null);
    const submitRef = useRef(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

    const handleAdd = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!username.trim()) {
            setUsernameError(true);
            isValid = false;
        } else {
            setUsernameError(false);
        }

        if (!passcode.trim()) {
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
            const newUser = {
                id: Date.now(),
                name: username,
                passcode: passcode,
                role: role,
            };
            const updatedUsers = [...users, newUser];
            localStorage.setItem("usersData", JSON.stringify(updatedUsers));
            setUsers(updatedUsers);

            toast.success("User Added Successfully!");
            setTimeout(() => {
                setLoading(false);
                setUsername("");
                setPasscode("");
                setRole("");
                navigate("/view-user");
            }, 2000);
        }
    };

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];
        setUsers(storedUsers);
    }, []);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value) setUsernameError(false);
    };

    const handlePasscodeChange = (e) => {
        setPasscode(e.target.value);
        if (e.target.value) setPasscodeError(false);
    };

    const handleRoleChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setRole(selectedOptions);
        if (selectedOptions.length > 0) setRoleError(false);
    };

    const handleEnter = (e, nextField) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (nextField?.current) {
                nextField.current.focus();
            } if (e.key === "Enter" && nextField?.current) {
                e.preventDefault();
                handleAdd(e);
            }
        }
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
                                        <h6>User</h6>
                                        <Link to="/view-user">
                                            <h6>
                                                <i className="bi bi-arrow-left-circle-fill"></i> Back
                                            </h6>
                                        </Link>
                                    </div>
                                    <form onSubmit={handleAdd}>
                                        <div className="row mb-3 w-50">
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className={`form-control ${usernameError ? "is-invalid" : ""}`}
                                                    placeholder="User Name"
                                                    value={username}
                                                    ref={usernameRef}
                                                    onChange={handleUsernameChange}
                                                    onKeyDown={(e) => handleEnter(e, passcodeRef)}
                                                />
                                                {usernameError && <div className="invalid-feedback">Enter a Username</div>}
                                            </div>
                                        </div>
                                        <div className="row mb-3 w-50">
                                            <div className="col">
                                                <input
                                                    type="password"
                                                    className={`form-control ${passcodeError ? "is-invalid" : ""}`}
                                                    placeholder="Passcode"
                                                    value={passcode}
                                                    ref={passcodeRef}
                                                    onChange={handlePasscodeChange}
                                                />
                                                {passcodeError && <div className="invalid-feedback">Enter a Passcode</div>}
                                            </div>
                                        </div>
                                        <div className="row mb-3 w-50">
                                            <div className="col">
                                                <select
                                                    className={`form-control bg-white ${roleError ? "is-invalid" : ""}`}
                                                    value={role}
                                                    ref={roleRef}
                                                    onChange={handleRoleChange}
                                                    multiple
                                                    onKeyDown={(e) => handleEnter(e, submitRef)}
                                                >
                                                    <option value="" className="bg-light" disabled>Select Role</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="user">User</option>
                                                    <option value="editor">Editor</option>
                                                    <option value="viewer">Viewer</option>
                                                </select>
                                                {roleError && <div className="invalid-feedback">Please select a role.</div>}
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                            ref={submitRef}
                                        >
                                            {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
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
