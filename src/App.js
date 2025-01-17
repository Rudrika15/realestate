import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import Modal from "./Components/Modal/Modal";
import AddNewPermission from "./Pages/Permission/AddNewPermission";


const App = () => {
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
          <Route path="/modal" element={<Modal />}></Route>
          <Route
            path="/cancelled-booking"
            element={<CancelledBooking />}
          ></Route>
          <Route path="/broker" element={<Broker />}></Route>
          <Route path="/view-booking" element={<ViewBooking />}></Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/permission" element={<Permission />} />
          <Route path="/addnewpermission" element={<AddNewPermission/>}/>
          <Route path="/add-projects" element={<AddProjects />} />
          <Route path="/edit-projects" element={<EditProjects />} />
          <Route path="/unit/:id" element={<Unit />} />
          <Route path="/edit-unit" element={<EditUnit />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/add-partners" element={<AddPartners />} />
          <Route path="/edit-partners/:id" element={<EditPartners />} />
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
