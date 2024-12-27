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
    const [incomeDate, setIncomeDate] = useState("");

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
                <title>React Estate | View Cancelled Booking</title>
            </Helmet>
            <div className="container-fluid position-relative bg-white d-flex p-0">
                <Sidebar isSidebarOpen={isSidebarOpen} />

                <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
                    <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

                    <div className="container-fluid pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-12">
                                <div className="bg-light rounded h-100 p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="p-2 ">
                                            <h6 className="mb-4">View Booking</h6>
                                        </div>
                                        <div className="p-2 ">
                                            <Link to="/view-booking" className="">
                                                <h6 className="mb-4"><i className="bi bi-arrow-left-circle-fill"></i> Back</h6>
                                            </Link>
                                        </div>
                                    </div>
                                    <form>
                                        <p class="text-dark fs-5">Project Details</p>
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
                                                <input
                                                    type="text"
                                                    id="date"
                                                    className="form-control"
                                                    value={
                                                        incomeDate
                                                            ? new Date(incomeDate).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "2-digit",
                                                            })
                                                            : ""
                                                    }
                                                    onChange={(e) => {
                                                        const inputDate = e.target.value;
                                                        const [day, month, year] = inputDate.split("-");
                                                        if (day && month && year) {
                                                            const formattedDate = `${day}-${month}-${year}`;
                                                            const parsedDate = new Date(formattedDate);
                                                            if (!isNaN(parsedDate)) {
                                                                setIncomeDate(parsedDate.toISOString().slice(0, 10));
                                                            } else {
                                                                console.error("Invalid date format");
                                                            }
                                                        }
                                                    }}
                                                    placeholder=""
                                                    onFocus={(e) => (e.target.type = "date")}
                                                    onBlur={(e) => (e.target.type = "text")}
                                                />
                                            </div>
                                            <div className="col"></div>
                                        </div>
                                        <hr />
                                        <p class="text-dark fs-5">Customer Details</p>
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" className="form-control" id="name" placeholder="Name" name="name" />
                                            </div>
                                            <div className="col">
                                                <input type="number" className="form-control" id="contact No" placeholder="Contact No" name="contact No" />
                                            </div>
                                        </div>
                                        <div className="row w-75">
                                            <div className="col pt-3">
                                                <textarea className="form-control" placeholder="Address" id="floatingTextarea"></textarea>
                                            </div>
                                        </div>
                                        <hr />
                                        <p class="text-dark fs-5">Payment Details</p>
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
                                        <hr />
                                        <p class="text-dark fs-5">Payment Terms</p>
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
                                                <input type="number" className="form-control" id="Installment Amount" placeholder="Installment Amount" name="Installment Amount" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" id="Installment Frequence" placeholder="Installment Frequence" name="Installment Frequence" />
                                            </div>
                                        </div>
                                        <div className="row pt-4">
                                            <div className="col">
                                                <input type="number" className="form-control" id="Total Installments" placeholder="Total Installments" name="Total Installments" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" id="Payment Mode" placeholder="Payment Mode" name="Payment Mode" />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center pt-4">
                                            <button type="submit" className="btn btn-secondary">Cancel Booking</button>
                                            <button type="submit" className="btn btn-secondary">Transfer Booking</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
                .btn{
                    margin-left:0.5rem;
                }
            `}</style >
        </>
    );
};

export default ViewCancelledBooking;
