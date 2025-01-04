import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import axios from "axios"; // Make sure axios is imported
// import { EditRole } from "../../Api/Kiran/Api"; // Import the EditRole API function

function EditRole() {
  const { id } = useParams(); // Retrieve the ID from the URL
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [rolename, setRolename] = useState("");
  const [rolenameerror, setRolenameError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const rolenameRef = useRef(null);

  // Fetch role data on component mount
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/getRole/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data.status === true) {
          setRolename(res.data.data.name); // Set the rolename state with the fetched data
        } else {
          toast.error("Failed to fetch role data.");
        }
      } catch (error) {
        console.error("Error fetching role data:", error);
        toast.error("There was an error fetching the data.");
      }
    };

    fetchRoleData();
  }, [id]);

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

    if (!rolename) {
      setRolenameError(true);
      isValid = false;
    } else {
      setRolenameError(false);
    }

    if (isValid) {
      setLoading(true);

      // Prepare data to send to the server
      const roleData = { name: rolename };

      try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`/updateRole/${id}`, roleData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data.status === true) {
          toast.success("Role updated successfully!");
          setTimeout(() => {
            setLoading(false);
            navigate("/role"); // Redirect to the roles page
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

  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField?.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleRolenameChange = (e) => {
    setRolename(e.target.value);
    if (e.target.value) setRolenameError(false);
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
                          className={`form-control ${rolenameerror ? "is-invalid" : ""}`}
                          value={rolename}
                          ref={rolenameRef}
                          placeholder="Rolename"
                          onKeyDown={(e) => handleEnter(e, null)}
                          onChange={handleRolenameChange}
                        />
                        {rolenameerror && (
                          <div className="invalid-feedback">
                            Role name is required.
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Add any checkboxes or other fields as required */}
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
