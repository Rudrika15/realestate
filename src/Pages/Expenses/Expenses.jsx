import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Topbar from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Link } from 'react-router-dom'

function Expenses() {
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
                        <h4>Expenses</h4>
                      </div>
                      <div className="p-2">
                        <Link to="/AddExpenses" className="btn">
                          <b><i className="bi bi-plus-circle-fill"></i> Add New Expense</b>
                        </Link>
                      </div>
                    </div>
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Voucher Expense Date</th>
                          <th>Expense Head</th>
                          <th>Narration</th>
                          <th>Amount</th>
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
      </div>
    </>
  )
}

export default Expenses
