import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'

function Unit() {
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
                        <h4>Units</h4>
                      </div>
                      <div class="p-2 ">
                        <Link to="/Projects" class="btn">
                          <i className="bi bi-arrow-left-circle-fill"></i>
                          &nbsp; Back
                        </Link>
                      </div>
                    </div>
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th>Wing</th>
                          <th>Flat Name</th>
                          <th>Size</th>
                          <th>Extra Work Amount</th>
                          <th>Unit Type</th>
                          <th>Sale Deed Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/EditUnit" className="btn btn-warning btn-sm me-2">
                              <i className="fas fa-edit"></i>
                            </Link >
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/EditUnit" className="btn btn-warning btn-sm me-2">
                              <i className="fas fa-edit"></i>
                            </Link >
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/EditUnit" className="btn btn-warning btn-sm me-2">
                              <i className="fas fa-edit"></i>
                            </Link >
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default Unit
