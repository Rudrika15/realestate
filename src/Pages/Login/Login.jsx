import axios from "axios";
import React, { useRef, useState } from "react";
import { Spinner, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../Api/DevanshiApi";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passcodeRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!userName) {
      setUserNameError(true);
      isValid = false;
    } else {
      setUserNameError(false);
    }

    if (!passcode) {
      setPasscodeError(true);
      isValid = false;
    } else {
      setPasscodeError(false);
    }

    if (!isValid) return;
    setLoading(true);
    try {
      const data = { userName, passcode };
      const response = await axios.post(login, data);
      if (response.data.status === true) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("roles", JSON.stringify(response.data.roles));
        setTimeout(() => {
          navigate("/view-user");
        }, 1000);
        setUserName("");
        setPasscode("");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const handleEnter = (e, nextField) => {
    if (e.key === "Enter" && nextField?.current) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
    if (e.target.value) {
      setUserNameError(false);
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
                      <i className="fa fa-hashtag me-2"></i>Real Estate
                    </h3>
                  </Link>
                  <h3>Login</h3>
                </div>
                <Form onSubmit={handleLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${userNameError ? "is-invalid" : ""}`}
                      id="floatingInput"
                      placeholder="User Name"
                      value={userName}
                      ref={usernameRef}
                      onChange={handleUsernameChange}
                      onKeyDown={(e) => handleEnter(e, passcodeRef)}
                    />
                    {userNameError && (
                      <div className="invalid-feedback">Enter a valid Username</div>
                    )}
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className={`form-control ${passcodeError ? "is-invalid" : ""}`}
                      id="floatingPassword"
                      placeholder="Passcode"
                      value={passcode}
                      ref={passcodeRef}
                      onChange={handlePasscodeChange}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                    />
                    {passcodeError && (
                      <div className="invalid-feedback">Enter a valid Passcode</div>
                    )}
                    <label htmlFor="floatingPassword">Passcode</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Login"
                    )}
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
