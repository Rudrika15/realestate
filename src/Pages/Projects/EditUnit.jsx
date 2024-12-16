import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'

function EditUnit() {
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
                        <h4>Edit Unit</h4>
                      </div>
                      <div class="p-2 ">
                        <Link to="/Unit" class="btn">
                          <i className="bi bi-arrow-left-circle-fill"></i>
                          &nbsp; Back
                        </Link>
                      </div>
                    </div>
                    <form>
                      <div class="row">
                        <div class="col">
                          <input type="text" class="form-control" id="wing" placeholder="Wing" name="wing" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control" id="flat name" placeholder="Flat Name" name="flat name" />
                        </div>
                      </div>
                      <div class="row pt-4">
                        <div class="col">
                          <input type="text" class="form-control" id="Size" placeholder="Size" name="Size" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control" id="Extra Work Amount" placeholder="Extra Work Amount" name="Extra Work Amount" />
                        </div>
                      </div>
                      <div class="row pt-4">
                        <div class="col">
                          <input type="text" class="form-control" id="Unit Type" placeholder="Unit Type" name="Unit Type" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control" id="Sale Deed Amount" placeholder="Sale Deed Amount" name="Sale Deed Amount" />
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary mt-3">Save</button>
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

export default EditUnit
