import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

function Projects() {
    return (
        <>
            <Sidebar />
            <div class="content">
                <Topbar />
                {/* <div class="container-fluid pt-4 px-4">
                    <div class="row g-4">
                        <div class="col-sm-12 col-xl-12">
                            <div class="bg-light rounded h-100 p-4">
                                <div className="row justify-content-center mx-0">
                                    <div className="col-lg-10 col-md-12">
                                        <div class="d-flex justify-content-between mb-3">
                                            <div class="p-2 ">
                                                <h4>Projects</h4>
                                            </div>
                                            <div class="p-2 ">
                                                <Link to="/AddProjects" class="btn">
                                                    <b><i class="bi bi-plus-circle-fill"></i> Add New Project</b>
                                                </Link>
                                            </div>
                                        </div>
                                        <table class="table table-bordered">
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
                                                        <button class="btn btn-sm p-0 m-1">
                                                            <img src="img/60535fdd1b5f2b932e9eed4484a5d87b.png" alt="Icon 1" class="img-fluid" style={{ width: "25px", height: "25px" }} />
                                                        </button>
                                                        <button class="btn btn-sm p-0 m-1">
                                                            <img src="img/a0ee6b39b5ab0178a7ab2f5547ddbd75.png" alt="Icon 2" class="img-fluid" style={{ width: "25px", height: "25px" }} />
                                                        </button>
                                                        <button class="btn btn-sm p-0 m-1">
                                                            <img src="img/622ed723d82bc2b2a3e64ca69673ecb6.png" alt="Icon 3" class="img-fluid" style={{ width: "25px", height: "25px" }} />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <Footer/>
            </div>
        </>
    )
}

export default Projects
