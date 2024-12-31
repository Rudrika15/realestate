// src/Pages/Add/Add.js
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ViewBooking = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [data, setData] = useState([
    {
      No: 1,
      date: '12/2/2024',
      customerName: 'Alice',
      saleDeedAmount: '500000',
      receivedSdAmount: '250000',
      pendingSdAmount: '250000',
      extraWorkAmount: '10000',
      receivedEwAmount: '5000',
      pendingEwAmount: '5000',
      otherWorkAmount: '1000',
      receivedOtAmount: '500',
      pendingOtAmount: '500'
    },
  ].sort((a, b) => a.name.localeCompare(b.name)));
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

  const getData = async () => {
    try {
      const res = await axios.get();
      if (res.data.status === true) {
        const sortedData = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
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
  }, [data]);
  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Booking</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <Topbar
            toggleSidebar={toggleSidebar}
            isTopbarOpen={isTopbarOpen}
            toggleTopbar={toggleTopbar}
          />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="p-2 ">
                      <h6 className="mb-4">Booking List</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/booking" className="">
                        <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> New Booking</h6>
                      </Link>
                    </div>
                  </div>
                  {data.length > 0 ? (
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th scope="col" className="">Unit No</th>
                          <th scope="col" className="">Booking Date</th>
                          <th scope="col" className="">Customer Name</th>
                          <th scope="col" className="">Sale Deed Amount</th>
                          <th scope="col" className="">Received Sale Deed Amount</th>
                          <th scope="col" className="">Pending Sale Deed Amount</th>
                          <th scope="col" className="">Extra Work Amount</th>
                          <th scope="col" className="">Received Extra Work Amount</th>
                          <th scope="col" className="">Pending Extra Work Amount</th>
                          <th scope="col" className="">Other Work Amount</th>
                          <th scope="col" className="">Received Other Work Amount</th>
                          <th scope="col" className="">Pending Other Work Amount</th>
                          <th scope="col" className="">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((book, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{book.date}</td>
                              <td>{book.customerName}</td>
                              <td>{formatIndianNumbering(book.saleDeedAmount)}</td>
                              <td>{formatIndianNumbering(book.receivedSdAmount)}</td>
                              <td>{formatIndianNumbering(book.pendingSdAmount)}</td>
                              <td>{formatIndianNumbering(book.extraWorkAmount)}</td>
                              <td>{formatIndianNumbering(book.receivedEwAmount)}</td>
                              <td>{formatIndianNumbering(book.pendingEwAmount)}</td>
                              <td>{formatIndianNumbering(book.otherWorkAmount)}</td>
                              <td>{formatIndianNumbering(book.receivedOtAmount)}</td>
                              <td>{formatIndianNumbering(book.pendingOtAmount)}</td>
                              <td>
                                <Link to="/view-cancelled-booking">
                                  <button
                                    type="button"
                                    className="btn shadow-sm text-dark">
                                    Action
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center">
                      <img src="img/image_2024_12_26T09_23_33_935Z.png" alt="No Users" className="img-fluid w-25 h-25" />
                      <p className="text-dark">No Booking Data Found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .btn{
          background-color: #a2bdba;
        }
      `}</style >
    </>
  );
};

export default ViewBooking;
