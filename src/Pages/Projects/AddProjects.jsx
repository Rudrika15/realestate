import React, { useState,useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProjects() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState(null);

  const files = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error("Name can only contain letters and spaces");
      return;
    }
    if (name.length < 4) {
      toast.error("Minimum 4 Characters ");
      return;
    }

    if (!unit) {
      toast.error("Unit is Required");
      return;
    }

    if (unit.size > 2 * 1024 * 1024) {
      toast.error("Image Is Larger Than 3MB");
      return;
    }

    if (unit.type == "image/jpeg" || unit.type == "image/png") {
      toast.success("successfully");
    } else {
      toast.error("File Does Not Support. You Must Use .png or .jpg ");
      return;
    }
    console.log(files);
    setName("");
    files.current.value=null;
  };

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <div className="content">
        <Topbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-12">
              <div className="bg-light rounded h-100 p-4">
                <div className="row justify-content-center mx-0">
                  <div className="col-lg-10 col-md-12">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="p-2 ">
                        <h4>Add Project</h4>
                      </div>
                      <div className="p-2 ">
                        <Link to="/Projects" className="btn">
                          <i className="bi bi-arrow-left-circle-fill"></i>
                          &nbsp; Back
                        </Link>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name :{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          aria-describedby="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="file" className="form-label">
                          Upload Unit :{" "}
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/png, image/jpeg"
                          id="unit"
                          aria-describedby="unit"
                          ref={files}
                          onChange={(e) => setUnit(e.target.files[0])}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AddProjects;
