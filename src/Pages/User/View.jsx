import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import Footer from '../../Components/Footer/Footer';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { getUsers } from '../../Api/Api';
import { Link } from 'react-router-dom';

const View = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const getData = async () => {
        try {
            // setLoading(true);
            const res = await axios.get(getUsers);
            console.log(res.data);

            if (res.data.status === true) {
                setData(res.data.data);
            } else {
                console.error('Error fetching data:', res.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        getData();
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
                <title>React Estate | User</title>
            </Helmet>
            <div className="container-fluid position-relative bg-white d-flex p-0">
                <Sidebar isSidebarOpen={isSidebarOpen} />

                <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
                    <Topbar toggleSidebar={toggleSidebar} isTopbarOpen={isTopbarOpen} toggleTopbar={toggleTopbar} />

                    <div className="container-fluid pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-12">
                                <div className="bg-light rounded h-100 p-4">
                                    <div class="d-flex justify-content-between mb-3">
                                        <div class="p-2 ">
                                            <h6 className="mb-4">User List</h6>
                                        </div>
                                        <div class="p-2 ">
                                            <Link to="/add-user" className="">
                                                <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> Add new user</h6>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                   ) : ( */}
                                    <table className="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">Username</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <Link to="/edit-user" className="btn btn-warning btn-sm me-2">
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <Link to="" className="btn btn-danger btn-sm">
                                                        <i className="fas fa-trash"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <Link to="/edit-user" className="btn btn-warning btn-sm me-2">
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <Link to="" className="btn btn-danger btn-sm">
                                                        <i className="fas fa-trash"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <Link to="/edit-user" className="btn btn-warning btn-sm me-2">
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <Link to="" className="btn btn-danger btn-sm">
                                                        <i className="fas fa-trash"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                            {/* {data.length > 0 ? (
                                                    data.map((user, index) => (
                                                        <tr key={user.id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.Role?.role_name || 'N/A'}</td>
                                                            <td>{user.status}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">
                                                            No users found.
                                                        </td>
                                                    </tr>
                                                )} */}
                                        </tbody>
                                    </table>
                                    {/* )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default View;
