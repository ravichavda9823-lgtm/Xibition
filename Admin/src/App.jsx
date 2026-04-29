import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Home from "./pages/Home";
import ManageCategory from "./pages/ManageCategory";
import ManageEvent from "./pages/ManageEvent";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import ManageUser from "./pages/ManageUser";
import ManageBookingStatus from "./pages/ManageBookingStatus";
import BookingHistory from "./pages/ManageBookingHistory";
import AddCategory from "./pages/Addcategory";
import EditCategory from "./pages/EditCategory";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import EditUser from "./pages/EditUser";
import ProtectPages from "./utills/ProtectedPages";
import ManageFeedback from "./pages/ManageFeedback";
import ManageComplaint from "./pages/ManageComplaint";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        theme="colored"
        style={{ zIndex: 99999 }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectPages>
                <Home />
              </ProtectPages>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/managecategory" element={<ManageCategory />} />
          <Route path="/manageevent" element={<ManageEvent />} />
          <Route path="/manageuser" element={<ManageUser />} />
          <Route
            path="/managebookingstatus"
            element={<ManageBookingStatus />}
          />
          <Route path="/managebookinghistory" element={<BookingHistory />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/editcategory" element={<EditCategory />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/editevent" element={<EditEvent />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/managefeedback" element={<ManageFeedback />} />
          <Route path="/managecomplaint" element={<ManageComplaint />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
