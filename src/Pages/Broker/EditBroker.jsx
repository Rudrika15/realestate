import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Helmet } from 'react-helmet';
import Topbar from '../../Components/Topbar/Topbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { singleUpdateBroker, updateBroker } from '../../Api/DevanshiApi';
import { toast, ToastContainer } from 'react-toastify';

function EditBroker() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [brokerName, setBrokerName] = useState('');
    const [brokerMobileNumber, setBrokerMobileNumber] = useState('');
    const [brokerAddress, setBrokerAddress] = useState('');
    const [brokerNameError, setBrokerNameError] = useState('');
    const [brokerMobileNumberError, setBrokerMobileNumberError] = useState('');
    const [brokerAddressError, setBrokerAddressError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch broker details on component mount or when ID changes
    const fetchBrokerDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Token is missing. Please log in again.');
                setLoading(false);
                return;
            }

            const response = await axios.get(`${singleUpdateBroker}${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.status) {
                const { brokerName, brokerMobileNumber, brokerAddress } = response.data.data;
                setBrokerName(brokerName || '');
                setBrokerMobileNumber(brokerMobileNumber || '');
                setBrokerAddress(brokerAddress || '');
            } else {
                toast.error(response?.data?.message || 'Failed to fetch broker details.');
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            toast.error('An error occurred while fetching broker details.');
        }
    };

    useEffect(() => {
        fetchBrokerDetails();
    }, [id]); // Only re-fetch when the ID changes

    // Form validation
    const handleValidation = () => {
        let isValid = true;

        if (!brokerName.trim()) {
            setBrokerNameError('Name is required');
            isValid = false;
        } else {
            setBrokerNameError('');
        }

        if (!brokerMobileNumber.trim()) {
            setBrokerMobileNumberError('Mobile Number is required');
            isValid = false;
        } else if (!/^\d{10}$/.test(brokerMobileNumber)) {
            setBrokerMobileNumberError('Enter a valid 10-digit mobile number');
            isValid = false;
        } else {
            setBrokerMobileNumberError('');
        }

        if (!brokerAddress.trim()) {
            setBrokerAddressError('Address is required');
            isValid = false;
        } else {
            setBrokerAddressError('');
        }

        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleValidation()) return;

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Token is missing. Please log in again.');
                setLoading(false);
                return;
            }

            const response = await axios.post(`${updateBroker}/${id}`,
                {
                    brokerName,
                    brokerMobileNumber,
                    brokerAddress,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.status === true) {
                toast.success(response.data.message || 'Broker updated successfully');
                setTimeout(() => {
                    navigate("/broker");
                }, 1000);
            } else {
                toast.error(response?.data?.message || 'Failed to update broker.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while updating broker details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Edit Broker</title>
            </Helmet>
            <div className="container-fluid position-relative bg-white d-flex p-0">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
                    <Topbar
                        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                        isTopbarOpen={isTopbarOpen}
                        toggleTopbar={() => setIsTopbarOpen(!isTopbarOpen)}
                    />
                    <div className="container-fluid pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-12">
                                <div className="bg-light rounded h-100 p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h6 className="mb-4">Edit Broker</h6>
                                        <Link to="/broker" className="mb-4">
                                            <h6>
                                                <i className="bi bi-arrow-left-circle-fill"></i> Back
                                            </h6>
                                        </Link>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={brokerName}
                                                    onChange={(e) => setBrokerName(e.target.value)}
                                                    placeholder="Enter broker name"
                                                />
                                                {brokerNameError && (
                                                    <small className="text-danger">{brokerNameError}</small>
                                                )}
                                            </div>
                                            <div className="col"></div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={brokerMobileNumber}
                                                    onChange={(e) => setBrokerMobileNumber(e.target.value)}
                                                    placeholder="Enter broker mobile number"
                                                />
                                                {brokerMobileNumberError && (
                                                    <small className="text-danger">{brokerMobileNumberError}</small>
                                                )}
                                            </div>
                                            <div className="col"></div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <textarea
                                                    className="form-control"
                                                    value={brokerAddress}
                                                    onChange={(e) => setBrokerAddress(e.target.value)}
                                                    placeholder="Enter broker address"
                                                />
                                                {brokerAddressError && (
                                                    <small className="text-danger">{brokerAddressError}</small>
                                                )}
                                            </div>
                                            <div className="col"></div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
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
            <ToastContainer />
        </>
    );
}

export default EditBroker;
