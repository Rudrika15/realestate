import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Multiselect from 'multiselect-react-dropdown';
import { addProjectStage } from '../../Api/DevanshiApi';
import axios from 'axios';

function AddProjectStage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState([]);
  const [percentage, setPercentage] = useState('');
  const [wing, setWing] = useState([]);
  const [stageDate, setStageDate] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [percentageError, setPercentageError] = useState(false);
  const [wingError, setWingError] = useState(false);
  const [stageDateError, setStageDateError] = useState(false);
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const percentageRef = useRef(null);
  const wingRef = useRef(null);
  const stageDateRef = useRef(null);
  const submitRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTopbar = () => {
    setIsTopbarOpen(!isTopbarOpen);
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      const day = ('0' + d.getDate()).slice(-2);
      const month = ('0' + (d.getMonth() + 1)).slice(-2);
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return '';
  };

  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField?.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (title.length === 0) {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (!percentage || percentage < 0 || percentage > 100) {
      setPercentageError(true);
      isValid = false;
    } else {
      setPercentageError(false);
    }

    if (wing.length === 0) {
      setWingError(true);
      isValid = false;
    } else {
      setWingError(false);
    }

    if (!stageDate) {
      setStageDateError(true);
      isValid = false;
    } else {
      setStageDateError(false);
    }

    if (!isValid) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        addProjectStage,
        {
          title,
          percentage,
          wing,
          stageDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast.success("User added successfully!");
        setTitle("");
        setStageDate("");
        setWing("");
        setPercentage([]);
        setTimeout(() => {
          navigate("/project-stage");
        }, 1000);
      } else {
        toast.error(response.data.message || "Failed to add project stage");
      }
    } catch (error) {
      toast.error("Failed to add project stage. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (setter, errorSetter) => (e) => {
    const value = e.target.value;
    if (setter === setPercentage) {
      if (value < 0 || value > 100) {
        errorSetter(true);
      } else {
        errorSetter(false);
      }
    }
    setter(value);
    if (value) {
      errorSetter(false);
    }
  };

  const handleMultiSelectChange = (selectedValues, setter, errorSetter) => {
    setter(selectedValues);
    if (selectedValues.length > 0) {
      errorSetter(false);
    } else {
      errorSetter(true);
    }
  };

  const [rows1, setRows1] = useState([
    { customerName: "", customerContact: "" },
  ]);


  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>React Estate | Add Project Stage</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
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
                      <h6 className="mb-4">Project Stage</h6>
                    </div>
                    <div className="p-2">
                      <Link to="/project-stage">
                        <h6 className="mb-4">
                          <i className="bi bi-arrow-left-circle-fill"></i> Back
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${titleError ? 'is-invalid' : ''} custom-input`}
                          placeholder="Title"
                          value={title}
                          onChange={handleFieldChange(setTitle, setTitleError)}
                          onKeyDown={(e) => handleEnter(e, percentageRef)}
                          ref={titleRef}
                        />
                        {titleError && <div className="invalid-feedback">Please select a Title</div>}
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          className={`form-control ${percentageError ? 'is-invalid' : ''} custom-input`}
                          placeholder="Percentage"
                          value={percentage}
                          onChange={handleFieldChange(setPercentage, setPercentageError)}
                          onKeyDown={(e) => handleEnter(e, wingRef)}
                          ref={percentageRef}
                        />
                        {percentageError && (
                          <div className="invalid-feedback">
                            Percentage must be between 0 and 100.
                          </div>
                        )}
                      </div>
                    </div>
                    {rows1.map((row, index) => (
                      <div className="row pt-4" key={`row1-${index}`}>
                        <div className="col">
                          <select
                            className={`form-control bg-white ${wingError ? "is-invalid" : ""}`}
                            value={wing}
                            ref={wingRef}
                            onChange={handleFieldChange}
                            onKeyDown={(e) => handleEnter(e, stageDateRef)}
                          >
                            <option value="" disabled>Wing</option>
                            <option value="">A</option>
                            <option value="">B</option>
                          </select>
                          {wingError && <div className="invalid-feedback">Please select a Wing</div>}
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className={`form-control ${stageDateError ? 'is-invalid' : ''}custom-input`}
                            value={formatDate(stageDate)}
                            onChange={handleFieldChange(setStageDate, setStageDateError)}
                            onKeyDown={(e) => handleEnter(e, submitRef)}
                            placeholder="Stage Date"
                            onFocus={(e) => (e.target.type = 'date')}
                            onBlur={(e) => (e.target.type = 'text')}
                            ref={stageDateRef}
                          />
                          {index === rows1.length - 1 && (
                            <i
                              className="bi bi-plus-circle-fill icon-2"
                              onClick={() => setRows1([...rows1, { customerName: "", customerContact: "" }])}
                            ></i>
                          )}
                          {stageDateError && (
                            <div className="invalid-feedback">Please select a Stage Date</div>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={handleAdd}
                      disabled={loading}
                      ref={submitRef}
                    >
                      {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
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

export default AddProjectStage;
