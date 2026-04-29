import React from "react";
import { Link } from "react-router-dom";
import api from "../utills/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

function TicketHistory() {
  const fetchBookingHistory = async () => {
    try {
      const response = await api.get("/user/booking/");
      return response.data.data;
    } catch (error) {
      console.log("Booking fetch error", error);
    }
  };

  const {
    data: bookinghistory,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookinghistory"],
    queryFn: fetchBookingHistory,
  });

  return (
    <>
      <div>
        <div className="page-heading-shows-events">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Tickets History!</h2>
                <span>
                  Check out upcoming and past shows &amp; events and grab your
                  ticket right now.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="tickets-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading">
                  <h2>Tickets History Page</h2>
                </div>
              </div>

              {isLoading ? (
                <h4 className="text-center mt-4">Loading Bookings...</h4>
              ) : isError ? (
                <h4 className="text-danger text-center">{error?.message}</h4>
              ) : bookinghistory?.length === 0 ? (
                <h4 className="text-center mt-4">No Bookings Found</h4>
              ) : (
                bookinghistory.map((value, index) => (
                  <div className="col-lg-4">
                    <div className="ticket-item">
                      <div className="thumb">
                        <img
                          src={value.event_img}
                          style={{
                            height: "200px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          alt
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "green",
                            color: "#fff",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            zIndex: 2,
                          }}
                        >
                          {value.status}
                        </div>
                      </div>
                      <div className="down-content">
                        {/* <span>There Are 150 Tickets Left For This Show</span> */}
                        <h4>{value.event_name}</h4>
                        <ul>
                          <li>
                            <i className="fa fa-clock-o" /> {value.datetime}
                          </li>
                          <li>
                            <i className="fa fa-map-marker" />
                            {value.address}
                          </li>

                          <div className="d-flex justify-content-between">
                            <li>
                              <i className="fa fa-inr" /> {value.total_price}
                            </li>
                            <li>
                              <i className="fa fa-ticket me-2" />
                              {value.seats} Seats
                            </li>
                          </div>
                        </ul>
                        <div className="main-dark-button">
                          <Link to="/ticketdetails" state={value}>
                            View Tickets
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* *** Subscribe *** */}
        <div className="subscribe">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h4>Subscribe Our Newsletter:</h4>
              </div>
              <div className="col-lg-8">
                <form id="subscribe" action method="get">
                  <div className="row">
                    <div className="col-lg-9">
                      <fieldset>
                        <input
                          name="email"
                          type="text"
                          id="email"
                          pattern="[^ @]*@[^ @]*"
                          placeholder="Your Email Address"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-3">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="main-dark-button"
                        >
                          Submit
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketHistory;
