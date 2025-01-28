import React from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

function Unauthorized() {


  return <>
  <Helmet>
        <title>ACSW | Unauthorized</title>
      </Helmet>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        <div className="container-fluid">
          <div className="row min-vh-100 align-items-center justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <Link to="/dashboard">
                    <h3 className="text-primary">
                      <h4>You are not allowed to access this page</h4>
                      <i className="fa fa-hashtag me-2"></i>Back
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>;
}

export default Unauthorized;
