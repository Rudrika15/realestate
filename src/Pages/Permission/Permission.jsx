import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";

function Permission() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTopbar = () => {
        setIsTopbarOpen(!isTopbarOpen);
    };

    return (
        <>
            <Helmet>
                <title>React Estate | Permission</title>
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
                                        <div className="p-2">
                                            <h6 className="mb-4">Permission</h6>
                                        </div>
                                        <div className="p-2 ">
                                            <Link to="/role" className="">
                                                <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="role"
                                                placeholder=""
                                                name="role"
                                            />
                                        </div>
                                    </div>
                                    <table className="table mt-4" style={{ marginLeft: '3rem' }}>
                                        <tbody>
                                            <td>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="check1"
                                                        name="option1"
                                                        value="something"
                                                    />
                                                    <label className="form-check-label" htmlFor="check1">
                                                        Option 1
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="check2"
                                                        name="option2"
                                                        value="something"
                                                    />
                                                    <label className="form-check-label" htmlFor="check2">
                                                        Option 2
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="check3"
                                                        name="option3"
                                                        value="something"
                                                    />
                                                    <label className="form-check-label" htmlFor="check3">
                                                        Option 3
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="check4"
                                                        name="option4"
                                                        value="something"
                                                    />
                                                    <label className="form-check-label" htmlFor="check4">
                                                        Option 4
                                                    </label>
                                                </div>
                                            </td>
                                            {data.length > 0 ? (
                                                    data.map((user, index) => (
                                                        <tr key={user.id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.Role?.role_name || 'N/A'}</td>
                                                            <td>{user.status}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">
                                                            No users found.
                                                        </td>
                                                    </tr>
                                                )}
                                        </tbody>
                                    </table>
                                    <div className="text-center pt-4">
                                        <Link to="" type="submit" className="btn btn-primary">
                                            Submit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Permission;
