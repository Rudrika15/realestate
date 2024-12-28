import React, { useRef, useState } from "react";
import { Spinner, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passcodeRef = useRef(null);
  const loginButtonRef = useRef(null);

  // const handleLogin = async () => {
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
  const handleLogin = async (e) => {
    e.preventDefault();
    let isValid = true;


    if (!username) {
      setUsernameError(true);
      isValid = false;
    }else {
      setUsernameError(false);
    }

    if (!passcode) {
      setPasscodeError(true);
      isValid = false;
    } else {
      setPasscodeError(false);
    }

    if (isValid) {
      console.log("form submitted with:", { username, passcode });
      setUsername('');
      setPasscode('');
      setLoading(true);
      toast.success("Login Sucessfully!");
      setTimeout(() => {
        navigate("/view-user");
      }, 2000);
    }
  };

  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField?.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value) {
      setUsernameError(false);
    }
  };

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
    if (e.target.value) {
      setPasscodeError(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>React Estate | Login</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <div className="container-fluid">
          <div className="row min-vh-100 align-items-center justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <Link to="/">
                    <h3 className="text-primary">
                      <i className="fa fa-hashtag me-2"></i>React Estate
                    </h3>
                  </Link>
                  <h3>Login</h3>
                </div>
                <Form>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                      id="floatingInput"
                      placeholder="User Name"
                      value={username}
                      ref={usernameRef}
                      onChange={handleUsernameChange}
                      onKeyDown={(e) => handleEnter(e, passcodeRef)}
                    />
                    {usernameError && <div className="invalid-feedback">Enter a valid Username</div>}
                    <label htmlFor="floatingInput">UserName</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className={`form-control ${passcodeError ? 'is-invalid' : ''}`}
                      id="floatingPassword"
                      placeholder=""
                      value={passcode}
                      ref={passcodeRef}
                      onChange={handlePasscodeChange}
                      onKeyDown={(e) => handleEnter(e, loginButtonRef)}
                    />
                    {passcodeError && <div className="invalid-feedback">Enter a valid Passcode</div>}
                    <label htmlFor="floatingPassword">Passcode</label>
                  </div>
                  <Link to="/view-user"
                    type="button"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={handleLogin}
                    ref={loginButtonRef}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <Spinner animation="border" size="sm" />
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Link>
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
