import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import Footer from '../../Components/Footer/Footer';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const View = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleEdit = (user) => {
        navigate('/edit-user');
    };

    const handleDelete = (userId) => {
        Swal.fire({
            title: 'Are You Sure You Want to Delete?',
            text: 'Once you delete, all the data related to this user will be deleted.',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#c4c4c4',
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedUsers = users.filter((user) => user.id !== userId);
                setUsers(updatedUsers);
                localStorage.setItem('usersData', JSON.stringify(updatedUsers));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The user has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                });
            }
        });
    };

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
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="p-2">
                                            <h6 className="mb-4">User List</h6>
                                        </div>
                                        <div className="p-2">
                                            <Link to="/add-user" className="">
                                                <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> New User</h6>
                                            </Link>
                                        </div>
                                    </div>
                                    {users.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">UserId</th>
                                                        <th scope="col" className="w-50">UserName</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map((user) => (
                                                        <tr key={user.id}>
                                                            <td>{user.id}</td>
                                                            <td>{user.name}</td>
                                                            <td>
                                                                <Link to="/edit-user" onClick={() => handleEdit(user.id)} className="btn btn-warning btn-sm me-2">
                                                                    <i className="fas fa-edit"></i>
                                                                </Link>
                                                                <Link onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">
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
