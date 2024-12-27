import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import Footer from '../../Components/Footer/Footer';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { getUsers } from '../../Api/Api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const View = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [data, setData] = useState([
        // { id: 1, name: 'Zlice Smith', email: 'Zlice@gmail.com'},
        // { id: 2, name: 'Bob Johnson', email: 'Bob@gmail.com'},
        // { id: 3, name: 'John Doe', email: 'John@gmail.com' },
        // { id: 4, name: 'Alice Smith', email: 'Alice@gmail.com'},
    ].sort((a, b) => a.name.localeCompare(b.name)));

    // const [loading, setLoading] = useState(true);
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

    const handleDelete = (id) => {
        Swal.fire({
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
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The user has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                });
            }
        });
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
                                                <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> New User</h6>
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
                                    {data.length > 0 ? (
                                        <table className="table table-bordered text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col">UserId</th>
                                                    <th scope="col">UserName</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data
                                                 .sort((a, b) => a.name.localeCompare(b.name))
                                                 .map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            <Link to="/edit-user" className="btn btn-warning btn-sm me-2">
                                                                <i className="fas fa-edit"></i>
                                                            </Link>
                                                            <Link onClick={() => handleDelete()} className="btn btn-danger btn-sm">
                                                                <i className="fas fa-trash"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
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
                                    ) : (
                                        <div className="text-center">
                                            <img src="img/image_2024_12_26T09_23_33_935Z.png" alt="No Users" className="img-fluid w-25 h-25" />
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

export default View;
