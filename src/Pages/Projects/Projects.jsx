import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

function Projects() {
    return (
        <>
            <Sidebar />
            <div className="content">
                <Topbar />
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-12">
                            <div className="bg-light rounded h-100 p-4">
                                <div className="row justify-content-center mx-0">
                                    <div className="col-lg-10 col-md-12">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="p-2">
                                                <h4>Projects</h4>
                                            </div>
                                            <div className="p-2">
                                                <Link to="/AddProjects" className="btn">
                                                    <b><i className="bi bi-plus-circle-fill"></i> Add New Project</b>
                                                </Link>
                                            </div>
                                        </div>
                                        <table className="table table-bordered text-center">
                                            <thead>
                                                <tr>
                                                    <th>Project Name</th>
                                                    <th>Total Units</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <Link to="/unit" className="btn btn-primary btn-sm me-2">
                                                            <i className="fas fa-eye"></i>
                                                        </Link>
                                                        <button className="btn btn-warning btn-sm me-2">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button className="btn btn-danger btn-sm">
                                                            <i className="fas fa-trash"></i>
                                                        </button>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <Link to="/unit" className="btn btn-primary btn-sm me-2">
                                                            <i className="fas fa-eye"></i>
                                                        </Link>
                                                        <button className="btn btn-warning btn-sm me-2">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button className="btn btn-danger btn-sm">
                                                            <i className="fas fa-trash"></i>
                                                        </button>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <Link to="/unit" className="btn btn-primary btn-sm me-2">
                                                            <i className="fas fa-eye"></i>
                                                        </Link>
                                                        <button className="btn btn-warning btn-sm me-2">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button className="btn btn-danger btn-sm">
                                                            <i className="fas fa-trash"></i>
                                                        </button>

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
                <Footer />
            </div>
        </>
    )
}

export default Projects
