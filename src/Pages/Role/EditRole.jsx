import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { EditRoleData } from "../../Api/Apikiran";

function EditRole() {
  const { id } = useParams(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [role_name, setRole_name] = useState("");
  const [role_nameerror, setRole_nameError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const role_nameRef = useRef(null);

  // Fetch role data on component mount
  const fetchRole = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token: ", token);

      const response = await axios.get(`${EditRoleData}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === true) {
        console.log("role data:", response.data.data);
        setRole_name(response.data.role_name);
      } else {
        toast.error("Failed to fetch permission data!");
      }
    } catch (error) {
      console.error("Error fetching role:", error);
      toast.error("Error fetching role.");
    }
  };

  useEffect(() => {
    fetchRole();
  }, []);

 const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  // Handle form validation and submission
  const handleEdit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!role_name) {
      setRole_nameError(true);
      isValid = false;
    } else {
      setRole_nameError(false);
    }

    if (isValid) {
      setLoading(true);

      
      const roleData = { name: role_name };

      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`/updateRole/${id}`, roleData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data.data.status === true) {
          toast.success("Role updated successfully!");
          setTimeout(() => {
            setLoading(false);
            navigate("/role"); 
          }, 1000);
        } else {
          toast.error("Failed to update role.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error updating role:", error);
        toast.error("An error occurred while updating the role.");
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    console.log("Role Name Updated: ", role_name);
  }, [role_name]);
  

  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField?.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleRolenameChange = (e) => {
    setRole_name(e.target.value);
    if (e.target.value) setRole_nameError(false);
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Edit Role</title>
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
                      <h6 className="mb-4">Edit Role</h6>
                    </div>
                    <div className="p-2 ">
                      <Link to="/role" className="">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <form onSubmit={handleEdit}>
                    
                    <div className="row mb-3 w-50">
                      <div className="col">
                        <input
                          className={`form-control ${role_nameerror ? "is-invalid" : ""}`}
                          value={role_name}
                          ref={role_nameRef}
                          onKeyDown={(e) => handleEnter(e, null)}
                          onChange={handleRolenameChange}
                        />
                        {console.log("Current role_name: ", role_name)}
                        {role_nameerror && (
                          <div className="invalid-feedback">
                            Role name is required.
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditRole;
