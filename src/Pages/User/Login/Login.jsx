import React, { useState } from 'react';
import { Spinner, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email) {
            toast.error('Email is required');
            return;
        }

        if (!password) {
            toast.error('Password is required');
            return;
        }

        setError('');
        setLoading(true);
        toast.success('Login successful');

        setTimeout(() => {
            setLoading(false);
            navigate('/add-user');
        }, 2000);
    };

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
                                    <a href="index.html">
                                        <h3 className="text-primary"><i className="fa fa-hashtag me-2"></i>React Estate</h3>
                                    </a>
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
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label htmlFor="floatingPassword">Password</label>
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

            {/* Toast Container */}
            <ToastContainer />
        </>
    );
};

export default Login;
