import React, { useState } from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Aside from "../common/Aside";


function ManageBookingStatus() {
  const queryClient = useQueryClient();
  const fetchBookingStatus = async () => {
    try {
      const response = await api.get("/admin/booking/");
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const {
    data: bookingstatus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookingstatus"],
    queryFn: fetchBookingStatus,
  });

  const handleStatusChange = (bookings, id, field, value) => {
    return bookingstatus.map((b) =>
      b.id === id ? { ...b, [field]: value } : b,
    );
  };

  const updateStatus = async (id, status) => {
    try {
      let response = await api.put(`/admin/booking/status/${id}`, {
        status: status,
      });
      toast.success("Status updated successfully...");
      queryClient.invalidateQueries({ queryKey: ["bookingstatus"] }); 
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status...");
    }
  };

  const DeleteBookingStatus = async (id) => {
    try {
      const response = await api.delete(`/admin/booking/delete/${id}`);
      toast.success(" Booking Status Deleted Sucessfully...");
      queryClient.invalidateQueries({ queryKey: ["bookingstatus"] });
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
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="fw-bold mb-1">Manage Booking</h4>
                    <small className="text-muted">
                      Total {bookingstatus?.length} bookings
                    </small>
                  </div>
                </div>
              </div>

              {/* TABLE */}
              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="ps-4">ID</th>
                          <th>User</th>
                          <th>Event</th>
                          <th>Seats</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th className="text-center pe-4">Update</th>
                          <th className="text-center pe-4">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {isLoading ? (
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ paddingTop: "20px" }}
                          >
                            <h5 className="text-start">
                              Loading Booking Status...
                            </h5>
                          </div>
                        ) : isError ? (
                          <h4 className="text-danger text-center">
                            {error.message}
                          </h4>
                        ) : (
                          bookingstatus.map((value, index) => (
                            <tr key={value._id}>
                              <td className="ps-4">
                                <span className="badge bg-light text-dark">
                                  {index + 1}
                                </span>
                              </td>

                              <td>{value.user_name}</td>

                              <td>{value.event_name}</td>

                              <td>{value.seats}</td>

                              <td>₹{value.total_price}</td>

                              <td>
                                <span
                                  className={`px-3 py-1 rounded-pill ${
                                    value.status === "Confirmed"
                                      ? "bg-success-subtle text-success"
                                      : value.status === "Pending"
                                        ? "bg-warning-subtle text-warning"
                                        : "bg-danger-subtle text-danger"
                                  }`}
                                >
                                  {value.status}
                                </span>
                              </td>

                              <td className="text-center pe-4">
                                <select
                                  className="form-select form-select-sm"
                                  value={value.status}
                                  onChange={(e) =>
                                    updateStatus(value._id, e.target.value)
                                  }
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>

                              <td className="text-center pe-4">
                                <button
                                  className="btn btn-sm btn-light"
                                  onClick={() => DeleteBookingStatus(value._id)}
                                >
                                  <FaTrash className="text-danger" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageBookingStatus;
