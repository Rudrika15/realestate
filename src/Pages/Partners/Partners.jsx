import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { getPartner, deletePartner } from "../../Api/ApiDipak";
import axios from "axios";

const Partners = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };
  const fetchPartner = async () => {
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        navigate("/");
        return;
      }

      const response = await axios.get(getPartner, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === true && response.data.data) {
        setPartners(response.data.data);
        // toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate("/");
        } else {
          console.error("Error response:", error.response.data);
        }
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchPartner();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are You Sure You Want to Delete?",
      text: "Once you delete, all the data related to this user will be deleted.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c4c4c4",
      customClass: {
        title: "swal-title",
        text: "swal-text",
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
    });

    if (confirmDelete.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${deletePartner}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === true) {
          Swal.fire({
            title: "Deleted!",
            text: "The Partner has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          setPartners(partners.filter((item) => item.id !== id));
        } else {
          toast.error("Failed to delete user!");
        }
      } catch (error) {
        console.error("Error deleting Partners:", error);
        toast.error("An error occurred while deleting the Partners!");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Partners</title>
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
                    <div className="p-2">
                      <h6 className="mb-4">Partners List</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/add-partners">
                        <h6 className="mb-4">
                          <i className="bi bi-plus-circle-fill"></i> New Partner
                        </h6>
                      </Link>
                    </div>
                  </div>
                  {partners.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col">Partner Id</th>
                            <th scope="col">Project Name</th>
                            <th scope="col">Partner's Name</th>
                            <th scope="col" className="w-20">
                              Percentage
                            </th>
                            <th scope="col" className="w-20">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {partners.map((partner) => (
                            <tr key={partner.partnerId}>
                              <td>{partner.partnerId}</td>
                              <td>{partner.project?.projectName || "N/A"}</td>
                              <td>{partner.ProjectPartners[0]?.partnerName}</td>
                              <td>{partner.percentage}%</td>
                              <td>
                                {/* <Link
                                  to={`/edit-partners/${partner.id}`}
                                  className="btn btn-warning btn-sm me-2"
                                >
                                  <i className="fas fa-edit"></i>
                                </Link> */}
                                <Link
                                  onClick={() => handleDelete(partner.id)}
                                  className="btn btn-danger btn-sm"
                                >
                                  <i className="fas fa-trash"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src="img/image_2024_12_26T09_23_33_935Z.png"
                        alt="No Partners"
                        className="img-fluid w-25 h-25"
                      />
                      <p className="text-dark">No Partners Found</p>
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

export default Partners;
