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
import AddNewPermission from "./Pages/Permission/AddNewPermission";
import EditProjectStage from "./Pages/Projects/EditProjectStage";
import EditPermissions from "./Pages/Permission/EditPermissions";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";
import Modal from "./Components/Modal/Modal";
import { rolesWisePermissions } from "./Api/ApiDipak";

const App = () => {
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchPermissions = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(rolesWisePermissions, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setPermissions(response.data.data.map((perm) => perm.name));
    } catch (error) {
      console.error("Error fetching permissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ProtectedRoute = ({ element, requiredPermission }) => {
    if (isLoading) {
      return <div></div>;
    }
    if (requiredPermission && !permissions.includes(requiredPermission)) {
      return <Navigate to="/unauthorized" />;
    }
    return element;
  };
  useEffect(() => {
    fetchPermissions();
  }, []);
  return (
    <>
      {/* {isLoading ? (
        <div className="loader-container">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : ( */}
        <Router>
          <Routes>
            <Route path="/unauthorized" element={<Unauthorized />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            {/* user  */}
            <Route
              path="/view-user"
              element={
                <ProtectedRoute
                  element={<View />}
                  requiredPermission="view-user"
                />
              }
            />
            <Route
              path="/edit-user"
              element={
                <ProtectedRoute
                  element={<EditUser />}
                  requiredPermission="edit-user"
                />
              }
            />
            <Route
              path="/add-user"
              element={
                <ProtectedRoute
                  element={<AddUser />}
                  requiredPermission="add-user"
                />
              }
            />
            {/*  project  */}
            <Route
              path="/projects"
              element={
                <ProtectedRoute
                  element={<Projects />}
                  requiredPermission="view-project"
                />
              }
            />
            <Route
              path="/add-projects"
              element={
                <ProtectedRoute
                  element={<AddProjects />}
                  requiredPermission="new-project"
                />
              }
            />
            <Route
              path="/edit-projects"
              element={
                <ProtectedRoute
                  element={<EditProjects />}
                  requiredPermission="edit-project"
                />
              }
            />
            <Route
              path="/unit/:id"
              element={
                <ProtectedRoute
                  element={<Unit />}
                  requiredPermission="unit-project"
                />
              }
            />
            <Route
              path="/project-stage/:id"
              element={
                <ProtectedRoute
                  element={<ProjectStage />}
                  requiredPermission="project-stage"
                />
              }
            />
            <Route
              path="/edit-projectstage"
              element={
                <ProtectedRoute
                  element={<EditProjectStage />}
                  requiredPermission="edit-projectstage"
                />
              }
            />
            <Route
              path="/edit-unit"
              element={
                <ProtectedRoute
                  element={<EditUnit />}
                  requiredPermission="edit-unit"
                />
              }
            />
            <Route
              path="/add-project-stage"
              element={
                <ProtectedRoute
                  element={<AddProjectStage />}
                  requiredPermission="add-project-stage"
                />
              }
            />

            {/* booking */}
            <Route
              path="/view-booking"
              element={
                <ProtectedRoute
                  element={<ViewBooking />}
                  requiredPermission="view-booking"
                />
              }
            />
            <Route
              path="/cancelled-booking"
              element={
                <ProtectedRoute
                  element={<CancelledBooking />}
                  requiredPermission="cancelled-booking"
                />
              }
            />
            <Route
              path="/view-cancelled-booking"
              element={<ViewCancelledBooking />}
            />
            <Route path="/booking" element={<Booking />}></Route>

            {/* broker */}
            <Route
              path="/broker"
              element={
                <ProtectedRoute
                  element={<Broker />}
                  requiredPermission="view-broker"
                />
              }
            />
            <Route
              path="/edit-broker/:id"
              element={
                <ProtectedRoute
                  element={<EditBroker />}
                  requiredPermission="edit-broker"
                />
              }
            />

<<<<<<< HEAD
          {/* partners */}
          <Route
            path="/partners"
            element={
              <ProtectedRoute
                element={<Partners />}
                requiredPermission="view-partner"
              />
            }
          />
          <Route
            path="/add-partners"
            element={
              <ProtectedRoute
                element={<AddPartners />}
                requiredPermission="add-partner"
              />
            }
          />
          <Route
            path="/edit-partners/:id"
            element={
              <ProtectedRoute
                element={<EditPartners />}
                requiredPermission="edit-partner"
              />
            }
          />
          {/* Expenses */}
          <Route
            path="/expenses"
            element={
              <ProtectedRoute
                element={<Expenses />}
                requiredPermission="view-expenses"
              />
            }
          />
          <Route
            path="/add-expenses"
            element={
              <ProtectedRoute
                element={<AddExpenses />}
                requiredPermission="new-expenses"
              />
            }
          />
          <Route
            path="/edit-expenses/:id"
            element={
              <ProtectedRoute
                element={<EditExpenses />}
                requiredPermission="edit-expenses"
              />
            }
          />
=======
            {/* partners */}
            <Route
              path="/partners"
              element={
                <ProtectedRoute
                  element={<Partners />}
                  requiredPermission="view-partner"
                />
              }
            />
            <Route
              path="/add-partners"
              element={
                <ProtectedRoute
                  element={<AddPartners />}
                  requiredPermission="add-partner"
                />
              }
            />
            <Route
              path="/edit-partners/:id"
              element={
                <ProtectedRoute
                  element={<EditPartners />}
                  requiredPermission="edit-partner"
                />
              }
            />
            {/* Expenses */}
            <Route
              path="/expenses"
              element={
                <ProtectedRoute
                  element={<Expenses />}
                  requiredPermission="view-expenses"
                />
              }
            />
            <Route
              path="/add-expenses"
              element={
                <ProtectedRoute
                  element={<AddExpenses />}
                  requiredPermission="new-expenses"
                />
              }
            />
            <Route
              path="/edit-expenses"
              element={
                <ProtectedRoute
                  element={<EditExpenses />}
                  requiredPermission="edit-expenses"
                />
              }
            />
>>>>>>> fb259fdfac176d1650d663b64d5cfed807738e19

            {/* Income   */}
            <Route
              path="/income"
              element={
                <ProtectedRoute
                  element={<Income />}
                  requiredPermission="view-income"
                />
              }
            />
            <Route
              path="/add-income"
              element={
                <ProtectedRoute
                  element={<AddIncome />}
                  requiredPermission="new-income"
                />
              }
            />
            <Route
              path="/edit-income"
              element={
                <ProtectedRoute
                  element={<EditIncome />}
                  requiredPermission="edit-income"
                />
              }
            />
            {/* Ledger  */}
            <Route
              path="/partner-income"
              element={
                <ProtectedRoute
                  element={<PartnerIncome />}
                  requiredPermission="view-ledger-partner"
                />
              }
            />
            <Route
              path="/add-partner-income"
              element={
                <ProtectedRoute
                  element={<AddPartnerIncome />}
                  requiredPermission="add-partner-income"
                />
              }
            />
            <Route
              path="/partner-reimbursement"
              element={
                <ProtectedRoute
                  element={<PartnerReimbursement />}
                  requiredPermission="view-reimbursement"
                />
              }
            />
            <Route
              path="/add-partner-reimbursment"
              element={
                <ProtectedRoute
                  element={<AddPartnerReimbursment />}
                  requiredPermission="add-partner-reimbursment"
                />
              }
            />
            <Route
              path="/add-customer-income"
              element={
                <ProtectedRoute
                  element={<AddCustomerIncome />}
                  requiredPermission="add-customer-income"
                />
              }
            />
            <Route
              path="/customer-income"
              element={
                <ProtectedRoute
                  element={<CustomerIncome />}
                  requiredPermission="view-customer-partner"
                />
              }
            />

            {/* role  */}
            <Route
              path="/role"
              element={
                <ProtectedRoute
                  element={<Role />}
                  requiredPermission="view-role"
                />
              }
            />
            <Route
              path="/add-role"
              element={
                <ProtectedRoute
                  element={<AddRole />}
                  requiredPermission="new-role"
                />
              }
            />
            <Route
              path="/edit-role/:id"
              element={
                <ProtectedRoute
                  element={<EditRole />}
                  requiredPermission="edit-role"
                />
              }
            />
            {/* permission */}
            <Route
              path="/permission"
              element={
                <ProtectedRoute
                  element={<Permission />}
                  requiredPermission="view-permissions"
                />
              }
            />
            <Route
              path="/addnewpermission"
              element={
                <ProtectedRoute
                  element={<AddNewPermission />}
                  requiredPermission="new-permissions"
                />
              }
            />
            <Route
              path="/editpermissions/:id"
              element={
                <ProtectedRoute
                  element={<EditPermissions />}
                  requiredPermission="edit-permissions"
                />
              }
            />
            {/* Approval */}
            <Route
              path="/cash-deposit"
              element={
                <ProtectedRoute
                  element={<CashDeposit />}
                  requiredPermission="view-cash-deposit"
                />
              }
            />
            <Route
              path="/cheque-deposit"
              element={
                <ProtectedRoute
                  element={<ChequeDeposit />}
                  requiredPermission="view-cheque-deposit"
                />
              }
            />
            <Route
              path="/booking-authorization"
              element={
                <ProtectedRoute
                  element={<BookingAuthorization />}
                  requiredPermission="view-booking-authorization"
                />
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute
                  element={<Report />}
                  requiredPermission="view-report"
                />
              }
            />
            {/* <Route path="/modal" element={<Modal />}></Route> */}
          </Routes>
        </Router>
      {/* // )} */}
    </>
  );
};

export default App;
