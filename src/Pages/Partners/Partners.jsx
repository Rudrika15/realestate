import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { getPartner,partnerPartnerDelete } from "../../Api/ApiDipak";
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
      console.log(response.data.data);

      if (response.data.status === true && response.data.data) {
        setPartners(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchPartner();
  }, [navigate]);

  const handleDeletePartner = async (id) => {    
    const confirmDelete = await Swal.fire({
      title: "Are You Sure You Want to Delete?",
      text: "Once you delete, all the data related to this project will be deleted.",
      icon: "warning",
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
        if (!token) {
          toast.error("Token is missing.");
          return;
        }
        const response = await axios.delete(`${partnerPartnerDelete}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status === true) {
          Swal.fire({
            title: "Deleted!",
            text: "The project has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          // toast.success(response.data.message);
          setPartners(partners.filter((partner) => partner.id !== id));
        } else {
          toast.error("Failed to delete project.");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Session expired! Please log in again.");
          navigate("/");
        }
        toast.error("An error occurred while deleting the project.");
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
                  <div className="table-responsive">
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th scope="col">Partner Id</th>
                          <th scope="col">Partner Name</th>
                          <th scope="col">Project Name</th>
                          <th scope="col">Percentage</th>
                          <th scope="col">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {partners.map((partner) => (
                          <tr key={partner.id}>
                            <td>{partner.id}</td>
                            <td>{partner.partnerName}</td>
                            <td>
                              {partner.projects?.length > 0
                                ? partner.projects.map((project, index) => (
                                    <div key={index}>{project.projectName}</div>
                                  ))
                                : ""}
                            </td>
                            <td>
                              {partner.projects?.map((project, index) => (
                                <div key={index}>
                                  {project.ProjectPartner?.percentage || 0}%
                                </div>
                              ))}
                            </td>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "start",
                                  alignItems: "center",
                                  gap:20,
                                }}
                              >
                                <div
                                  style={{
                                    flex: 0,
                                    width:"20px",
                                    display: "flex",
                                    justifyContent: "start",
                                  }}
                                >
                                  <Link
                                    to={`/edit-partners/${partner.id}`}
                                    className="btn btn-warning btn-sm"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </Link>
                                </div>
                                {(!partner.projects ||
                                  partner.projects.length === 0) && (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      handleDeletePartner(partner.id)
                                    }
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Partners;
