import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'

function Booking() {
  return (
    <>
      <Sidebar />
      <div class="content">
        <Topbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-12">
              <div className="bg-light rounded h-100 p-4">
                <div className="row justify-content-center mx-0">
                  <div className="col-lg-10 col-md-12">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="p-2">
                        <h4>Booking</h4>
                      </div>
                      <div className="p-2">
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
                          <select class="form-select mb-3" aria-label="Default select example">
                            <option selected>Project Name</option>
                          </select>
                        </div>
                        <div class="col">
                          <select class="form-select mb-3" aria-label="Default select example">
                            <option selected>Unit No</option>
                          </select>
                        </div>
                      </div>
                      <div class="row w-50">
                        <div class="col pt-2">
                          <div class="input-wrapper position-relative">
                            <input
                              type="date"
                              id="date"
                              class="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <p className='pt-3' style={{ fontSize: '1.5rem', color: 'black' }}>Customer Details</p>
                      <div class="row">
                        <div class="col">
                          <input type="text" class="form-control" id="name" placeholder="Name" name="name" />
                        </div>
                        <div class="col">
                          <input type="number" class="form-control" id="Contact No" placeholder="Contact No" name="Contact No" />
                        </div>
                      </div>
                      <div class="row w-75">
                        <div class="col pt-4">
                          <div class="form-floating">
                            <textarea class="form-control" placeholder="Address" id="floatingTextarea"></textarea>
                            <label for="floatingTextarea">Address</label>
                          </div>
                        </div>
                      </div>
                      <p className='pt-3' style={{ fontSize: '1.5rem', color: 'black' }}>Payment Details</p>
                      <div class="row">
                        <div class="col">
                          <input type="text" class="form-control" id="Sale Deed Amount" placeholder="Sale Deed Amount" Sale Deed Amount="name" />
                        </div>
                        <div class="col">
                          <input type="number" class="form-control" id="Extra Work Amount" placeholder="Extra Work Amount" name="Extra Work Amount" />
                        </div>
                      </div>
                      <div class="row pt-4">
                        <div class="col">
                          <input type="text" class="form-control" id="Other Work Amount" placeholder="Other Work Amount" name="Other Work Amount" />
                        </div>
                        <div class="col">
                        </div>
                      </div>
                      <p className='pt-3' style={{ fontSize: '1.5rem', color: 'black' }}>Payment Terms</p>
                      <div class="row">
                        <div class="col">
                          <input type="text" class="form-control" id="Down Payment" placeholder="Down Payment" name="Down Payment" />
                        </div>
                        <div class="col">
                          <select class="form-select mb-3" aria-label="Default select example">
                            <option selected>Payment Duration</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-check pt-2" style={{ marginLeft: '1rem' }}>
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Loan
                        </label>
                      </div>
                      <div class="form-check pt-2" style={{ marginLeft: '1rem' }}>
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Installment
                        </label>
                      </div>
                      <div class="form-check pt-3">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                        Installment Notify
                        </label>
                      </div>
                      <button type="submit" class="btn btn-primary mt-3">Submit</button>
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

export default Booking
