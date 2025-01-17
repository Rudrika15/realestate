import React, { useState, useEffect } from 'react';
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
  const [stageDates, setStageDates] = useState({});
  const [wingOptions, setWingOptions] = useState([]);
  const [selectedWings, setSelectedWings] = useState([]);
  const [errors, setErrors] = useState({});
  const [sharedDate, setSharedDate] = useState('');

  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

  useEffect(() => {
    const fetchWing = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('No token found. Please log in again.');
          navigate('/login');
          return;
        }
        const response = await axios.get(getProjectWing, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.status) {
          setWingOptions(response.data.data || []);
        } else {
          toast.error('No wings found.');
        }
      } catch (error) {
        console.error('Error fetching wings:', error);
        toast.error('Error fetching wings');
      }
    };
    fetchWing();
  }, [navigate]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleCheckboxChange = (wing) => {
    setSelectedWings((prev) =>
      prev.includes(wing) ? prev.filter((w) => w !== wing) : [...prev, wing]
    );
  };

  const handleStageDateChange = (wing, date) => {
    setStageDates((prev) => ({ ...prev, [wing]: date }));
    setErrors((prev) => ({ ...prev, [`date-${wing}`]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!percentage.trim()) newErrors.percentage = 'Percentage is required';
    if (selectedWings.length === 0) newErrors.wings = 'Select at least one wing';
    selectedWings.forEach((wing) => {
      if (!stageDates[wing]) newErrors[`date-${wing}`] = `Date for ${wing} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    if (selectedWings.length === 0) {
      toast.error('Please select at least one wing.');
      return;
    }
  
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No token found. Please log in again.');
        navigate('/login');
        return;
      }
  
      const payload = {
        projectStageName: title,
        projectStagePer: Number(percentage),
        projectId: 16, // Replace this with the actual projectId you want to include
        projectWingData: selectedWings.map((wing) => ({
          projectWingId: wing,
          status: 'In Progress', // Replace with dynamic status if needed
          projectCompletionDate: stageDates[wing] || sharedDate, // Ensure a date is provided
        })),
      };
  
      console.log('Submitting Payload:', payload);
  
      const response = await axios.post(addProjectStage, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.data.status) {
        toast.success(response.data.message || 'Project stage added successfully!');
        setTitle('');
        setPercentage('');
        setSelectedWings([]);
        setStageDates({});
        setTimeout(() => navigate(`/project-stage/{id}`), 1000);
      } else {
        toast.error(response.data.message || 'Failed to add project stage.');
      }
    } catch (error) {
      console.error('Error adding project stage:', error);
      toast.error('Error adding project stage. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleSelectAll = () => {
    if (selectedWings.length === wingOptions.length) {
      setSelectedWings([]);
      setSharedDate('');
    } else {
      setSelectedWings(wingOptions);
    }
  };
  const handleSharedDateChange = (date) => {
    setSharedDate(date);
    const updatedDates = {};
    selectedWings.forEach((wing) => {
      updatedDates[wing] = date;
    });
    setStageDates(updatedDates);
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
                    <h6>Add Project Stage</h6>
                    <Link to="/project-stage">
                      <h6>
                        <i className="bi bi-arrow-left-circle-fill"></i> Back
                      </h6>
                    </Link>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row pt-3">
                      <div className="col">
                        <input
                          type="text"
                          name="title"
                          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                          placeholder="Title"
                          value={title}
                          onChange={handleInputChange(setTitle)}
                        />
                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          name="percentage"
                          className={`form-control ${errors.percentage ? 'is-invalid' : ''}`}
                          placeholder="Percentage"
                          value={percentage}
                          onChange={handleInputChange(setPercentage)}
                        />
                        {errors.percentage && <div className="invalid-feedback">{errors.percentage}</div>}
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <label className="mb-2">Select Wings:</label>

                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            id="select-all"
                            className="form-check-input me-4"
                            checked={selectedWings.length === wingOptions.length}
                            onChange={handleSelectAll}
                          />
                          <label htmlFor="select-all" className="form-check-label">
                            Select All
                          </label>
                        </div>
                        {wingOptions.map((wing) => (
                          <div key={wing} className="form-check d-flex align-items-center">
                            <input
                              type="checkbox"
                              id={wing}
                              className="form-check-input me-4"
                              checked={selectedWings.includes(wing)}
                              onChange={() => handleCheckboxChange(wing)}
                            />
                            <label htmlFor={wing} className="form-check-label">
                              Wing {wing}
                            </label>
                          </div>
                        ))}
                        {selectedWings.length > 0 && (
                          <div className="mt-3">
                            <label htmlFor="shared-date" className="form-label">
                              Select Date for Wings:
                            </label>

                            <input
                              type="date"
                              id="shared-date"
                              className={`form-control ${errors.sharedDate ? 'is-invalid' : ''}`}
                              value={sharedDate}
                              onChange={(e) => handleSharedDateChange(e.target.value)}
                              style={{ maxWidth: '200px' }}
                            />
                            {errors.sharedDate && (
                              <div className="invalid-feedback">{errors.sharedDate}</div>
                            )}
                          </div>
                        )}

                        {errors.wings && <div className="text-danger">{errors.wings}</div>}
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
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
