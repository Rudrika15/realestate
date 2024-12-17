import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'

function ViewBooking() {
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
                  <div className="col-lg-12 col-md-12">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="p-2">
                        <h4>Booking</h4>
                      </div>
                      <div className="p-2">
                        <Link to="/Booking" className="btn">
                          <b><i className="bi bi-plus-circle-fill"></i> Add New Booking</b>
                        </Link>
                      </div>
                    </div>
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th>Unit No</th>
                          <th>Booking Date</th>
                          <th>Customer Name</th>
                          <th>Sale Deed Amount</th>
                          <th>Received SD Amount</th>
                          <th>Pending SD Amount</th>
                          <th>Extra Work Amount</th>
                          <th>Received EW Amount</th>
                          <th>Pending EW Amount</th>
                          <th>Other Work Amount</th>
                          <th>Received OT Amount</th>
                          <th>Pending OT Amount</th>
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
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/ViewCancelledBooking">
                              <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#a2bdba', color: "black" }}>
                                Action
                              </button>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/ViewCancelledBooking">
                              <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#a2bdba', color: "black" }}>
                                Action
                              </button>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <Link to="/ViewCancelledBooking">
                              <button type="button" className="btn shadow-sm" style={{ backgroundColor: '#a2bdba', color: "black" }}>
                                Action
                              </button>
                            </Link>
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
      </div >
    </>
  )
}

export default ViewBooking
