import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Add from "./Pages/User/Add";
import Login from "./Pages/User/Login/Login";
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


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/add-user" element={<Add />}></Route>
          <Route path="/BookingAuthorization" element={<BookingAuthorization />}></Route>
          <Route path="/CashDeposit" element={<CashDeposit />}></Route>
          <Route path="/ChequeDeposit" element={<ChequeDeposit />}></Route>
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/CancelledBooking" element={<CancelledBooking />}></Route>
          <Route path="/ViewBooking" element={<ViewBooking />}></Route>
          <Route path="/Projects" element={<Projects />} />
          <Route path="/AddProjects" element={<AddProjects />} />
          <Route path="/Unit" element={<Unit />} />
          <Route path="/EditUnit" element={<EditUnit />} />
          <Route path="/Partners" element={<Partners />} />
          <Route path="/AddPartners" element={<AddPartners />} />
          <Route path="/Expenses" element={<Expenses />} />
          <Route path="/AddExpenses" element={<AddExpenses />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/AddCustomerIncome" element={<AddCustomerIncome />} />
          <Route path="/AddPartnerIncome" element={<AddPartnerIncome />} />
          <Route path="/AddPartnerReimbursment" element={<AddPartnerReimbursment />}/>
          <Route path="/CustomerIncome" element={<CustomerIncome />} />
          <Route path="/PartnerIncome" element={<PartnerIncome />} />
          <Route path="/PartnerReimbursement" element={<PartnerReimbursement />}/>
          <Route path="/ViewCancelledBooking" element={<ViewCancelledBooking />}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
