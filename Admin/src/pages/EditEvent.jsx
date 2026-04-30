import React, { useEffect, useState } from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";
import api from "../utills/AxiosConfig";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Aside from "../common/Aside";

function EditEvent() {
  const [preview, setPreview] = useState(null);
  const [previewArtist, setPreviewArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  let event = useLocation().state;
  let [editevent, setEditEvent] = useState(event);
  const navigate = useNavigate();

  console.log(editevent);

  const fetchCategory = async () => {
    try {
      const response = await api.get("/admin/category/");
      console.log(response.data);
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  function handelInputChange(e) {
    const { name, value } = e.target;

    setEditEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleImage = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    setSelectedFile((prev) => ({
      ...prev,
      [name]: file,
    }));

    if (name === "event_img") {
      setPreview(URL.createObjectURL(file));
    }

    if (name === "artist_image") {
      setPreviewArtist(URL.createObjectURL(file));
    }
  };

  async function handelSubmit(e) {
    e.preventDefault();

    const event = new FormData();
    event.append("category_id", editevent.category_id);
    event.append("event_name", editevent.event_name);
    event.append("artist_name", editevent.artist_name);
    event.append("price_per_seat", editevent.price_per_seat);
    event.append("total_seats", editevent.total_seats);
    event.append("available_seats", editevent.available_seats);
    event.append("address", editevent.address);
    event.append("datetime", editevent.datetime);
    event.append("event_img", selectedFile.event_img);
    event.append("artist_image", selectedFile.artist_image);

    try {
      setLoading(true);
      const reponse = await api.put(
        `/admin/event/update/${editevent._id}`,
        event,
      );
      toast.success("Category updated successfully..", {
        onClose: () => {
          navigate("/manageevent");
        },
      });
    } catch (e) {
        setLoading(false)
      console.log(e);
      toast.error("Updated Failed...", {
        onClose: () => {
          navigate("/editevent");
        },
      });
    }
  }



  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Aside />

        <div className="layout-page">
          <Header />

          <div className="content-wrapper">
            <div className="container-xxl container-p-y">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h4>Edit Event</h4>
                </div>
              </div>

              <div className="card shadow-sm">
                <div className="card-body">
                  <form onSubmit={handelSubmit} encType="multipart/form-data">
                    <div className="row">
                      {/* CATEGORY */}
                      <div className="col-md-4 mb-3">
                        <label>Category</label>
                        <select
                          name="category_id"
                          className="form-select"
                          value={editevent.category_id}
                          onChange={handelInputChange}
                        >
                          <option value="">Select Category</option>
                          {category?.map((value) => (
                            <option key={value._id} value={value._id}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* SAME FIELDS AS ADD EVENT */}
                      <div className="col-md-4 mb-3">
                        <label>Event Name</label>
                        <input
                          type="text"
                          name="event_name"
                          className="form-control"
                          value={editevent.event_name}
                          onChange={handelInputChange}
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label>Artist Name</label>
                        <input
                          type="text"
                          name="artist_name"
                          className="form-control"
                          value={editevent.artist_name}
                          onChange={handelInputChange}
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label>Price</label>
                        <input
                          type="number"
                          name="price_per_seat"
                          className="form-control"
                          value={editevent.price_per_seat}
                          onChange={handelInputChange}
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label>Total Seats</label>
                        <input
                          type="number"
                          name="total_seats"
                          className="form-control"
                          value={editevent.total_seats}
                          onChange={handelInputChange}
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label>Available Seats</label>
                        <input
                          type="number"
                          name="available_seats"
                          className="form-control"
                          value={editevent.available_seats}
                          onChange={handelInputChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Address</label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          value={editevent.address}
                          onChange={handelInputChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Date</label>
                        <input
                          type="datetime-local"
                          name="datetime"
                          className="form-control"
                          value={editevent.datetime}
                          onChange={handelInputChange}
                        />
                      </div>

                      {/* EVENT IMAGE */}
                      <div className="col-md-6 mb-3">
                        <label>Event Image</label>
                        <input
                          type="file"
                          name="event_img"
                          className="form-control"
                          onChange={handleImage}
                        />
                        {preview && (
                          <img
                            src={preview}
                            height="120"
                            width="150"
                            className="mt-3"
                          />
                        )}
                      </div>

                      {/* ARTIST IMAGE */}
                      <div className="col-md-6 mb-3">
                        <label>Artist Image</label>
                        <input
                          type="file"
                          name="artist_image"
                          className="form-control"
                          onChange={handleImage}
                        />
                        {previewArtist && (
                          <img
                            src={previewArtist}
                            height="120"
                            width="150"
                            className="mt-3"
                          />
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Event"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-light px-4 py-2"
                      style={{ borderRadius: "8px" }}
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                  </form>
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

export default EditEvent;
