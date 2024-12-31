// src/Pages/Add/Add.js
import React, { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "react-bootstrap";
import Swal from 'sweetalert2';

const ViewCancelledBooking = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [incomeDate, setIncomeDate] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [showFields, setShowFields] = useState(false);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingError, setBookingError] = useState("");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleRadioChange = (e) => {
        setShowFields(e.target.id === "flexRadioDefault2");
    };

    const toggleTopbar = () => {
        setIsTopbarOpen(!isTopbarOpen);
    };

    const handleShowModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            const day = ("0" + d.getDate()).slice(-2);
            const month = ("0" + (d.getMonth() + 1)).slice(-2);
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        }
        return "";
    };

    const handleCancel = () => {
        Swal.fire({
            title: 'Are You Sure You Want to Delete?',
            text: 'Once you delete, all the data related to this booking will be deleted.',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#c4c4c4',
            customClass: {
                title: 'swal-title',
                text: 'swal-text',
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The user has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                });
            }
        });
    };

    const handleBookingDateChange = (e) => {
        setBookingDate(e.target.value);
        if (e.target.value) setBookingError(false);
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
                                                    // ref={downPaymentDateRef}
                                                    className="form-control"
                                                    value={formatDate(bookingDate)}
                                                    onChange={(e) => handleBookingDateChange(e)}
                                                // onKeyDown={(e) => handleEnter(e, submitRef)}
                                                // placeholder="Down Payment Date"
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
                                            <Link
                                                onClick={() => handleCancel()}
                                                type="button"
                                                className="btn btn-primary"
                                            >
                                                Cancel Booking
                                            </Link>
                                            <Link
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => handleShowModal("Transfer")}
                                            >
                                                Transfer Booking
                                            </Link>
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
            <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
                <Modal.Header closeButton className="d-flex justify-content-center">
                    <Modal.Title className="w-100 text-center">{modalType} Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col position-relative">
                            <input
                                type="number"
                                className="form-control"
                                id="name"
                                placeholder="Old Unit No"
                                name="name"
                            />
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                id="Contact No"
                                placeholder="New Unit No"
                                name="Contact No"
                            />
                        </div>
                    </div>
                    <div className="row pt-4">
                        <p>Payment Terms</p>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                onChange={handleRadioChange}
                                checked={!showFields}
                            />
                            <label className="form-check-label" for="flexRadioDefault1">
                                Same As Old
                            </label>
                        </div>
                        <div className="form-check pt-2">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                onChange={handleRadioChange}
                                checked={showFields}
                            />
                            <label className="form-check-label" for="flexRadioDefault1">
                                Want To Change
                            </label>
                        </div>
                    </div>
                    {showFields && (
                        <>
                            <div className="row pt-4">
                                <div className="col">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Down Payment"
                                        placeholder="Down Payment"
                                        name="Down Payment"
                                    />
                                </div>
                                <div className="col">
                                    <select className="form-control bg-white" defaultValue="">
                                        <option value="">Payment Duration</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Installment Amount"
                                        placeholder="Installment Amount"
                                        name="Installment Amount"
                                    />
                                </div>
                                <div className="col">
                                    <select className="form-control bg-white" defaultValue="">
                                        <option value="">Payment Duration</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Total Installment"
                                        placeholder="Total Installment"
                                        name="Total Installment"
                                    />
                                </div>
                                <div className="col">
                                    <select className="form-control bg-white" defaultValue="">
                                        <option value="">Payment Duration</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Link
                        type="button"
                        className="btn btn-secondary w-25"
                        onClick={handleCloseModal}
                    >
                        Submit
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ViewCancelledBooking;
