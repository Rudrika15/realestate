import React, { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

function EditProjectStage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleTopbar = () => setIsTopbarOpen(!isTopbarOpen);
    const [title, setTitle] = useState('');
    const [percentage, setPercentage] = useState('');
    const [wing, setWing] = useState('');
    const [stageDate, setStageDate] = useState('');
    const [stageDate1, setStageDate1] = useState('');

    const [titleError, setTitleError] = useState('');
    const [percentageError, setPercentageError] = useState('');
    const [wingError, setWingError] = useState('');
    const [stageDateError, setStageDateError] = useState('');
    const [stageDateError1, setStageDateError1] = useState('');

    const [unitWings, setUnitWings] = useState([]);
    const navigate = useNavigate();

    const titleRef = useRef(null);
    const percentageRef = useRef(null);
    const wingRef = useRef(null);
    const stageDateRef1 = useRef(null);
    const stageDateRef = useRef(null);
    const submitRef = useRef(null);

    const handleAdd = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!stageDate.trim()) {
            setStageDateError(true);
            isValid = false;
        } else {
            setStageDateError(false);
        }

        if (!stageDate1.trim()) {
            setStageDateError1(true);
            isValid = false;
        } else {
            setStageDateError1(false);
        }

        if (!wing.trim()) {
            setWingError(true);
            isValid = false;
        } else {
            setWingError(false);
        }

        if (!percentage.trim()) {
            setPercentageError(true);
            isValid = false;
        } else {
            setPercentageError(false);
        }

        if (!title.trim()) {
            setTitleError(true);
            isValid = false;
        } else {
            setTitleError(false);
        }

        if (!isValid) return;
        setLoading(true);
    };

    const handleEnter = (e, nextField) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (nextField?.current) {
                nextField.current.focus();
            }
        }
    };

    const handleStageDateChange = (e) => {
        setStageDate(e.target.value);
        if (e.target.value) setStageDateError(false);
    };

    const handleStageDateChange1 = (e) => {
        setStageDate1(e.target.value);
        if (e.target.value) setStageDateError1(false);
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
                                        <h6>Edit Project Stage</h6>
                                        <Link to="">
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
                                                    placeholder="Percentage"
                                                    value={percentage}
                                                    onChange={handlePercentageChange}
                                                    ref={percentageRef}
                                                    onKeyDown={(e) => handleEnter(e, wingRef)}
                                                />
                                                {percentageError && <div className="invalid-feedback">Enter a Percentage</div>}
                                            </div>
                                        </div>
                                        <div className="row pt-4">
                                            <div className="col">
                                                <label>
                                                    <input type="checkbox" name="option1" value="Option 1" /> Wing A
                                                </label>
                                                {/* <select
                          className={`form-control bg-white ${wingError.wing ? "is-invalid" : ""}`}
                          value={wing}
                          ref={wingRef}
                          onChange={handleWingChange}
                          onKeyDown={(e) => handleEnter(e, stageDateRef)}
                        >
                          <option value="" disabled>Select Wing</option>
                          {unitWings && unitWings.length > 0 ? (
                            unitWings.map((unitWing, index) => (
                              <option key={index} value={unitWing}>
                                {unitWing}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>No wings available</option>
                          )}
                        </select> */}
                                                {/* {wingError && <div className="invalid-feedback">Select a Wing</div>} */}
                                            </div>
                                            <div className="col">
                                                <input
                                                    type="date"
                                                    className={`form-control ${stageDateError ? 'is-invalid' : ''}`}
                                                    value={stageDate}
                                                    onChange={handleStageDateChange}
                                                    ref={stageDateRef}
                                                    onKeyDown={(e) => handleEnter(e, submitRef)}
                                                />
                                                {stageDateError && <div className="invalid-feedback">Select a Stage Date</div>}
                                            </div>
                                        </div>
                                        <div className="row pt-4">
                                            <div className="col">
                                                <label>
                                                    <input type="checkbox" name="option1" value="Option 1" /> Wing B
                                                </label>
                                            </div>
                                            <div className="col">
                                                <input
                                                    type="date"
                                                    className={`form-control ${stageDateError1 ? 'is-invalid' : ''}`}
                                                    value={stageDate1}
                                                    onChange={handleStageDateChange1}
                                                    ref={stageDateRef1}
                                                    onKeyDown={(e) => handleEnter(e, submitRef)}
                                                />
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
            </div >
        </>
    )
}

export default EditProjectStage
