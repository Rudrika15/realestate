import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'

function PartnerReimbursement() {
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
                        <h4>Partner Reimbursement</h4>
                      </div>
                      <div className="p-2">
                        <button
                          className="shadow-sm"
                          style={{
                            border: "none",
                            backgroundColor: "#a2bdba",
                            borderRadius: "0.3rem",
                            marginRight: '1rem'
                          }}
                        >
                          <a>Income</a>
                        </button>
                        <Link to="/PartnerReimbursement">
                          <button
                            className="shadow-sm"
                            style={{
                              border: "none",
                              backgroundColor: "#a2bdba",
                              borderRadius: "0.3rem",
                            }}
                          >
                            <a>Reimbursement</a>
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <div className="p-2">
                      </div>
                      <div className="p-2">
                        <Link to="/AddPartnerReimbursment" className="btn">
                          <b><i className="bi bi-plus-circle-fill"></i> Add Reimbursement</b>
                        </Link>
                      </div>
                    </div>
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Reimbursment Date</th>
                          <th>Payment Mode</th>
                          <th>Reimbursment Type</th>
                          <th>Amount</th>
                          <th>Remark</th>
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
                            <button className="btn btn-warning btn-sm me-2">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger btn-sm">
                              <i className="fas fa-trash"></i>
                            </button>
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
                            <button className="btn btn-warning btn-sm me-2">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger btn-sm">
                              <i className="fas fa-trash"></i>
                            </button>
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
                            <button className="btn btn-warning btn-sm me-2">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger btn-sm">
                              <i className="fas fa-trash"></i>
                            </button>
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

export default PartnerReimbursement
