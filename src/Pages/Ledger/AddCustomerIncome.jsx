import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'

function AddCustomerIncome() {
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
                        <h4>Add Customer Income</h4>
                      </div>
                      <div class="p-2 ">
                        <Link to="/CustomerIncome" class="btn">
                          <i className="bi bi-arrow-left-circle-fill"></i>
                          &nbsp; Back
                        </Link>
                      </div>
                    </div>
                    <form>
                      <div class="row">
                        <div class="col">
                          <input type="text" class="form-control" id="Customer Name" placeholder="Customer Name" name="Customer Name" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control" id="Unit No" placeholder="Unit No" name="Unit No" />
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
                      <div class="row pt-3">
                        <div class="col">
                          <input type="text" class="form-control" id="Sale Deed Price" placeholder="Sale Deed Price" name="Sale Deed Price" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control" id="Status" placeholder="Status" name="Status" />
                        </div>
                      </div>
                      <div class="row pt-3">
                        <div class="col">
                          <div class="input-wrapper position-relative">
                            <input
                              type="date"
                              id="date"
                              class="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div class="col">
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
                      <div class="row pt-3">
                        <div class="col">
                          <input type="text" class="form-control" id="Amount" placeholder="Amount" name="Amount" />
                        </div>
                        <div class="col"></div>
                      </div>
                      <div class="row pt-3">
                        <p>Payment Mode</p>
                        <div class="form-check" style={{ marginLeft: '1rem' }}>
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                          <label class="form-check-label" for="flexRadioDefault1">
                            Cash
                          </label>
                        </div>
                        <div class="form-check pt-2" style={{ marginLeft: '1rem' }}>
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                          <label class="form-check-label" for="flexRadioDefault1">
                            Cheque
                          </label>
                        </div>
                      </div>
                      <div class="row pt-3">
                        <div class="col">
                          <input type="text" class="form-control" id="Check No" placeholder="Check No" name="Check No" />
                        </div>
                        <div class="col"></div>
                      </div>
                      <div class="row pt-3">
                        <div class="col">
                          <select class="form-select mb-3 w-50" aria-label="Default select example">
                            <option selected>Bank</option>
                          </select>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="file" class="form-label">Upload Check : </label>
                        <input type="file" class="form-control" id="check" aria-describedby="check" />
                        <div id="check" class="form-text">
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Save</button>
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

export default AddCustomerIncome
