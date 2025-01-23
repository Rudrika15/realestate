import React from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./Pages/Login/Login";
import Projects from "./Pages/Projects/Projects";
import AddProjects from "./Pages/Projects/AddProjects";
import Partners from "./Pages/Partners/Partners";
import AddPartners from "./Pages/Partners/AddPartners";
import Expenses from "./Pages/Expenses/Expenses";
import AddExpenses from "./Pages/Expenses/AddExpenses";
import Report from "./Pages/Report/Report";
import BookingAuthorization from "./Pages/Approval/BookingAuthorization";
import CashDeposit from "./Pages/Approval/CashDeposit";
import ChequeDeposit from "./Pages/Approval/ChequeDeposit";
import Booking from "./Pages/Booking/Booking";
import CancelledBooking from "./Pages/Booking/CancelledBooking";
import ViewBooking from "./Pages/Booking/ViewBooking";
import AddCustomerIncome from "./Pages/Ledger/AddCustomerIncome";
import AddPartnerIncome from "./Pages/Ledger/AddPartnerIncome";
import Unit from "./Pages/Projects/Unit";
import EditUnit from "./Pages/Projects/EditUnit";
import AddPartnerReimbursment from "./Pages/Ledger/AddPartnerReimbursment";
import PartnerIncome from "./Pages/Ledger/PartnerIncome";
import CustomerIncome from "./Pages/Ledger/CustomerIncome";
import PartnerReimbursement from "./Pages/Ledger/PartnerReimbursement";
import ViewCancelledBooking from "./Pages/Booking/ViewCancelledBooking";
import Role from "./Pages/Role/Role";
import AddRole from "./Pages/Role/AddRole";
import Permission from "./Pages/Permission/Permission";
import EditRole from "./Pages/Role/EditRole";
import AddUser from "./Pages/User/AddUser";
import EditUser from "./Pages/User/EditUser";
import View from "./Pages/User/View";
import EditPartners from "./Pages/Partners/EditPartners";
import EditExpenses from "./Pages/Expenses/EditExpenses";
import Income from "./Pages/Income/Income";
import AddIncome from "./Pages/Income/AddIncome";
import EditIncome from "./Pages/Income/EditIncome";
import EditProjects from "./Pages/Projects/EditProjects";
import ProjectStage from "./Pages/Projects/ProjectStage";
import AddProjectStage from "./Pages/Projects/AddProjectStage";
import Broker from "./Pages/Broker/Broker";
import EditBroker from "./Pages/Broker/EditBroker";
import Modal from "./Components/Modal/Modal";
import AddNewPermission from "./Pages/Permission/AddNewPermission";
import EditProjectStage from "./Pages/Projects/EditProjectStage";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";

import { rolesWisePermissions } from "./Api/ApiDipak";
const App = () => {
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fetchPermissions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(rolesWisePermissions, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setPermissions(response.data.data.map((perm) => perm.name));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const hasPermission = (requiredPermissions) => {
    return requiredPermissions.every((perm) => permissions.includes(perm));
  };
  console.log(hasPermission);

  const ProtectedRoute = ({ requiredPermissions, children }) => {
    if (isLoading) return <div>Loading...</div>;

    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return hasPermission(requiredPermissions) ? (
      children
    ) : (
      <Navigate to="/unauthorized" replace />
    );
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/view-user" element={<View />}></Route>
          <Route path="/edit-user" element={<EditUser />}></Route>
          <Route path="/add-user" element={<AddUser />}></Route>
          <Route path="/role" element={<Role />}></Route>
          <Route path="/add-role" element={<AddRole />}></Route>
          <Route path="/edit-role" element={<EditRole />}></Route>
          <Route path="/project-stage/:id" element={<ProjectStage />} />
          <Route
            path="/add-project-stage"
            element={<AddProjectStage />}
          ></Route>
          <Route
            path="/booking-authorization"
            element={<BookingAuthorization />}
          ></Route>
          <Route path="/cash-deposit" element={<CashDeposit />}></Route>
          <Route path="/cheque-deposit" element={<ChequeDeposit />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          {/* <Route path="/modal" element={<Modal />}></Route> */}
          <Route
            path="/cancelled-booking"
            element={<CancelledBooking />}
          ></Route>
          <Route path="/broker" element={<Broker />}></Route>
          <Route path="/edit-broker/:id" element={<EditBroker />} />
          <Route path="/edit-projectstage" element={<EditProjectStage />} />
          <Route path="/view-booking" element={<ViewBooking />}></Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/permission" element={<Permission />} />
          <Route path="/addnewpermission" element={<AddNewPermission />} />
          <Route path="/add-projects" element={<AddProjects />} />
          <Route path="/edit-projects" element={<EditProjects />} />
          <Route path="/unit/:id" element={<Unit />} />
          <Route path="/edit-unit" element={<EditUnit />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {hasPermission(["view-partner"]) && (
            <Route path="/partners" element={<Partners />} />
          )}
          {hasPermission(["Add-partner"]) && (
            <Route path="/add-partners" element={<AddPartners />} />
          )}
          {hasPermission(["edit-partner"]) && (
            <Route path="/edit-partners/:id" element={<EditPartners />} />
          )}

          <Route path="/expenses" element={<Expenses />} />
          <Route path="/add-expenses" element={<AddExpenses />} />
          <Route path="/edit-expenses" element={<EditExpenses />} />
          <Route path="/income" element={<Income />} />
          <Route path="/add-income" element={<AddIncome />} />
          <Route path="/edit-income" element={<EditIncome />} />

          <Route path="/report" element={<Report />} />
          <Route path="/add-customer-income" element={<AddCustomerIncome />} />
          <Route path="/add-partner-income" element={<AddPartnerIncome />} />
          <Route
            path="/add-partner-reimbursment"
            element={<AddPartnerReimbursment />}
          />
          <Route path="/customer-income" element={<CustomerIncome />} />
          <Route path="/partner-income" element={<PartnerIncome />} />
          <Route
            path="/partner-reimbursement"
            element={<PartnerReimbursement />}
          />
          <Route
            path="/view-cancelled-booking"
            element={<ViewCancelledBooking />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
