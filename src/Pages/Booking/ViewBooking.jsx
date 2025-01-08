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
import { getProject } from "../../Api/DevanshiApi";

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
      receivedOtAmount: '1500',
      pendingOtAmount: '1500'
    },
  ].sort((a, b) => a.name.localeCompare(b.name)));
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const formatIndianNumbering = (num) => {
    if (isNaN(num)) return num;
    num = parseFloat(num).toFixed(2);
    const parts = num.split(".");
    let integerPart = parts[0];
    const decimalPart = parts[1] === "00" ? "" : "." + parts[1];
    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
    const formattedInteger =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    return formattedInteger + decimalPart;
  };

  // // const getData = async () => {
  // //   try {
  // //     const res = await axios.get();
  // //     if (res.data.status === true) {
  // //       const sortedData = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
  // //       setData(sortedData);
  // //     } else {
  // //       console.error('Error fetching data:', res.data.message);
  // //     }
  // //   } catch (error) {
  // //     console.error('Error:', error);
  // //   }
  // // };

  // // useEffect(() => {
  // //   getData();
  // }, [data]);


  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token is missing!');
        window.location.href = '/';
        return;
      }

      console.log('Token:', token);

      const response = await axios.get(getProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status == true) {
        setProjects(response.data.data);
      } else {
        console.error("Failed to fetch peoject data!");
      }
    } catch (error) {
      console.error("Error fetching peojects:", error);
      toast.error("Error fetching peojects!");
    }
  };


  useEffect(() => {
    fetchProject();
  }, []);

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
                  <div className="row mb-4 d-flex align-items-center justify-content-between">
                    <div className="col-12 col-md-8 d-flex gap-3">
                      <div className="w-25">
                        <select className="form-select form-select-sm text-dark fs-6">
                          <option value="">Projects</option>
                          {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                              {project.projectName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-25">
                        <select className="form-select form-select-sm text-dark fs-6">
                          <option value="">Units</option>
                        </select>
                      </div>
                      <div className="w-25">
                        <select className="form-select form-select-sm text-dark fs-6">
                          <option value="">Customer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {data.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col">Unit No</th>
                            <th scope="col">Booking Date</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Sale Deed Amount</th>
                            <th scope="col">Received Sale Deed Amount</th>
                            <th scope="col">Pending Sale Deed Amount</th>
                            <th scope="col">Extra Work Amount</th>
                            <th scope="col">Received Extra Work Amount</th>
                            <th scope="col">Pending Extra Work Amount</th>
                            <th scope="col">Other Work Amount</th>
                            <th scope="col">Received Other Work Amount</th>
                            <th scope="col">Pending Other Work Amount</th>
                            <th scope="col">Action</th>
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
                                    <button type="button" className="btn shadow-sm text-dark">
                                      Action
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
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
