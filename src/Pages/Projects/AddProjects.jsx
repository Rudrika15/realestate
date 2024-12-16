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
                {/* <div class="container-fluid pt-4 px-4">
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
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                <div className="col-md-6 position-relative" style={{ marginTop: '3rem' }}>
                                                    <label
                                                        htmlFor="name"
                                                        className="form-label text-muted"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '1.5rem',
                                                            transform: 'translateY(-130%)',
                                                            background: 'white',
                                                            padding: '0 5px',
                                                            zIndex: '1',
                                                            pointerEvents: 'none',
                                                        }}
                                                    >
                                                        Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        style={{
                                                            position: 'relative',
                                                            zIndex: '0',
                                                            border: '1px solid #AFA2A2',
                                                            width: '100%',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-0">
                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                <div className="col-md-6 position-relative" style={{ marginTop: '2rem' }}>
                                                    <label
                                                        htmlFor="details"
                                                        className="form-label"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '47px',
                                                            transform: 'translateY(-250%)',
                                                            background: 'white',
                                                            padding: '0 5px',
                                                            zIndex: '1',
                                                            pointerEvents: 'none',
                                                            color: '#6c757d',
                                                        }}
                                                    >
                                                        Upload Unit <span className="text-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        id="details"
                                                        style={{
                                                            position: 'relative',
                                                            zIndex: '0',
                                                            border: '1px solid #AFA2A2',
                                                            height: '100px',
                                                            width: '38rem',
                                                            textAlign: 'center',
                                                            color: '#6c757d',
                                                            paddingTop: '4rem'
                                                        }}
                                                    >
                                                        Upload a File </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#3F4747',
                                        color: 'white',
                                        borderRadius: '5px',
                                        width: '150px',
                                        height: '35px',
                                        border: 'none',
                                        marginTop: '4rem',
                                        marginLeft: '27rem'
                                    }}
                                >
                                    Submit
                                </button>
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

export default AddProjects
