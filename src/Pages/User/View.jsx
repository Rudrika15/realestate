import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';
import { deleteUsers, getUsers } from '../../Api/DevanshiApi';

const View = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopbarOpen, setIsTopbarOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${getUsers}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status == true) {
                setUsers(response.data.data); 
                setTotalPages(response.data.pagination.totalPages);
                setCurrentPage(page);
            } else {
                toast.error('Failed to fetch user data!');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            fetchUsers(page);
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
                const response = await axios.delete(`${deleteUsers}/${id}`, {
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
                    setUsers(users.filter((item) => item.id !== id));
                } else {
                    toast.error('Failed to delete user!');
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                toast.error('An error occurred while deleting the user!');
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Helmet>
                <title>React Estate | User</title>
            </Helmet>
            <div className="container-fluid position-relative bg-white d-flex p-0">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
                    <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isTopbarOpen={isTopbarOpen} toggleTopbar={() => setIsTopbarOpen(!isTopbarOpen)} />
                    <div className="container-fluid pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-12">
                                <div className="bg-light rounded h-100 p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h6 className="mb-4">User List</h6>
                                        <Link to="/add-user" className="">
                                            <h6 className="mb-4"><i className="bi bi-plus-circle-fill"></i> New User</h6>
                                        </Link>
                                    </div>
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                            </div>
                                        </div>
                                    ) : users.length > 0 ? (
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
                                                            <td>{user.userName}</td>
                                                            <td>
                                                                <Link to={`/edit-user`} className="btn btn-warning btn-sm me-2">
                                                                    <i className="fas fa-edit"></i>
                                                                </Link>
                                                                <Link to="" onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">
                                                                    <i className="fas fa-trash"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination justify-content-end">
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo; Previous</button>
                                                    </li>
                                                    {Array.from({ length: totalPages }, (_, i) => (
                                                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next &raquo;</button>
                                                    </li>
                                                </ul>
                                            </nav>
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
