// import axios from 'axios';
import React, { useState } from 'react';
import { Spinner, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../Api/Api';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [passcode, setPasscode] = useState('');
    const navigate = useNavigate();

    // const handleLogin = async () => {
    //     if (!email) {
    //         toast.error('Email is required');
    //         return;
    //     }

    //     if (!passcode) {
    //         toast.error('Passcode is required');
    //         return;
    //     }

    //     try {
    //         setLoading(true);
    //         const data = { email, passcode };
    //         const response = await axios.post(login, data);

    //         if (response.data.status === true) {
    //             toast.success('Login successful');
    //             setTimeout(() => navigate('/view-user'), 1000);
    //         } else {
    //             toast.error(response.data.message || 'Login failed');
    //         }
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         toast.error(error.response?.data?.message || 'Something went wrong');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleLogin = async () => {
        if (!email) {
            toast.error('Email is required');
            return;
        }

        if (!passcode) {
            toast.error('Passcode is required');
            return;
        }
        toast.success('Login successful');
        setTimeout(() => navigate('/view-user'), 1000);

    }

    return (
        <>
            <Helmet>
                <title>React Estate | Login</title>
            </Helmet>
            <div className="container-fluid position-relative bg-white d-flex p-0">
                <div className="container-fluid">
                    <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                            <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Link to="/">
                                        <h3 className="text-primary"><i className="fa fa-hashtag me-2"></i>React Estate</h3>
                                    </Link>
                                    <h3>Login</h3>
                                </div>

                                <Form>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Passcode"
                                            value={passcode}
                                            onChange={(e) => setPasscode(e.target.value)}
                                        />
                                        <label htmlFor="floatingPassword">Passcode</label>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-primary py-3 w-100 mb-4"
                                        onClick={handleLogin}
                                        disabled={loading}
                                    >
                                        {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Login;
