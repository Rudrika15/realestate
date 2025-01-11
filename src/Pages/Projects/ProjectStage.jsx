import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getProjectStage } from '../../Api/DevanshiApi';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';

function ProjectStage() {
    // const staticData = [
    //     { id: 1, Title: "Shiv", Percentage: "10%", wing: "A", stagedate: "25-12-2024" },
    // ];

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [projectStage, setProjectStage] = useState([]);

    // const [data, setData] = useState(
    //     staticData.sort((a, b) => a.Title.localeCompare(b.Title))
    // );

    const fetchProjectStage = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            
            const response = await axios.get(`${getProjectStage}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },                
            });
            if (response.data.status === true) {
                setProjectStage(response.data.data);
            } else {
                toast.error('Failed to fetch project stages!');
            }
        } catch (error) {
            console.error('Error fetching project stages:', error);
            toast.error('Error fetching project stages!');
        } finally {
            setLoading(false);
        }
    };    

    useEffect(() => {
        fetchProjectStage();
    }, []);

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

                <div className={`content ${isSidebarOpen ? "open" : ""}`}>
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
                                            <h6 className="mb-4">Project Stage List</h6>
                                        </div>
                                        <div className="p-2">
                                            <Link to="/add-project-stage">
                                                <h6 className="mb-4">
                                                    <i className="bi bi-plus-circle-fill"></i> New Project Stage
                                                </h6>
                                            </Link>
                                        </div>
                                    </div>

                                    {loading ? (
                                        <div className="text-center">
                                            <div
                                                className="spinner-border text-primary"
                                                role="status"
                                                aria-label="Loading"
                                            >
                                                <span className="visually-hidden"></span>
                                            </div>
                                        </div>
                                    ) : projectStage.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">StageId</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Percentage</th>
                                                        <th scope="col">Wing</th>
                                                        <th scope="col">Stage Date</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {projectStage.map((projectStages) => (
                                                        <tr key={projectStages.id}>
                                                            <td>{projectStages.id}</td>
                                                            <td>{projectStages.projectStageName}</td>
                                                            <td>{projectStages.projectStagePer}</td>
                                                            <td>{projectStages.projectWingId}</td>
                                                            <td>{projectStages.projectCompletionDate}</td>
                                                            <td>
                                                                <Link to="" className="btn btn-warning btn-sm me-2">
                                                                    <i className="fas fa-edit"></i>
                                                                </Link>
                                                                <Link to="" className="btn btn-danger btn-sm">
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
                                                alt="No Users"
                                                className="img-fluid w-25 h-25"
                                            />
                                            <p className="text-dark">No Project Stage Found</p>
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
