import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckRole from "../utills/CheckRole";
import { LogoutwithoutNotification } from "../utills/Logout";
import api from "../utills/AxiosConfig";

function TicketDetails() {
  const ticketdata = useLocation().state;
  const [ticketdetails, setTicketDetails] = useState(ticketdata);
  console.log(ticketdetails);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});

  const FetchUserProfile = async () => {
    if (CheckRole() === "user") {
      try {
        const response = await api.get("/user/profile");
        console.log(response);

        setUserProfile(response.data.user);
        console.log(response.data.user);

        setFormData((prev) => ({
          ...prev,
          userId: response.data.user.id,
        }));
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          LogoutwithoutNotification();
        }
      }
    } else {
      LogoutwithoutNotification();
    }
  };

  useEffect(() => {
    FetchUserProfile();
  }, []);

  console.log(userProfile);

  return (
    <>
      <div className="page-heading-shows-events">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Tickets Details</h2>
              <span>
                Check your ticket information with event details, booking
                status, seat count, and user contact details.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5" >
        <div
          className="card shadow-lg"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            maxWidth: "700px",
            margin: "auto",
       
          }}
        >
          {/* Event Image */}
          <div style={{ position: "relative" }}>
            <img
              src={ticketdetails.event_img}
              alt=""
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />

            {/* Status Badge */}
            <span
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "green",
                color: "#fff",
                padding: "6px 15px",
                borderRadius: "20px",
                fontSize: "12px",
              }}
            >
              {ticketdetails.status}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="fw-bold">{ticketdetails.event_name}</h3>
            <p className="text-muted mb-2">📅 {ticketdetails.datetime}</p>
            <p className="text-muted">📍 {ticketdetails.address}</p>

            <hr />

            {/* Ticket Info */}
            <div className="d-flex justify-content-between">
              <div>
                <small className="text-muted">Seats</small>
                <h5>{ticketdetails.seats}</h5>
              </div>
              <div>
                <small className="text-muted">Amount</small>
                <h5>₹{ticketdetails.total_price}</h5>
              </div>
            </div>

            <hr />

            {/* User Info */}
            <h5 className="mb-3">👤 Customer Details</h5>

            <div className="row">
              <div className="col-6">
                <small className="text-muted">Name</small>
                <p>{ticketdetails.user_name}</p>
              </div>

              <div className="col-6">
                <small className="text-muted">Phone</small>
                <p>{ticketdetails.phone}</p>
              </div>

              <div className="col-12">
                <small className="text-muted">Email</small>
                <p>{ticketdetails.email}</p>
              </div>
            </div>

            <hr />

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>

              <button className="btn btn-dark">Download Ticket</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketDetails;
