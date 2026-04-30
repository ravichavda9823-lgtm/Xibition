import React, { useState } from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";
import { FaTrash, FaEye } from "react-icons/fa";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Aside from "../common/aside";

function BookingHistory() {
  const queryClient = useQueryClient();

  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookingHistory = async () => {
    try {
      const response = await api.get("/admin/booking/");
      return response.data.data;
    } catch (e) {
      console.log(e);
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

  const handleView = (item) => {
    setSelectedBooking(item);
    setIsDetailView(true);
  };

  const DeleteBookingHistory = async (id) => {
    try {
      const response = await api.delete(`/admin/booking/delete/${id}`);
      toast.success(" Booking History Deleted Sucessfully...");
      queryClient.invalidateQueries({ queryKey: ["bookinghistory"] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Aside />

        <div className="layout-page">
          <Header />

          <div className="content-wrapper">
            <div className="container-xxl container-p-y">
              {/* HEADER */}
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h4 className="fw-bold">
                    {isDetailView ? "Booking Details" : "Booking History"}
                  </h4>
                  {!isDetailView && (
                    <small className="text-muted">
                      Total {bookinghistory?.length} bookings
                    </small>
                  )}
                </div>
              </div>

              {/* CONDITION */}
              {!isDetailView ? (
                // ✅ TABLE VIEW
                <div className="card shadow-sm">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table align-middle mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th className="ps-4" >ID</th>
                            <th>User</th>
                            <th>Event</th>
                            <th>Date</th>
                            <th>Seats</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th className="text-center pe-4">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {bookinghistory?.map((value, index) => (
                            <tr key={value._id}>
                              <td className="ps-4">
                                <span className="badge bg-light text-dark">
                                  {index + 1}
                                </span>
                              </td>

                              <td>{value.user_name}</td>
                              <td>{value.event_name}</td>
                              <td>{value.date}</td>
                              <td>{value.seats}</td>
                              <td>₹{value.total_price}</td>

                              <td>
                                <span
                                  className={`px-3 py-1 rounded-pill ${
                                    value.status === "Confirmed"
                                      ? "bg-success-subtle text-success"
                                      : value.status === "Cancelled"
                                        ? "bg-danger-subtle text-danger"
                                        : "bg-warning-subtle text-warning"
                                  }`}
                                >
                                  {value.status}
                                </span>
                              </td>

                              <td className="text-center pe-4">
                                <button
                                  className="btn btn-sm btn-light me-2"
                                  onClick={() => handleView(value)}
                                >
                                  <FaEye className="text-primary" />
                                </button>

                                <button className="btn btn-sm btn-light"  onClick={()=> DeleteBookingHistory(value._id)}>
                                  <FaTrash className="text-danger" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                selectedBooking && (
                  <div className="card border-0 shadow-lg p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold mb-0">
                        Event Booking #{selectedBooking._id}
                      </h5>

                      <span
                        className={`badge px-3 py-2 ${
                          selectedBooking.status === "Confirmed"
                            ? "bg-success"
                            : selectedBooking.status === "Pending"
                              ? "bg-warning"
                              : "bg-danger"
                        }`}
                      >
                        {selectedBooking.status}
                      </span>
                    </div>

                    {/* EVENT IMAGE (optional) */}
                    {selectedBooking.event_img && (
                      <div className="mb-4 text-center">
                        <img
                          src={selectedBooking.event_img}
                          alt="event"
                          className="img-fluid rounded"
                          style={{ maxHeight: "200px", objectFit: "cover" }}
                        />
                      </div>
                    )}

                    {/* GRID */}
                    <div className="row g-4">
                      {/* USER INFO */}
                      <div className="col-md-6">
                        <div className="p-3 border rounded-3 bg-light">
                          <h6 className="fw-bold mb-3">User Info</h6>
                          <p>
                            <strong>Name:</strong> {selectedBooking.user_name}
                          </p>
                          <p>
                            <strong>Email:</strong>{" "}
                            {selectedBooking.email || "N/A"}
                          </p>
                          <p>
                            <strong>Phone:</strong>{" "}
                            {selectedBooking.phone || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* EVENT INFO */}
                      <div className="col-md-6">
                        <div className="p-3 border rounded-3 bg-light">
                          <h6 className="fw-bold mb-3">Event Info</h6>
                          <p>
                            <strong>Event:</strong> {selectedBooking.event_name}
                          </p>
                          <p>
                            <strong>Date:</strong> {selectedBooking.date}
                          </p>
                          <p>
                            <strong>Location:</strong>{" "}
                            {selectedBooking.address || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* BOOKING INFO */}
                      <div className="col-md-12">
                        <div className="p-3 border rounded-3 bg-light">
                          <h6 className="fw-bold mb-3">Booking Info</h6>
                          <p>
                            <strong>Seats:</strong> {selectedBooking.seats}
                          </p>
                          <p>
                            <strong>Total Price:</strong> ₹
                            {selectedBooking.total_price}
                          </p>
                        </div>
                      </div>

                      {/* PAYMENT */}

                      {/* SUMMARY */}
                      <div className="col-12">
                        <div className="p-3 border rounded-3 bg-white shadow-sm">
                          <h6 className="fw-bold mb-3">Summary</h6>

                          <div className="d-flex justify-content-between mb-2">
                            <span>Booking Status</span>
                            <span className="fw-semibold">
                              {selectedBooking.status}
                            </span>
                          </div>

                          <div className="d-flex justify-content-between">
                            <span>Total Amount</span>
                            <span className="fw-bold text-primary">
                              ₹{selectedBooking.total_price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="d-flex justify-content-end mt-4 gap-2">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setIsDetailView(false)}
                      >
                        Back
                      </button>

                      <button className="btn btn-primary">
                        Download Ticket
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;
