import React, { useEffect, useState, } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getProjectStage, getSingleProjectStage } from '../../Api/DevanshiApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProjectStage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectStage, setProjectStage] = useState([]);
    const { id } = useParams();
    const  navigate = useNavigate


    const fetchProjectStage = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authorization token is missing.');
                return;
            }

            const response = await axios.get(`${getProjectStage}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status) {
                const fetchedData = response.data.data;
                setProjectStage(Array.isArray(fetchedData) ? fetchedData : [fetchedData]);
            } else {
                // toast.error(response.data.message || 'Failed to fetch project stages!');
                setProjectStage([]);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching project stages!');
            
        if (error.response && error.response.status === 401) {
            navigate('/'); 
        }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProjectStage();
        } else {
            toast.error('Invalid project ID.');
            setProjectStage([]);
        }
    }, [id]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTopbar = () => {
        setIsTopbarOpen(!isTopbarOpen);
    };

    return (
        <>
            <Helmet>
                <title>React Estate | Project Stage</title>
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
                                        <h6 className="mb-4">Project Stage List</h6>
                                        <Link to={`/add-project-stage/${id}`} className="">
                                            <h6 className="mb-4">
                                                <i className="bi bi-plus-circle-fill"></i> New Project Stage
                                            </h6>
                                        </Link>
                                    </div>

                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : projectStage.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Stage ID</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Percentage</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {projectStage.map((stage) => (
                                                        <tr key={stage?.id || Math.random()}>
                                                            <td>{stage?.id || 'N/A'}</td>
                                                            <td>{stage?.projectStageName || 'N/A'}</td>
                                                            <td>{stage?.projectStagePer || 0}%</td>
                                                            <td>
                                                                <Link
                                                                    to={`/edit-projectstage/${stage?.id}`}
                                                                    className={`btn btn-warning btn-sm me-2 ${!stage?.id ? 'disabled' : ''}`}
                                                                >
                                                                    <i className="fas fa-edit"></i>
                                                                </Link>
                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <img
                                                src="/img/image_2024_12_26T09_23_33_935Z.png"
                                                alt="No Project Stages"
                                                className="img-fluid w-25 h-25"
                                            />
                                            <p className="text-dark">No Project Stages Found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default ProjectStage;
