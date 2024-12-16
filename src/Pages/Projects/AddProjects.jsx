import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

function AddProjects() {
    return (
        <>
            <Sidebar />
            <div class="content">
                <Topbar />
                <div class="container-fluid pt-4 px-4">
                    <div class="row g-4">
                        <div class="col-sm-12 col-xl-12">
                            <div class="bg-light rounded h-100 p-4">
                                <div className="row justify-content-center mx-0">
                                    <div className="col-lg-10 col-md-12">
                                        <div class="d-flex justify-content-between mb-3">
                                            <div class="p-2 ">
                                                <h4>Add Project</h4>
                                            </div>
                                            <div class="p-2 ">
                                                <Link to="/Projects" class="btn">
                                                    <i className="bi bi-arrow-left-circle-fill"></i>
                                                    &nbsp; Back
                                                </Link>
                                            </div>
                                        </div>
                                        <form>
                                            <div class="mb-3">
                                                <label for="name" class="form-label">Name : </label>
                                                <input type="text" class="form-control" id="name" aria-describedby="name" />
                                                <div id="name" class="form-text">
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="file" class="form-label">Upload Unit : </label>
                                                <input type="file" class="form-control" id="unit" aria-describedby="unit" />
                                                <div id="unit" class="form-text">
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                        </form>
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

export default AddProjects
