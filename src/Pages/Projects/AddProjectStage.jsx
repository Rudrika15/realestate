import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { addProjectStage, getProjectWing } from '../../Api/DevanshiApi';

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
  const [unitWings, setUnitWings] = useState([]);
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const percentageRef = useRef(null);
  const wingRef = useRef(null);
  const stageDateRef = useRef(null);
  const submitRef = useRef(null);


  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

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
    if (e.key === 'Enter' && nextField?.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const fetchWing = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log(token);

      const response = await axios.get(getProjectWing, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status == true) {
        console.log(response.data.status);
        setUnitWings(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Failed to fetch wing data');
      }
    } catch (error) {
      console.error('Error fetching wing:', error);
      toast.error('Error fetching wing');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWing();
  }, []);

  const handleFieldChange = (setter, errorSetter) => (e) => {
    const value = e.target.value;
    setter(value);
    if (value) {
      errorSetter(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (title.trim() === '') {
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

    if (wing.trim() === '') {
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
      const token = localStorage.getItem('token');
      const formData = {
        projectStageName: title,
        projectStagePer: percentage,
        wing,
        stageDate,
      };

      const response = await axios.post(addProjectStage, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status) {
        toast.success(response.data.message || 'Project stage added successfully!');
        setTitle('');
        setPercentage('');
        setWing('');
        setStageDate('');
        navigate('/project-stage');
      } else {
        toast.error(response.data.message || 'Failed to add project stage.');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'An unexpected error occurred.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
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
          <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Project Stage</h6>
                    <Link to="/project-stage">
                      <h6>
                        <i className="bi bi-arrow-left-circle-fill"></i> Back
                      </h6>
                    </Link>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className={`form-control ${titleError ? 'is-invalid' : ''}`}
                          placeholder="Title"
                          value={title}
                          onChange={handleFieldChange(setTitle, setTitleError)}
                          onKeyDown={(e) => handleEnter(e, percentageRef)}
                          ref={titleRef}
                        />
                        {titleError && <div className="invalid-feedback">Please enter a title</div>}
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
                        {percentageError && <div className="invalid-feedback">Percentage must be between 0 and 100</div>}
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col">
                        <select
                          className={`form-control bg-white${wingError ? 'is-invalid' : ''}`}
                          value={wing}
                          onChange={handleFieldChange(setWing, setWingError)}
                          ref={wingRef}
                        >
                          <option value="" disabled>
                            Select Wing
                          </option>
                          {unitWings.map((wing, index) => (
                            <option key={index} value={wing}>
                              {wing}
                            </option>
                          ))}
                        </select>
                        {wingError && <div className="invalid-feedback">Please select a wing</div>}
                      </div>
                      <div className="col">
                        <input
                          type="date"
                          className={`form-control ${stageDateError ? 'is-invalid' : ''}`}
                          value={stageDate}
                          onChange={handleFieldChange(setStageDate, setStageDateError)}
                          ref={stageDateRef}
                        />
                        {stageDateError && <div className="invalid-feedback">Please select a date</div>}
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
