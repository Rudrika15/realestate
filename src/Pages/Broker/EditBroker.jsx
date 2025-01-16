import React, { useRef, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Helmet } from 'react-helmet';
import Topbar from '../../Components/Topbar/Topbar';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function EditBroker() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [brokers, setBrokers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [brokerName, setBrokerName] = useState('');
    const [brokerMobileNumber, setBrokerMobileNumber] = useState('');
    const [brokerAddress, setBrokerAddress] = useState('');
    const [brokerNameError, setBrokerNameError] = useState('');
    const [brokerMobileNumberError, setBrokerMobileNumberError] = useState('');
    const [brokerAddressError, setBrokerAddressError] = useState('');
    const brokerNameRef = useRef();
    const brokerContactRef = useRef();
    const brokerAddressRef = useRef();

    return (
        <>
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
                                                <i className="bi bi-arrow-left-circle-fill"></i> Back                                            </h6>
                                        </Link>
                                    </div>
                                    <div className="row pt-4">
                                        <div className="col position-relative">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Name"
                                                ref={brokerNameRef}
                                                value={brokerName}
                                                onChange={(e) => setBrokerName(e.target.value)}
                                            />
                                            {brokerNameError && <p className="text-danger">{brokerNameError}</p>}
                                        </div>
                                        <div className="col position-relative"></div>
                                    </div>
                                    <div className="row pt-4">
                                        <div className="col position-relative">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="Mobile Number"
                                                placeholder="Mobile Number"
                                                ref={brokerContactRef}
                                                value={brokerMobileNumber}
                                                onChange={(e) => setBrokerMobileNumber(e.target.value)}
                                            />
                                            {brokerMobileNumberError && <p className="text-danger">{brokerMobileNumberError}</p>}
                                        </div>
                                        <div className="col position-relative"></div>
                                    </div>
                                    <div className="row pt-4 mb-3">
                                        <div className="col position-relative">
                                            <textarea
                                                className="form-control"
                                                placeholder="Address"
                                                ref={brokerAddressRef}
                                                value={brokerAddress}
                                                onChange={(e) => setBrokerAddress(e.target.value)}
                                            />
                                            {brokerAddressError && <p className="text-danger">{brokerAddressError}</p>}
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
                                            "Submit"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditBroker
