import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Link } from 'react-router-dom';

function ProjectStage() {
    const staticData = [
        { id: 1, Title: "Shiv", Percentage: "10%" },
    ];

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(
        staticData.sort((a, b) => a.Title.localeCompare(b.Title))
    );

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTopbar = () => {
        setIsTopbarOpen(!isTopbarOpen);
    };

    return (
        <>
            <Helmet>
                <title>React Estate | Projects</title>
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
                                            <h6 className="mb-4">Project Stage List</h6>
                                        </div>
                                        <div className="p-2">
                                            <Link to="/add-project-stage">
                                                <h6 className="mb-4">
                                                    <i className="bi bi-plus-circle-fill"></i> New Project Stage
                                                </h6>
                                            </Link>
                                        </div>
                                    </div>

                                    {loading ? (
                                        <div className="text-center">
                                            <div
                                                className="spinner-border text-primary"
                                                role="status"
                                                aria-label="Loading"
                                            >
                                                <span className="visually-hidden"></span>
                                            </div>
                                        </div>
                                    ) : data.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">StageId</th>
                                                        <th scope="col" className='w-25'>Title</th>
                                                        <th scope="col">Percentage</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.Title}</td>
                                                            <td>{item.Percentage}</td>
                                                            <td>
                                                                <Link to="" className="btn btn-warning btn-sm me-2">
                                                                    <i className="fas fa-edit"></i>
                                                                </Link>
                                                                <Link to="" className="btn btn-danger btn-sm">
                                                                    <i className="fas fa-trash"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <img
                                                src="img/image_2024_12_26T09_23_33_935Z.png"
                                                alt="No Users"
                                                className="img-fluid w-25 h-25"
                                            />
                                            <p className="text-dark">No Users Found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectStage;
