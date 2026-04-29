import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../utills/AxiosConfig";

function Feedback() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
    rating: "",
    status: "Active",
    createdAt: new Date(),
    booking_id: "",
  });

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

  function handleInputChange(e) {
    let { name, value } = e.target;

    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const submitFeedback = async (data) => {
    let response = await api.post("/user/review/addreview", data);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: submitFeedback,

    onSuccess: () => {
      toast.success("Feedback Submitted Successfully....", {
        onClose: () => {
          window.location.href = "/";
        },
      });
      setFeedback({
        name: "",
        email: "",
        message: "",
        rating: "",
      });
    },

    onError: () => {
      toast.error("Something went wrong...", {
        onClose: () => {
          window.location.href = "/feedback";
        },
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(feedback);
  }

  console.log(feedback);
  return (
    <>
      {/* Heading Section */}
      <div className="page-heading-shows-events">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>Feedback 💬</h2>
              <span>Share your experience with us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="rent-venue-application">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div
                className="contact-form"
                style={{
                  padding: "30px",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                }}
              >
                <div className="heading-text text-center mb-4">
                  <h4>Give Feedback</h4>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12 mb-3">
                      <select
                        className="form-control"
                        name="booking_id"
                        value={feedback.booking_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Booking</option>

                        {bookinghistory?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item._id}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Name */}
                    <div className="col-lg-12">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="form-control"
                        onChange={handleInputChange}
                        value={feedback.name}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="col-lg-12">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        onChange={handleInputChange}
                        value={feedback.email}
                        required
                      />
                    </div>

                    {/* Rating */}
                    <div className="col-lg-12 mb-3">
                      <select
                        className="form-control"
                        name="rating"
                        value={feedback.rating}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Rating</option>
                        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                        <option value="4">⭐⭐⭐⭐ Good</option>
                        <option value="3">⭐⭐⭐ Average</option>
                        <option value="2">⭐⭐ Poor</option>
                        <option value="1">⭐ Bad</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="col-lg-12">
                      <textarea
                        placeholder="Write your feedback..."
                        name="message"
                        className="form-control"
                        rows="4"
                        onChange={handleInputChange}
                        value={feedback.message}
                        required
                      ></textarea>
                    </div>

                    {/* Button */}
                    <div className="col-lg-12">
                      <button
                        className="main-dark-button w-100"
                        type="submit"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending
                          ? "Submitting..."
                          : "Submit Feedback"}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Optional Back Link */}
                <div className="text-center mt-4">
                  <a href="/" style={{ fontSize: "14px" }}>
                    ← Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
