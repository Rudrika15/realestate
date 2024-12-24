import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

function AddUser() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [passcode, setPasscode] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passcodeError, setPasscodeError] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef(null);
    const passcodeRef = useRef(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleAdd = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!username) {
            setUsernameError(true);
            isValid = false;
        } else {
            setUsernameError(false);
        }

        if (!passcode) {
            setPasscodeError(true);
            isValid = false;
        } else {
            setPasscodeError(false);
        }

        if (isValid) {
            setLoading(true);
            toast.success("User Added Successfully!");
            setTimeout(() => {
                setLoading(false);
                navigate("/view-user");
            }, 2000);
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

    const handlePasscodeChange = (e) => {
        setPasscode(e.target.value);
        if (e.target.value) setPasscodeError(false);
    };

    return (
        <>
            <Helmet>
                <title>React Estate | Add User</title>
            </Helmet>
            <div className="container-fluid position-relative bg-white d-flex p-0">
                <Sidebar isSidebarOpen={isSidebarOpen} />

                <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
                    <Topbar toggleSidebar={toggleSidebar} />

                    <div className="container-fluid pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-12">
                                <div className="bg-light rounded h-100 p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h6>Add User</h6>
                                        <Link to="/view-user"><h6><i className="bi bi-arrow-left-circle-fill"></i> Back</h6></Link>
                                    </div>
                                    <form onSubmit={handleAdd}>
                                        <div className="row mb-3 w-50">
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className={`form-control ${usernameError ? 'is-invalid' : ''}`}
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
                                                    className={`form-control ${passcodeError ? 'is-invalid' : ''}`}
                                                    placeholder="Passcode"
                                                    value={passcode}
                                                    ref={passcodeRef}
                                                    onChange={handlePasscodeChange}
                                                    onKeyDown={(e) => handleEnter(e, null)}
                                                />
                                                {passcodeError && <div className="invalid-feedback">Enter a Passcode</div>}
                                            </div>
                                        </div>
                                        <Link to=""
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
                                        </Link>
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
