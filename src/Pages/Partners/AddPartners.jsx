import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddPartners() {
  const [name1, setName1] = useState('');
  const [percentage1, setPercentage1] = useState('');
  const [name2, setName2] = useState('');
  const [percentage2, setPercentage2] = useState('');
  const [name3, setName3] = useState('');
  const [percentage3, setPercentage3] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name1 || !percentage1 || !name2 || !percentage2 || !name3 || !percentage3) {
      toast.error("All Fields Enter!");
      return;
    }

     if (!/^[A-Za-z ]+$/.test(name1 && name2 && name3)) {
          toast.error("Name Can Only  letters And Spaces");
          return;
        }
    
    if (isNaN(percentage1) || isNaN(percentage2) || isNaN(percentage3)) {
      toast.error("Percentage Must Be a Valid Number!");
      return;
    }

    if (parseFloat(percentage1) < 0 || parseFloat(percentage1) > 100 ||
        parseFloat(percentage2) < 0 || parseFloat(percentage2) > 100 ||
        parseFloat(percentage3) < 0 || parseFloat(percentage3) > 100) {
      toast.error("Percentage Must Be Between 0 And 100!");
      return ;
    }
    else{
    toast.success(" Successfully");
    }


  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <Topbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-12">
              <div className="bg-light rounded h-100 p-4">
                <div className="row justify-content-center mx-0">
                  <div className="col-lg-10 col-md-12">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="p-2">
                        <h4>Add Partners</h4>
                      </div>
                      <div className="p-2">
                        <Link to="/Partners" className="btn">
                          <i className="bi bi-arrow-left-circle-fill"></i>
                          &nbsp; Back
                        </Link>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col">
                          <select className="form-select form-select-sm mb-4 w-50" aria-label=".form-select-sm example">
                            <option selected>Select Project</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            id="name1"
                            placeholder="Name"
                            value={name1}
                            onChange={(e) => setName1(e.target.value)}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            id="percentage1"
                            placeholder="Percentage"
                            value={percentage1}
                            onChange={(e) => setPercentage1(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            id="name2"
                            placeholder="Name"
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            id="percentage2"
                            placeholder="Percentage"
                            value={percentage2}
                            onChange={(e) => setPercentage2(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            id="name3"
                            placeholder="Name"
                            value={name3}
                            onChange={(e) => setName3(e.target.value)}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            id="percentage3"
                            placeholder="Percentage"
                            value={percentage3}
                            onChange={(e) => setPercentage3(e.target.value)}
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AddPartners;
