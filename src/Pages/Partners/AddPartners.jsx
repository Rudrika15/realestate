import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'

function AddPartners() {
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
                        <h4>Add Partners</h4>
                      </div>
                      <div class="p-2 ">
                        <Link to="/Partners" class="btn">
                          <i className="bi bi-arrow-left-circle-fill"></i>
                          &nbsp; Back
                        </Link>
                      </div>
                    </div>
                    <form>
                      <div class="row">
                        <div class="col">
                          <select class="form-select form-select-sm mb-4 w-50" aria-label=".form-select-sm example">
                            <option selected>Select Project</option>
                          </select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <input type="text" class="form-control" id="name" placeholder="Name" name="name" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control" id="percentage" placeholder="Percentage" name="percentage" />
                        </div>
                      </div>
                      <div class="row pt-4">
                        <div class="col">
                          <input type="text" class="form-control" id="name" placeholder="Name" name="name" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control" id="percentage" placeholder="Percentage" name="percentage" />
                        </div>
                      </div>
                      <div class="row pt-4">
                        <div class="col">
                          <input type="text" class="form-control" id="name" placeholder="Name" name="name" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control" id="percentage" placeholder="Percentage" name="percentage" />
                        </div>
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
      </div >
    </>
  )
}

export default AddPartners
