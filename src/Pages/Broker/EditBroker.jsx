import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Helmet } from 'react-helmet';
import Topbar from '../../Components/Topbar/Topbar';
import { Link, useParams } from 'react-router-dom';
import { Spinner, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import { singleUpdateBroker, updateBroker } from '../../Api/DevanshiApi';
import { toast } from 'react-toastify';

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
    const [broker, setBroker] = useState({}); // Change here

    const fetchBrokerDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Token is missing. Please log in again.');
                setLoading(false);
                return;
            }
            const response = await axios.get(singleUpdateBroker, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.datastatus === true) {
                const brokerData = response.data.data.data;
                setBroker({
                    id: brokerData.id,
                    brokerName: brokerData.brokerName || '',
                    brokerAddress: brokerData.brokerAddress || '',
                    brokerMobileNumber: brokerData.brokerMobileNumber || '',
                });
                setBrokerName(brokerData.brokerName || '');
                setBrokerMobileNumber(brokerData.brokerMobileNumber || '');
                setBrokerAddress(brokerData.brokerAddress || '');
                toast.success('Broker data fetched successfully!');
            } else {
                toast.error(response?.data?.message || 'Failed to fetch broker details.');
            }
        } catch (error) {
            console.error('Error fetching broker details:', error);
            if (error.response) {
                if (error.response.status === 404) {
                    toast.error('Broker not found.');
                } else if (error.response.status === 401) {
                    toast.error('Unauthorized access. Please log in again.');
                } else {
                    toast.error(`Error: ${error.response.status}`);
                }
            } else {
                toast.error('An error occurred while fetching broker details.');
            }
        }
    };

    useEffect(() => {
        fetchBrokerDetails();
    }, [id]);

    const handleBrokerMobileNumberChange = (e) => {
        setBrokerMobileNumber(e.target.value);
        if (e.target.value) {
            setBrokerMobileNumberError(false);
        }
    };

    const handleBrokerAddressChange = (e) => {
        setBrokerAddress(e.target.value);
        if (e.target.value) {
            setBrokerAddressError(false);
        }
    };

    const handlebrokerNameChange = (e) => {
        setBrokerName(e.target.value);
        if (e.target.value) {
            setBrokerNameError(false);
        }
    };

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

    return (
        <>
            <ToastContainer />
            <Helmet>
                <title>React Estate | Brokers</title>
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
                                    <form onSubmit={handleValidation}>
                                        <input type="text" value={id} />
                                        <div className="row pt-4">
                                            <div className="col position-relative">
                                                <input key={id}
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    value={brokerName}
                                                    placeholder={brokerName}
                                                    onChange={handlebrokerNameChange}
                                                />
                                                {brokerNameError && (
                                                    <p className="text-danger">{brokerNameError}</p>
                                                )}
                                            </div>
                                            <div className="col position-relative"></div>
                                        </div>
                                        <div className="row pt-4">
                                            <div className="col position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="mobile-number"
                                                    value={brokerMobileNumber}
                                                    placeholder={brokerMobileNumber}
                                                    onChange={handleBrokerMobileNumberChange}
                                                />
                                                {brokerMobileNumberError && (
                                                    <p className="text-danger">
                                                        {brokerMobileNumberError}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="col position-relative"></div>
                                        </div>
                                        <div className="row pt-4 mb-3">
                                            <div className="col position-relative">
                                                <textarea
                                                    className="form-control"
                                                    value={brokerAddress}
                                                    placeholder={brokerAddress}
                                                    onChange={handleBrokerAddressChange}
                                                />
                                                {brokerAddressError && (
                                                    <p className="text-danger">{brokerAddressError}</p>
                                                )}
                                            </div>
                                            <div className="col position-relative"></div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                'Submit'
                                            )}
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

export default EditBroker;
