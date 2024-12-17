import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link } from 'react-router-dom'

function AddExpenses() {
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
                        <h4>Voucher Expense</h4>
                      </div>
                      <div class="p-2 ">
                        <Link to="/Expenses" class="btn">
                          <i className="bi bi-arrow-left-circle-fill"></i>
                          &nbsp; Back
                        </Link>
                      </div>
                    </div>
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th>Project</th>
                          <th>Name</th>
                          <th>Expense Head</th>
                          <th>Narration</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <select class="form-select">
                              <option selected>Shiv</option>
                            </select>
                          </td>
                          <td><input type="text" class="form-control" value="Khilen Maniyar" /></td>
                          <td>
                            <select class="form-select">
                              <option selected>Construction Materials</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" value="Expense For Purchasing....." />
                          </td>
                          <td><input type="text" class="form-control" value="15,00,000" /></td>
                          <td><i
                            class="bi bi-x-circle-fill"
                            style={{
                              color: '#eb3423',
                              cursor: 'pointer',
                              fontSize: '1.3rem'
                            }}>
                          </i></td>
                        </tr>
                        <tr>
                          <td>
                            <select class="form-select">
                              <option selected>Mahadev</option>
                            </select>
                          </td>
                          <td><input type="text" class="form-control" value="Jigar Parmar" /></td>
                          <td>
                            <select class="form-select">
                              <option selected>Utilities</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" value="Expense For Purchasing....." />
                          </td>
                          <td><input type="text" class="form-control" value="5,00,000" /></td>
                          <td class="text-center action-buttons">
                            <i
                              class="bi bi-x-circle-fill"
                              style={{
                                color: '#eb3423',
                                cursor: 'pointer',
                                fontSize: '1.3rem'
                              }}>
                            </i>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <select class="form-select">
                              <option selected>Ganesh</option>
                            </select>
                          </td>
                          <td><input type="text" class="form-control" value="Jinal Pujara" /></td>
                          <td>
                            <select class="form-select">
                              <option selected>Site Preparation</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" value="Expense For Purchasing....." />
                          </td>
                          <td><input type="text" class="form-control" value="14,00,000" /></td>
                          <td class="text-center action-buttons">
                            <i
                              class="bi bi-x-circle-fill"
                              style={{
                                color: '#eb3423',
                                cursor: 'pointer',
                                fontSize: '1.3rem',
                                marginRight: '7px'
                              }}>
                            </i>
                            <i
                              className="bi bi-plus-circle-fill"
                              style={{
                                color: 'black',
                                cursor: 'pointer',
                                fontSize: '1.3rem'
                              }}
                            ></i>
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

export default AddExpenses
