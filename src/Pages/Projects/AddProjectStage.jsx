import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

function AddProjectStage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [percentage, setPercentage] = useState('');
  const [wing, setWing] = useState('');
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
    if (e.key === "Enter" && nextField?.current) {
      e.preventDefault();
      handleAdd(e);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!title) {
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

    if (!wing) {
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

    if (isValid) {
      toast.success("Project Stage added successfully!");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/project-stage');
      }, 1000);
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
                        <select
                          className={`form-control bg-white ${titleError ? 'is-invalid' : ''}`}
                          value={title}
                          ref={titleRef}
                          onChange={handleFieldChange(setTitle, setTitleError)}
                          onKeyDown={(e) => handleEnter(e, percentageRef)}
                        >
                          <option value="" disabled>
                            Select Title
                          </option>
                          <option value="Foundation">Foundation</option>
                          <option value="RCC">RCC</option>
                        </select>
                        {titleError && (
                          <div className="invalid-feedback">Please select a Title</div>
                        )}
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          className={`form-control ${percentageError ? 'is-invalid' : ''}`}
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
                    <div className="row pt-4">
                      <div className="col">
                        <select
                          className={`form-control bg-white ${wingError ? 'is-invalid' : ''}`}
                          value={wing}
                          ref={wingRef}
                          onChange={handleFieldChange(setWing, setWingError)}
                          onKeyDown={(e) => handleEnter(e, stageDateRef)}
                        >
                          <option value="" disabled>
                            Select Wing
                          </option>
                          <option value="All Wings">All Wings</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                        </select>
                        {wingError && (
                          <div className="invalid-feedback">Please select a Wing</div>
                        )}
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${stageDateError ? 'is-invalid' : ''}`}
                          value={formatDate(stageDate)}
                          onChange={handleFieldChange(setStageDate, setStageDateError)}
                          onKeyDown={(e) => handleEnter(e, submitRef)}
                          placeholder="Stage Date"
                          onFocus={(e) => (e.target.type = 'date')}
                          onBlur={(e) => (e.target.type = 'text')}
                          ref={stageDateRef}
                        />
                        <i
                          className="bi bi-plus-circle-fill icon-2"
                        ></i>
                        {stageDateError && (
                          <div className="invalid-feedback">Please select a Stage Date</div>
                        )}
                      </div>
                    </div>
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
