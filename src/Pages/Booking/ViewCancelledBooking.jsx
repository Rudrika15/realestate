import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Topbar from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Link } from 'react-router-dom'

function ViewCancelledBooking() {
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
                                                <h4>View Booking</h4>
                                            </div>
                                            <div class="p-2 ">
                                                <Link to="/ViewBooking" class="btn">
                                                    <i className="bi bi-arrow-left-circle-fill"></i>
                                                    &nbsp; Back
                                                </Link>
                                            </div>
                                        </div>
                                        <form>
                                            <p style={{ fontSize: '1.5rem', color: 'black' }}>Project Details</p>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" class="form-control" id="" placeholder="" name="" />
                                                </div>
                                                <div class="col">
                                                    <input type="text" class="form-control" id="" placeholder="" name="" />
                                                </div>
                                            </div>
                                            <div class="row pt-3">
                                                <div class="col">
                                                    <input type="text" class="form-control" id="" placeholder="" name="" />
                                                </div>
                                                <div class="col"></div>
                                            </div>
                                            <p className='pt-3' style={{ fontSize: '1.5rem', color: 'black' }}>Customer Details</p>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" class="form-control" id="name" placeholder="Name" name="name" />
                                                </div>
                                                <div class="col">
                                                    <input type="text" class="form-control" id="contact No" placeholder="Contact No" name="contact No" />
                                                </div>
                                            </div>
                                            <div class="row w-75">
                                                <div class="col pt-3">
                                                    <div class="form-floating">
                                                        <textarea class="form-control" placeholder="Address" id="floatingTextarea"></textarea>
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
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" class="form-control" id="Down Payment" placeholder="Down Payment" name="Down Payment" />
                                                </div>
                                                <div class="col">
                                                    <input type="text" class="form-control" id="" placeholder="" name="" />
                                                </div>
                                            </div>
                                            <div class="row pt-3">
                                                <div class="col">
                                                    <input type="text" class="form-control" id="Installment Amount" placeholder="Installment Amount" name="Installment Amount" />
                                                </div>
                                                <div class="col">
                                                    <input type="text" class="form-control" id="Installment Frequence" placeholder="Installment Frequence" name="Installment Frequence" />
                                                </div>
                                            </div>
                                            <div class="row pt-3">
                                                <div class="col">
                                                    <input type="text" class="form-control" id="Total Installments" placeholder="Total Installments" name="Total Installments" />
                                                </div>
                                                <div class="col">
                                                    <input type="text" class="form-control" id="Payment Mode" placeholder="Payment Mode" name="Payment Mode" />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center pt-4">
                                                <button type="submit" class="btn btn-secondary">Cancel Booking</button>
                                                <button type="submit" class="btn btn-secondary" style={{ marginLeft:'1rem' }}>Transfer Booking</button>
                                            </div>
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

export default ViewCancelledBooking
