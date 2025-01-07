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

function AddUser() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [passcode, setPasscode] = useState("");
    const [authPasscode, setAuthPasscode] = useState("");
    const [role, setRole] = useState([]);
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
    const submitRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTopbar = () => {
        setIsTopbarOpen(!isTopbarOpen);
    };

    const fetchRoles = async (e) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${ViewRoleData}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status == true) {
                setRole(response.data.data);
            } else {
                toast.error('Failed to fetch role data!');
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
            toast.error('Error fetching roles:', error);
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

        if (role.length === 0) {
            setRoleError(true);
            isValid = false;
        } else {
            setRoleError(false);
        }

        if (!isValid) return;

        setLoading(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("passcode", passcode);
        formData.append("authPasscode", authPasscode);
        formData.append("roles", JSON.stringify(role));
        formData.append("userId", userId);

        try {
            const response = await axios.post(addUsers, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.status === true) {
                toast.success("User added successfully!");
                setUserName("");
                setPasscode("");
                setAuthPasscode("");
                console.log(authPasscode);
                setRole([]);
                setUserNameError(false);
                setPasscodeError(false);
                setAuthPasscodeError(false);
                setRoleError(false);
                setTimeout(() => navigate("/view-user"), 2000);
            } else {
                toast.error(response.data.message || "Failed to add user.");
            }
        } catch (error) {
            console.error("Error adding user:", error);
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

    const handleRoleChange = (setRole, setRoleError) => (e) => {
        setRole(e.target.value);
        if (e.target.value) setRoleError(false);
    };

    const handleEnter = (e, nextField) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (nextField?.current) {
                nextField.current.focus();
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
                <div className={`content ${isSidebarOpen ? "content-open" : ""}`}>
                    <Topbar toggleSidebar={toggleSidebar} />
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
                                        <div className="row mb-3 w-50">
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className={`form-control ${userNameError ? "is-invalid" : ""}`}
                                                    placeholder="User Name"
                                                    value={userName}
                                                    ref={usernameRef}
                                                    onChange={handleInputChange(setUserName, setUserNameError)}
                                                    onKeyDown={(e) => handleEnter(e, passcodeRef)}
                                                />
                                                {userNameError && <div className="invalid-feedback">Enter a Username</div>}
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
                                                    onChange={handleInputChange(setPasscode, setPasscodeError)}
                                                    onKeyDown={(e) => handleEnter(e, authpasscodeRef)}
                                                />
                                                {passcodeError && <div className="invalid-feedback">Enter a Passcode</div>}
                                            </div>
                                        </div>
                                        <div className="row mb-3 w-50">
                                            <div className="col">
                                                <input
                                                    type="password"
                                                    className={`form-control ${authPasscodeError ? "is-invalid" : ""}`}
                                                    placeholder="Auth Passcode"
                                                    value={authPasscode}
                                                    ref={authpasscodeRef}
                                                    onChange={handleInputChange(setAuthPasscode, setAuthPasscodeError)}
                                                    onKeyDown={(e) => handleEnter(e, roleRef)}
                                                />
                                                {authPasscodeError && (
                                                    <div className="invalid-feedback">Enter an Auth Passcode</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mb-3 w-50">
                                            <div className="col">
                                                <select
                                                    className={`form-control bg-white ${roleError ? "is-invalid" : ""}`}
                                                    ref={roleRef}
                                                    onChange={handleRoleChange}
                                                    multiple
                                                >
                                                    <option value="" disabled>
                                                        Select Role
                                                    </option>
                                                    {Array.isArray(role) && role.length > 0 ? (
                                                        role.map((item) => (
                                                            <option key={item.id} value={item.role_name}>
                                                                {item.role_name}
                                                            </option>
                                                        ))
                                                    ) : null}
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
