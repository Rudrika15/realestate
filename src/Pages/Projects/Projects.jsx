// src/Pages/Add/Add.js
import React, { useState,useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getUsers } from '../../Api/Api';
import axios from 'axios';
import Swal from 'sweetalert2';


const Projects = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [data, setData] = useState([ ].sort((a, b) => a.name.localeCompare(b.name)));
   
    const getData = async () => {
        try {
            const res = await axios.get(getUsers);
            if (res.data.status === true) {
                const sortedData = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
                setData(sortedData);
            } else {
                console.error('Error fetching data:', res.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    useEffect(() => {
        getData();
    }, [data]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTopbar = () => {
        setIsTopbarOpen(!isTopbarOpen);
    };

    const handleClick = () =>{
        Swal.fire({
            title: "Are you sure?",
            text: " It may affect projects as well. ",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }

    return (
        <>
            <Helmet>
                <title>React Estate | Projects</title>
            </Helmet>
            <div className="container-fluid position-relative bg-white d-flex p-0">
                <Sidebar isSidebarOpen={isSidebarOpen} />

                <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
                    <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

                    
                    <div className="container-fluid pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-12">
                                <div className="bg-light rounded h-100 p-4">
                                    <div className="d-flex justify-content-between   mb-3">
                                        <div className="p-2 ">
                                            <h6 className="mb-4">Projects</h6>
                                        </div>
                                        <div className="p-2">
                                            <Link to="/add-projects" className="">
                                                <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> New Project</h6>
                                            </Link>
                                        </div>
                                    </div>

                                    {data.length > 0 ? (
                                    <table className="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">Project Name</th>
                                                <th scope="col">Total Units</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                         
                                                <td></td>
                                                <td>
                                                    <Link to="/unit" className="btn btn-info btn-sm me-2">
                                                        <i className="fas fa-eye"></i>
                                                    </Link>
                                                    <Link to="/edit-unit" className="btn btn-warning btn-sm me-2">
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                                                                       
                                                    <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleClick}>
                                                    <i className="fas fa-trash"></i>
                                                    </button>

                                                  
                                                </td>
                                            </tr>
                                           
                                        </tbody>
                                    </table>
                                     ) : (
                                        <div className="text-center">
                                            <img src="img/nouserdata.png" alt="No Users" className="img-fluid w-25 h-25" />
                                            <p className="text-dark">No Users Found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
               
                    </div>
            </div>
        </>
    );
};

export default Projects;
