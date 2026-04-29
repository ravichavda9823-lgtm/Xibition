import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utills/AxiosConfig";
import { LogoutwithoutNotification } from "../utills/Logout";
import CheckRole from "../utills/CheckRole";
import { toast } from "react-toastify";

function EventDetails() {
  const [quantity, setQuantity] = useState(1);
  const [userProfile, setUserProfile] = useState({});

  let navigate   = useNavigate();

  const FetchUserProfile = async () => {
    if (CheckRole() === "user") {
      try {
        const response = await api.get("/user/profile");
        console.log(response);

        setUserProfile(response.data.user);
        console.log(response.data.user);

        setFormData((prev) => ({
          ...prev,
          loginId: response.data.user.id,
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

  const handlePayment = async (e) => {
    e.preventDefault();

    if (quantity > eventdetails?.available_seats) {
      toast.error(`Only ${eventdetails?.available_seats} seats available ❌`);
      return;
    }

    if (eventdetails?.available_seats === 0) {
      toast.error("All seats are booked 😢");
      return;
    }

    const totalAmount = quantity * (eventdetails?.price_per_seat || 0);

    try {
      const response = await api.post("/user/payment/createorder", {
        amount: totalAmount,
      });

      const { id: order_id, amount } = response.data.data;

      const options = {
        key: "rzp_test_VQhEfe2NCXbbwI",
        amount: amount,
        currency: "INR",
        name: "Artxibition",
        description: "Event Ticket Booking",
        order_id: order_id,

        handler: async (response) => {
          try {
            const response = await api.post("/user/booking/eventbooking", {
              eventId: id,
              quantity,
              totalAmount,
            });

            console.log(response.data);

            toast.success("Ticket Booked Successfully...", {
              onClose: () => navigate("/tickethistory"),
            });
          } catch (error) {
            console.log(error);
            toast.error("Booking Failed");
          }
        },

        prefill: {
          name: userProfile?.name,
          email: userProfile?.email,
          contact: userProfile?.phone,
        },

        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  const handleIncrease = () => {
    if (quantity < eventdetails?.available_seats && quantity < 10) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Seat limit reached");
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const { id } = useParams();
  const fetchEventDetails = async (id) => {
    const response = await api.get(`/user/event/${id}`);
    return response.data.data;
  };

  const { data: eventdetails, isLoading } = useQuery({
    queryKey: ["eventdetails", id],
    queryFn: () => fetchEventDetails(id),
    enabled: !!id,
  });
  return (
    <>
      <div>
        <div className="page-heading-shows-events">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Tickets On Sale Now!</h2>
                <span>
                  Check out upcoming and past shows &amp; events and grab your
                  ticket right now.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="ticket-details-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="left-image">
                  <img
                    src={eventdetails?.event_img}
                    alt="event"
                    style={{ height: "530px" }}
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="right-content">
                  <h4>{eventdetails?.event_name}</h4>

                  <span>
                    {eventdetails?.available_seats} Tickets still available
                  </span>

                  <ul>
                    <li>
                      <i className="fa fa-clock-o" />
                      {eventdetails?.datetime &&
                        new Date(eventdetails.datetime).toLocaleString()}
                    </li>

                    <li>
                      <i className="fa fa-map-marker" />
                      {eventdetails?.address}
                    </li>
                  </ul>

                  <div className="quantity-content">
                    <div className="left-content">
                      <h6>Standard Ticket</h6>
                      <p>₹{eventdetails?.price_per_seat} per ticket</p>
                    </div>

                    <div className="right-content">
                      <div className="quantity buttons_added">
                        <input
                          type="button"
                          value="-"
                          className="minus"
                          onClick={handleDecrease}
                        />

                        <input
                          type="number"
                          name="quantity"
                          value={quantity}
                          min={1}
                          max={10}
                          className="input-text qty text"
                          readOnly
                        />

                        <input
                          type="button"
                          value="+"
                          className="plus"
                          onClick={handleIncrease}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="total">
                    <h4>
                      Total: ₹{quantity * (eventdetails?.price_per_seat || 0)}
                    </h4>

                    <div className="main-dark-button">
                      <button
                        className="purchase-btn"
                        onClick={handlePayment}
                        disabled={eventdetails?.available_seats === 0}
                      >
                        {eventdetails?.available_seats === 0
                          ? "Sold Out"
                          : "Purchase Tickets"}
                      </button>
                    </div>
                  </div>

                  <div className="warn">
                    <p>*You Can Only Buy 10 Tickets For This Show</p>
                  </div>
                </div>
              </div>
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

export default EventDetails;
