import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";
import { Helmet } from 'react-helmet';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CancelledBooking = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [data, setData] = useState([
    {
      No: 1,
      date: '12/2/2024',
      customerName: 'Alice',
      saleDeedAmount: 500000,
      receivedSdAmount: 250000,
      pendingSdAmount: 250000,
      refundSdAmount: 200000,
      extraWorkAmount: 10000,
      receivedEwAmount: 5000,
      pendingEwAmount: 5000,
      refundEwAmount: 50000,
      otherWorkAmount: 1000,
      receivedOtAmount: 500,
      pendingOtAmount: 500,
      refundOtAmount: 50000
    },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getData = async () => {
    try {
      const res = await axios.get();
      if (res.data.status === true) {
        const sortedData = res.data.data.sort((a, b) => a.customerName.localeCompare(b.customerName));
        setData(sortedData);
      } else {
        console.error('Error fetching data:', res.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const formatIndianNumbering = (num) => {
    if (isNaN(num)) return num;
    num = num.toString().split('.'); 
    let integerPart = num[0];
    const decimalPart = num[1] ? '.' + num[1] : '';
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    integerPart = integerPart.replace(regex, ',');
    return integerPart + decimalPart;
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Cancelled Booking</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="">Cancelled Booking</h6>
                  </div>

                  <div className="table-responsive">
                    {data.length > 0 ? (
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col">Unit No</th>
                            <th scope="col">Booking Date</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Sale Deed Amount</th>
                            <th scope="col">Received SD Amount</th>
                            <th scope="col">Pending SD Amount</th>
                            <th scope="col">Refund SD Amount</th>
                            <th scope="col">Extra Work Amount</th>
                            <th scope="col">Received EW Amount</th>
                            <th scope="col">Pending EW Amount</th>
                            <th scope="col">Refund EW Amount</th>
                            <th scope="col">Other Work Amount</th>
                            <th scope="col">Received OT Amount</th>
                            <th scope="col">Pending OT Amount</th>
                            <th scope="col">Refund OT Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((book, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{book.date}</td>
                              <td>{book.customerName}</td>
                              <td>{formatIndianNumbering(book.saleDeedAmount)}</td>
                              <td>{formatIndianNumbering(book.receivedSdAmount)}</td>
                              <td>{formatIndianNumbering(book.pendingSdAmount)}</td>
                              <td>{formatIndianNumbering(book.refundSdAmount)}</td>
                              <td>{formatIndianNumbering(book.extraWorkAmount)}</td>
                              <td>{formatIndianNumbering(book.receivedEwAmount)}</td>
                              <td>{formatIndianNumbering(book.pendingEwAmount)}</td>
                              <td>{formatIndianNumbering(book.refundEwAmount)}</td>
                              <td>{formatIndianNumbering(book.otherWorkAmount)}</td>
                              <td>{formatIndianNumbering(book.receivedOtAmount)}</td>
                              <td>{formatIndianNumbering(book.pendingOtAmount)}</td>
                              <td>{formatIndianNumbering(book.refundOtAmount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center">
                        <img src="img/image_2024_12_26T09_23_33_935Z.png" alt="No Users" className="img-fluid w-25 h-25" />
                        <p className="text-dark">No Cancel Booking Data Found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelledBooking;
