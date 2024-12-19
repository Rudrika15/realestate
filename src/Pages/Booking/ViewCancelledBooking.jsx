// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";

const ViewCancelledBooking = () => {
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
            <ToastContainer />
            <Helmet>
                <title>React Estate |View Booking</title>
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
                                            <h6 className="mb-4">View Booking</h6>
                                        </div>
                                        <div class="p-2 ">
                                            <Link to="/view-booking" className="">
                                                <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
                                            </Link>
                                        </div>
                                    </div>
                                    <form>
                                        <p style={{ fontSize: '1.5rem', color: 'black' }}>Project Details</p>
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" className="form-control" id="" placeholder="" name="" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" id="" placeholder="" name="" />
                                            </div>
                                        </div>
                                        <div className="row pt-4">
                                            <div className="col">
                                                <input type="text" className="form-control" id="" placeholder="" name="" />
                                            </div>
                                            <div className="col"></div>
                                        </div>
                                        <p className='pt-3' style={{ fontSize: '1.5rem', color: 'black' }}>Customer Details</p>
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" className="form-control" id="name" placeholder="Name" name="name" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" id="contact No" placeholder="Contact No" name="contact No" />
                                            </div>
                                        </div>
                                        <div className="row w-75">
                                            <div className="col pt-4">
                                                <div className="form-floating">
                                                    <textarea className="form-control" placeholder="Address" id="floatingTextarea"></textarea>
                                                    <label for="floatingTextarea">Address</label>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='pt-3' style={{ fontSize: '1.5rem', color: 'black' }}>Payment Details</p>
                                        <table className="table table-bordered text-center">
                                            <thead>
                                                <tr>
                                                    <th>Amount Type</th>
                                                    <th>Actual Amount</th>
                                                    <th>Recieved Amount</th>
                                                    <th>Pending Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Sale Deed Amount</td>
                                                    <td>70,00,000</td>
                                                    <td>30,00,000</td>
                                                    <td>40,00,000</td>
                                                </tr>
                                                <tr>
                                                    <td>Extra Work Amount</td>
                                                    <td>5,00,000</td>
                                                    <td>2,00,000</td>
                                                    <td>3,00,000</td>
                                                </tr>
                                                <tr>
                                                    <td>Other Work Amount</td>
                                                    <td>5,00,000</td>
                                                    <td>2,00,000</td>
                                                    <td>3,00,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className='pt-3' style={{ fontSize: '1.5rem', color: 'black' }}>Payment Terms</p>
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" className="form-control" id="Down Payment" placeholder="Down Payment" name="Down Payment" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" id="" placeholder="" name="" />
                                            </div>
                                        </div>
                                        <div className="row pt-4">
                                            <div className="col">
                                                <input type="text" className="form-control" id="Installment Amount" placeholder="Installment Amount" name="Installment Amount" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" id="Installment Frequence" placeholder="Installment Frequence" name="Installment Frequence" />
                                            </div>
                                        </div>
                                        <div className="row pt-4">
                                            <div className="col">
                                                <input type="text" className="form-control" id="Total Installments" placeholder="Total Installments" name="Total Installments" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" id="Payment Mode" placeholder="Payment Mode" name="Payment Mode" />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center pt-4">
                                            <button type="submit" className="btn btn-secondary">Cancel Booking</button>
                                            <button type="submit" className="btn btn-secondary" style={{ marginLeft: '1rem' }}>Transfer Booking</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default ViewCancelledBooking;
