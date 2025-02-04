import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import Allpermissions from "../Common component/Allpermissions";
import axios from "axios";
import { getPartnerIncome } from "../../Api/DevanshiApi";

const PartnerIncome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [permissionss, setPermissionss] = useState([]);
  const [partnerIncome, setPartnerIncome] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hasPermission = (permission) => permissionss.includes(permission);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  const fetchPartnerIncome = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(getPartnerIncome, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPartnerIncome(response.data.data);
      } else {
        toast.error("Failed to fetch Partner Income data!");
      }
    } catch (error) {
      console.error("Error fetching Partner Income:", error);
      if (error.response?.status === 401) {
        navigate("/");
      }
      toast.error("Error fetching Partner Income!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerIncome();
  }, []);

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Partner Income</title>
      </Helmet>
      <Allpermissions onFetchPermissions={setPermissionss} />

      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <Topbar toggleSidebar={toggleSidebar} toggleTopbar={toggleTopbar} />

          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Partner Income</h6>
                    {hasPermission("add-partner-income") && (
                      <Link to="/add-partner-income">
                        <h6 className="mb-4">
                          <i className="bi bi-plus-circle-fill"></i> Add Partner Income
                        </h6>
                      </Link>
                    )}
                  </div>

                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status"></div>
                    </div>
                  ) : partnerIncome.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th>Partner Name</th>
                            <th>Project Name</th>
                            <th>Income Date</th>
                            <th>Payment Mode</th>
                            <th>Amount</th>
                            {/* <th>Remark</th> */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {partnerIncome.map((income) => (
                            <tr key={income.id}>
                              <td>{income.PartnerIncome?.Partner?.partnerName || "N/A"}</td>
                              <td>{income.Project?.projectName || "N/A"}</td>
                              <td>{income.dateReceived ? new Date(income.dateReceived).toLocaleDateString() : "N/A"}</td>
                              <td>{income.paymentMode || "N/A"}</td>
                              <td>{parseFloat(income.amount).toFixed(2) || "N/A"}</td>
                              {/* <td>
                                {income.PartnerIncome?.remark || income.PartnerIncome?.remark || "N/A"}
                              </td> */}
                              <td>
                                {hasPermission("edit-partner-incom") && (
                                  <Link to="" className="btn btn-warning btn-sm me-2">
                                    <i className="fas fa-edit"></i>
                                  </Link>
                                )}
                                {hasPermission("delete-partner-income") && (
                                  <button className="btn btn-danger btn-sm">
                                    <i className="fas fa-trash"></i>
                                  </button>
                                )}
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
                        alt="No Users"
                        className="img-fluid w-25 h-25"
                      />
                      <p className="text-dark">No Partner Income Found</p>
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

export default PartnerIncome;
