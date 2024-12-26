import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2"; 

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

  useEffect(() => {
    const storedPartnersData = JSON.parse(localStorage.getItem("partnersData"));
    if (storedPartnersData) {
      setPartners(storedPartnersData);
    }
  }, []);

  const handleEdit = (index) => {
    navigate(`/add-partners`, { state: { partner: partners[index] } });
  };

  const deletePartner = (index) => {
    Swal.fire({
      title: "Are You sure You <br /> Want to Delete?",
      text: "Once you delete all the data related to the project will be deleted.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPartners = partners.filter((_, i) => i !== index);
        setPartners(updatedPartners);
        localStorage.setItem("partnersData", JSON.stringify(updatedPartners));
        Swal.fire("Deleted!", "The partner has been deleted.", "success");
      }
    });
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
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="p-2">
                      <h6 className="mb-4">Partners</h6>
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
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col" className="w-25">
                            Percentage
                          </th>
                          <th scope="col" className="w-25">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {partners.map((partner, index) => (
                          <tr key={index}>
                            <td>{partner.name}</td>
                            <td>{partner.percentage}</td>
                            <td>
                              <button
                                onClick={() => handleEdit(index)} 
                                className="btn btn-warning btn-sm me-2"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                onClick={() => deletePartner(index)}
                                className="btn btn-danger btn-sm"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center">
                      {/* <img
                        src="img/nodata.png"
                        alt="No Partners"
                        className="img-fluid w-25 h-25"
                      />
                      <p className="text-dark">No Partners Found</p> */}
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
