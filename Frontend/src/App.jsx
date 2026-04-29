import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import EventDetails from "./pages/EventDetails";
import RentVenue from "./pages/RentVenue";
import ShowEvent from "./pages/ShowEvent";
import TicketDetails from "./pages/TicketDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import TicketHistory from "./pages/Tickethistory";
import AddFeedback from "./pages/Feedback";
import EditProfile from "./pages/Editprofile";

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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/eventdetails/:id" element={<EventDetails />} />
          <Route path="/rentvenue" element={<RentVenue />} />
          <Route path="/showevent" element={<ShowEvent />} />
          <Route path="/tickethistory" element={<TicketHistory />} />
          <Route path="/ticketdetails" element={<TicketDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categorybyevent/:id" element={<ShowEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<AddFeedback />} />
          <Route path="/editprofile" element={<EditProfile />} />




        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
