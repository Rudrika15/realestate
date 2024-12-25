// src/Pages/Add/Add.js
import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
// import Pagination from '../../Components/Pagination/Pagination';

const Projects = () => {
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
                <title>React Estate | Projects</title>
            </Helmet>
            <div className="container-fluid position-relative bg-white d-flex p-0">
                <Sidebar isSidebarOpen={isSidebarOpen} />

                <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
                    <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

                    <div className="container-fluid pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-12">
                                <div className="bg-light rounded h-100 p-4">
                                    <div className="d-flex justify-content-between   mb-3">
                                        <div className="p-2 ">
                                            <h6 className="mb-4">Projects</h6>
                                        </div>
                                        <div className="p-2">
                                            <Link to="/add-projects" className="">
                                                <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> Add New Project</h6>
                                            </Link>
                                        </div>
                                    </div>
                                    <table className="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">Project Name</th>
                                                <th scope="col">Total Units</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                         
                                                <td></td>
                                                <td>
                                                    <Link to="/unit" className="btn btn-info btn-sm me-2">
                                                        <i className="fas fa-eye"></i>
                                                    </Link>
                                                    <Link to="/edit-unit" className="btn btn-warning btn-sm me-2">
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                                                                       
                                                    <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    <i className="fas fa-trash"></i>
                                                    </button>

                                                    {/* <!-- Modal --> */}
                                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                        Are you sure you want to delete the project? It may affect projects as well.
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Yes</button>
                                                            <button type="button" class="btn btn-secondary">No</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </td>
                                            </tr>
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
        </>
    );
};

export default Projects;
