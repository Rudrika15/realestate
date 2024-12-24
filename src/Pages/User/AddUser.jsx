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
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [passcode, setPasscode] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passcodeError, setPasscodeError] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTopbar = () => {
        setIsTopbarOpen(!isTopbarOpen);
    };

    const handleAdd = async (e) => {
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
            console.log("form submitted with:", { username, passcode });
            setUsername('');
            setPasscode('');
            setLoading(true);
            setTimeout(() => {
                navigate("/view-user");
            }, 1000);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value) {
            setUsernameError(false);
        }
    };

    const handlePasscodeChange = (e) => {
        setPasscode(e.target.value);
        if (e.target.value) {
            setPasscodeError(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>React Estate | Add User</title>
            </Helmet>
            <div className="container-fluid position-relative bg-white d-flex p-0">
                <Sidebar isSidebarOpen={isSidebarOpen} />

                <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
                    <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

                    <div className="container-fluid pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-12">
                                <div className="bg-light rounded h-100 p-4">
                                    <div class="d-flex justify-content-between mb-3">
                                        <div class="p-2 ">
                                            <h6 className="mb-4">Add User</h6>
                                        </div>
                                        <div className="p-2 ">
                                            <Link to="/view-user" className="">
                                                <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
                                            </Link>
                                        </div>
                                    </div>
                                    <form>
                                        <div className="row mb-3 w-50">
                                            <div className="col">
                                                <input type="text"
                                                    className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                                                    id="username"
                                                    placeholder="User Name"
                                                    name="username"
                                                    value={username}
                                                    onChange={handleUsernameChange}
                                                />
                                                {usernameError && <div className="invalid-feedback">Enter a Username</div>}
                                            </div>
                                        </div>
                                        <div className="row mb-3 w-50 pt-2">
                                            <div className="col">
                                                <input type="password"
                                                    className={`form-control ${passcodeError ? 'is-invalid' : ''}`}
                                                    id="passcode"
                                                    placeholder="Passcode"
                                                    name="passcode"
                                                    value={passcode}
                                                    onChange={handlePasscodeChange}
                                                />
                                                {passcodeError && <div className="invalid-feedback">Enter a Passcode</div>}
                                            </div>
                                        </div>
                                        <Link to="/view-user"
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={handleAdd}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <Spinner animation="border" size="sm" />
                                                </div>
                                            ) : (
                                                "Submit"
                                            )}
                                        </Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUser
