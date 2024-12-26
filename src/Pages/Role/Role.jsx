// src/Pages/Add/Add.js
import React, { useState,useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from '../../Api/Api';
import axios from "axios";
import Swal from "sweetalert2";

const Role = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [data, setData] = useState(
    [
      { id: 1, name: "Bob Johnson" },
      { id: 2, name: "John Doe" },
      // { id: 3, name: 'Alice Smith' },
    ].sort((a, b) => a.name.localeCompare(b.name))
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };
  const getData = async () => {
    try {
      const res = await axios.get(getUsers);
      if (res.data.status === true) {
        const sortedData = res.data.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setData(sortedData);
      } else {
        console.error("Error fetching data:", res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  const handleDelete = (id) => {
          Swal.fire({
              title: 'Are You Sure You Want to Delete?',
              text: 'Once you delete, all the data related to this user will be deleted.',
              icon: 'error',
              showCancelButton: true,
              confirmButtonText: 'Delete',
              cancelButtonText: 'Cancel',
              confirmButtonColor: '#d33',
              cancelButtonColor: '#c4c4c4',
              customClass: {
                  title: 'swal-title',
                  text: 'swal-text',
                  confirmButton: 'swal-confirm-btn',
                  cancelButton: 'swal-cancel-btn',
              },
          }).then((result) => {
              if (result.isConfirmed) {
                  Swal.fire({
                      title: 'Deleted!',
                      text: 'The user has been deleted.',
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                  });
              }
          });
      };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Role</title>
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
                  <div className="d-flex justify-content-between   mb-3">
                    <div className="p-2 ">
                      <h6 className="mb-4">Role</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/add-role" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-plus-circle-fill"></i> New Role
                        </h6>
                      </Link>
                    </div>
                  </div>
                  {data.length > 0 ? (
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col" className="w-25">
                          Role Id
                        </th>
                        <th scope="col">Role Name</th>
                        <th scope="col" className="w-25">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((user) =>(
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>
                          <Link
                            to="/permission"
                            className="btn btn-info btn-sm me-2"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                          <Link
                            to="/edit-role"
                            className="btn btn-warning btn-sm me-2"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <Link onClick={() => handleDelete()} className="btn btn-danger btn-sm">
                            <i className="fas fa-trash"></i>
                          </Link>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                  ) : (
                    <div className="text-center">
                        <img src="img/image_2024_12_26T09_33_16_035Z.png" alt="No Users" className="img-fluid w-25 h-25" />
                        <p className="text-dark">No Users Found</p>
                    </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
//data are alfabetic and change id autometic 
