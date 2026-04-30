import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import Header from "../common/Header";
import Footer from "../common/Footer";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Aside from "../common/Aside";


function ManageEvent() {
   const queryClient = useQueryClient();
  let navigate = useNavigate();
  const fetchEvent = async () => {
    try {
      const response = await api.get("/admin/event/");
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["event"],
    queryFn: fetchEvent,
  });

  const DeleteEvent = async (id) => {
   try{
     const response = await api.delete(`/admin/event/delete/${id}`);
    toast.success("Event Deleted Sucessfully...");
      queryClient.invalidateQueries({ queryKey: ["event"] });

   }catch(e){
    console.log(e);
   }


  } 

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Aside />

          <div className="layout-page">
            <Header />

            <div className="content-wrapper">
              <div className="container-xxl container-p-y">
                {/* HEADER */}
                <div
                  className="card mb-4 border-0 shadow-sm"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="fw-bold mb-1 text-dark">Manage Event</h4>
                      <small className="text-muted">
                        Total {event?.length} events available
                      </small>
                    </div>

                    <button
                      className="btn d-flex align-items-center gap-2 px-4 py-2"
                      style={{
                        background: "#7367f0",
                        color: "#fff",
                        borderRadius: "8px",
                      }}
                      onClick={() => navigate("/addevent")}
                    >
                      <FaPlus /> Add Event
                    </button>
                  </div>
                </div>

                {/* TABLE */}
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table align-middle mb-0">
                        <thead style={{ background: "#f8f9fa" }}>
                          <tr>
                            <th className="ps-4">ID</th>
                            <th>Event</th>
                            <th>Image</th>
                            <th>Artist</th>
                            <th>image</th>
                            <th>Price</th>
                            <th>Seats</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th className="text-center pe-4">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {isLoading ? (
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ paddingTop: "20px" }}
                            >
                              <h5 className="text-start">Loading Events...</h5>
                            </div>
                          ) : isError ? (
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ paddingTop: "20px" }}
                            >
                              <h5 className="text-start">{error}</h5>
                            </div>
                          ) : (
                            event.map((value, index) => (
                              <tr key={value._id}>
                                {/* ID */}
                                <td className="ps-4">
                                  <span className="badge bg-light text-dark">
                                    {index + 1}
                                  </span>
                                </td>

                                {/* EVENT */}
                                <td>
                                  <span className="fw-semibold">
                                    {value.event_name}
                                  </span>
                                </td>

                                <td>
                                  <img
                                    src={value.event_img}
                                    width="40"
                                    height="40"
                                    style={{ borderRadius: "8px" }}
                                  />
                                </td>

                                {/* ARTIST */}
                                <td>{value.artist_name}</td>

                                <td>
                                  <img
                                    src={value.artist_image}
                                    width="40"
                                    height="40"
                                    style={{ borderRadius: "8px" }}
                                  />
                                </td>

                                {/* PRICE */}
                                <td>₹{value.price_per_seat}</td>

                                {/* SEATS */}
                                <td>
                                  <small>
                                    {value.available_seats}/{value.total_seats}
                                  </small>
                                </td>

                                {/* ADDRESS */}
                                <td>{value.address}</td>

                                {/* STATUS */}
                                <td>
                                  <span
                                    className={`px-3 py-1 rounded-pill ${
                                      value.status === "Active"
                                        ? "bg-success-subtle text-success"
                                        : "bg-secondary-subtle text-secondary"
                                    }`}
                                  >
                                    {value.status}
                                  </span>
                                </td>

                                {/* ACTION */}
                                <td className="text-center pe-4">
                                  <button
                                    className="btn btn-sm btn-light me-2"
                                    style={{ borderRadius: "8px" }}
                                    onClick={() =>
                                      navigate("/editevent", {
                                        state: value,
                                      })
                                    }
                                  >
                                    <FaEdit className="text-primary" />
                                  </button>

                                  <button
                                    className="btn btn-sm btn-light"
                                    style={{ borderRadius: "8px" }}
                                    onClick={()=> DeleteEvent(value._id)}
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
    </>
  );
}

export default ManageEvent;
