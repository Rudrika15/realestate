import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'

function BookingAuthorization() {
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
                        <h4>Booking Authorization</h4>
                      </div>
                    </div>
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Project Name</th>
                          <th>Unit No</th>
                          <th>Customer Name</th>
                          <th>Sale Deed Amount</th>
                          <th>Extra Work Amount</th>
                          <th>Changes</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div class="form-check1">
                              <input class="form-check-input1" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <div class="btn-group" role="group" aria-label="Action Buttons">
                              <button type="button" class="btn shadow-sm" style={{ backgroundColor: '#f0e4ee',color:"black" }}>Accept</button>
                              <button type="button" class="btn shadow-sm" style={{ backgroundColor: '#e4edd1',color:"black", marginLeft: '0.5rem' }}>Reject</button>
                              <button type="button" class="btn shadow-sm" style={{ backgroundColor: '#ccdedc',color:"black", marginLeft: '0.5rem' }}>View</button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check1">
                              <input class="form-check-input1" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <div class="btn-group" role="group" aria-label="Action Buttons">
                              <button type="button" class="btn shadow-sm" style={{ backgroundColor: '#f0e4ee',color:"black" }}>Accept</button>
                              <button type="button" class="btn shadow-sm" style={{ backgroundColor: '#e4edd1',color:"black", marginLeft: '0.5rem' }}>Reject</button>
                              <button type="button" class="btn shadow-sm" style={{ backgroundColor: '#ccdedc',color:"black", marginLeft: '0.5rem' }}>View</button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check1">
                              <input class="form-check-input1" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <div class="btn-group" role="group" aria-label="Action Buttons">
                              <button type="button" class="btn shadow-sm" style={{ backgroundColor: '#f0e4ee',color:"black" }}>Accept</button>
                              <button type="button" class="btn shadow-sm" style={{ backgroundColor: '#e4edd1',color:"black", marginLeft: '0.5rem' }}>Reject</button>
                              <button type="button" class="btn shadow-sm" style={{ backgroundColor: '#ccdedc',color:"black", marginLeft: '0.5rem' }}>View</button>
                            </div>
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

export default BookingAuthorization
