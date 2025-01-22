import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { getProjectWing, getSingleProjectStage, updateProjectStage } from '../../Api/DevanshiApi';

function EditProjectStage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [percentage, setPercentage] = useState('');
    const [wing, setWing] = useState('');
    const [wingOptions, setWingOptions] = useState([]);

    const [titleError, setTitleError] = useState('');
    const [percentageError, setPercentageError] = useState('');
    const [wingError, setWingError] = useState('');
    const [errors, setErrors] = useState({});
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);

    const [selectedWings, setSelectedWings] = useState([]);
    const [sharedDate, setSharedDate] = useState('');
    const { id } = useParams();

    const navigate = useNavigate();
    const [stageDates, setStageDates] = useState({});

    const titleRef = useRef(null);
    const percentageRef = useRef(null);
    const wingRef = useRef(null);
    const submitRef = useRef(null);

    const handleEnter = (e, nextField) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextField?.current) {
                nextField.current.focus();
            }
        }
    };

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

    const fetchProjectStage = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('No token found. Please log in again.');
                navigate('/login');
                return;
            }

            const response = await axios.get(`${getSingleProjectStage}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.status) {
                const stageData = response.data.data;
                setTitle(stageData.projectStageName || '');
                setPercentage(stageData.projectStagePer?.toString() || '');
                setWing(stageData.Project?.projectName || '');
            } else {
                toast.error(response.data.message || 'Failed to fetch project stage details.');
            }
        } catch (error) {
            console.error('Error fetching project stage details:', error);
            toast.error('Error fetching project stage details.');
        }
    };

    useEffect(() => {
        fetchWing();
        fetchProjectStage(id);
    }, [navigate]);


    const handleSelectAll = () => {
        if (selectedWings.length === wingOptions.length) {
            setSelectedWings([]);
            setSharedDate('');
        } else {
            setSelectedWings(wingOptions);
        }
    };

    const handleCheckboxChange = (wing) => {
        if (selectedWings.includes(wing)) {
            setSelectedWings(selectedWings.filter((w) => w !== wing));
        } else {
            setSelectedWings([...selectedWings, wing]);
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

    const handleWingChange = (e) => {
        setWing(e.target.value);
        if (e.target.value) setWingError(false);
    };

    const handlePercentageChange = (e) => {
        setPercentage(e.target.value);
        if (e.target.value) setPercentageError(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (e.target.value) setTitleError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!percentage || isNaN(percentage)) {
            toast.error('Percentage is required and must be a valid number.');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Token is missing. Please log in again.');
                setLoading(false);
                return;
            }

            const payload = {
                projectStageName: title,
                projectStagePer: percentage,
                projectId: id,
                projectWingData: selectedWings.map((wing) => ({
                    projectWingId: wing,
                    status: 'In Progress',
                    projectCompletionDate: stageDates[wing] || sharedDate,
                })),
            };

            console.log('Payload:', payload);

            const response = await axios.post(`${updateProjectStage}/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === true) {
                toast.success(response.data.message || 'Project Stage updated successfully');
                setTimeout(() => navigate(`/project-stage/${id}`), 1000);
                console.log(response.data.message || 'Project Stage updated successfully');
            } else {
                toast.error(response?.data?.message || 'Failed to update Project Stage.');
            }
        } catch (error) {
            console.error(error);
            if (error.response?.status === 500 && error.response?.data?.status === true) {
                toast.success(error.response.data.message || 'Project Stage updated successfully');
                setTimeout(() => navigate(`/project-stage/${id}`), 1000);
            } else {
                if (error.response && error.response.status === 401) {
                    navigate('/');
                }
                toast.error('An error occurred while updating Project Stage details.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Helmet>
                <title>React Estate | Edit Project Stage</title>
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
                                        <h6>Edit Project Stage</h6>
                                        <Link to={`/project-stage/${id}`}>
                                            <h6>
                                                <i className="bi bi-arrow-left-circle-fill"></i> Back
                                            </h6>
                                        </Link>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className={`form-control ${titleError ? 'is-invalid' : ''}`}
                                                    value={title}
                                                    onChange={handleTitleChange}
                                                    onKeyDown={(e) => handleEnter(e, percentageRef)}
                                                    ref={titleRef}
                                                />
                                                {titleError && <div className="invalid-feedback">Enter a Title</div>}
                                            </div>
                                            <div className="col">
                                                <input
                                                    type="number"
                                                    className={`form-control ${percentageError ? 'is-invalid' : ''}`}
                                                    value={percentage}
                                                    onChange={handlePercentageChange}
                                                    ref={percentageRef}
                                                    onKeyDown={(e) => handleEnter(e, wingRef)}
                                                />
                                                {percentageError && <div className="invalid-feedback">Enter a Percentage</div>}
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col">
                                                <label className="mb-2">Select Wings:</label>
                                                <div className="d-flex align-items-center">
                                                    <div className="form-check me-4">
                                                        <input
                                                            type="checkbox"
                                                            id="select-all"
                                                            className="form-check-input me-2"
                                                            checked={selectedWings.length === wingOptions.length}
                                                            onChange={handleSelectAll}
                                                        />
                                                        <label htmlFor="select-all" className="form-check-label">
                                                            Select All
                                                        </label>
                                                    </div>
                                                    {selectedWings.length > 0 && (
                                                        <div className="d-flex flex-column align-items-start">
                                                            <input
                                                                type="date"
                                                                id="shared-date"
                                                                className={`form-control ${errors.sharedDate ? 'is-invalid' : ''}`}
                                                                value={sharedDate}
                                                                onChange={(e) => handleSharedDateChange(e.target.value)}
                                                            />
                                                            {errors.sharedDate && (
                                                                <div className="invalid-feedback">{errors.sharedDate}</div>
                                                            )}
                                                        </div>
                                                    )}
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

export default EditProjectStage;
