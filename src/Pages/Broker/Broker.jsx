import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addBroker, deleteBroker, getBroker } from '../../Api/DevanshiApi';
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';

function Broker() {
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
    const [modalType, setModalType] = useState('Add');

    const brokerNameRef = useRef();
    const brokerContactRef = useRef();
    const brokerAddressRef = useRef();
    const modalSubmitRef = useRef();

    const fetchBroker = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${getBroker}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response?.data?.status === true) {
                setBrokers(response.data.data);
            } else {
                toast.error('Failed to fetch Broker data!');
            }
        } catch (error) {
            console.error('Error fetching broker:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are You Sure You Want to Delete?',
            text: 'Once you delete, all the data related to this user will be deleted.',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#c4c4c4',
            customClass: {
                title: 'swal-title',
                text: 'swal-text',
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn',
            },
        });

        if (confirmDelete.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`${deleteBroker}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.status === true) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The user has been deleted.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    });
                    setBrokers(brokers.filter((item) => item.id !== id));
                } else {
                    toast.error('Failed to delete user!');
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                toast.error('An error occurred while deleting the user!');
            }
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setBrokerName("");
        setBrokerMobileNumber("");
        setBrokerAddress("");
        setBrokerNameError('');
        setBrokerMobileNumberError('');
        setBrokerAddressError('');
    };

    const storeBroker = async (e) => {
        e.preventDefault();
        let isValid = true;

        // Validation
        if (!brokerName) {
            setBrokerNameError("Broker name is required!");
            isValid = false;
        } else {
            setBrokerNameError('');
        }

        if (!brokerAddress) {
            setBrokerAddressError("Broker address is required!");
            isValid = false;
        } else {
            setBrokerAddressError('');
        }

        if (!brokerMobileNumber) {
            setBrokerMobileNumberError("Broker mobile number is required!");
            isValid = false;
        } else {
            setBrokerMobileNumberError('');
        }

        if (!isValid) return;

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                addBroker,
                {
                    brokerName,
                    brokerMobileNumber,
                    brokerAddress
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const result = response.data;
            if (result.status) {
                setBrokers((prevBrokers) => [
                    ...prevBrokers,
                    {
                        id: result.data.id,
                        brokerName: result.data.brokerName,
                        brokerAddress: result.data.brokerAddress,
                        brokerMobileNumber: result.data.brokerMobileNumber,
                    },
                ]);
                handleCloseModal();
            } else {
                console.error(result.message);
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error adding broker:', error);
            toast.error('Error adding broker!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBroker();
    }, []);

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
                                        <h6 className="mb-4">Broker List</h6>
                                        <Link onClick={toggleModal} className="">
                                            <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> New Broker</h6>
                                        </Link>
                                    </div>
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status"></div>
                                        </div>
                                    ) : brokers.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">UserId</th>
                                                        <th scope="col">UserName</th>
                                                        <th scope="col">Address</th>
                                                        <th scope="col">Mobile No</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {brokers.map((broker) => (
                                                        <tr key={broker.id}>
                                                            <td>{broker.id}</td>
                                                            <td>{broker.brokerName}</td>
                                                            <td>{broker.brokerAddress}</td>
                                                            <td>{broker.brokerMobileNumber}</td>
                                                            <td>
                                                                <Link to={`/edit-broker/${broker.id}`} className="btn btn-warning btn-sm me-2">
                                                                    <i className="fas fa-edit"></i>
                                                                </Link>
                                                                <Link to="" onClick={() => handleDelete(broker.id)} className="btn btn-danger btn-sm">
                                                                    <i className="fas fa-trash"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <img
                                                src="img/image_2024_12_26T09_23_33_935Z.png"
                                                alt="No Brokers"
                                                className="img-fluid w-25 h-25"
                                            />
                                            <p className="text-dark">No Brokers Found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <Modal show={isModalOpen} onHide={handleCloseModal} dialogClassName="custom-modal">
                        <Modal.Header closeButton className="d-flex justify-content-center">
                            <Modal.Title className="w-100 text-center">{modalType} Broker</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
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
                            </div>
                            <div className="row pt-4">
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
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-secondary w-25"
                                onClick={storeBroker}
                                ref={modalSubmitRef}
                            >
                                Submit
                            </button>
                        </Modal.Footer>
                    </Modal>
                )}
                <ToastContainer />
            </div>
        </>
    );
}

export default Broker;
