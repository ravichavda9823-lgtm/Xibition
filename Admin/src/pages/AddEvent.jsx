import React, { useState } from "react";
import Aside from "../common/aside";
import Header from "../common/Header";
import Footer from "../common/Footer";
import api from "../utills/AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

function AddEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const [previewArtist, setPreviewArtist] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const [formData, setFormData] = useState({
    category_id: "",
    event_name: "",
    artist_name: "",
    event_img: "",
    artist_image: "",
    price_per_seat: "",
    total_seats: "",
    available_seats: "",
    datetime: "",
    address: "",
    status: "Active",
    created_at: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    if (name === "event_img") {
      setSelectedFile((prev) => ({
        ...prev,
        event_img: file,
      }));

      setPreview(URL.createObjectURL(file));
    }

    if (name === "artist_image") {
      setSelectedFile((prev) => ({
        ...prev,
        artist_image: file,
      }));

      setPreviewArtist(URL.createObjectURL(file));
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const event = new FormData();

      event.append("category_id", formData.category_id);
      event.append("event_name", formData.event_name);
      event.append("artist_name", formData.artist_name);
      event.append("price_per_seat", formData.price_per_seat);
      event.append("total_seats", formData.total_seats);
      event.append("available_seats", formData.available_seats);
      event.append("address", formData.address);
      event.append("datetime", formData.datetime);
      event.append("event_img", selectedFile.event_img);
      event.append("artist_image", selectedFile.artist_image);

      const response = await api.post("/admin/event/addevent", event);
      toast.success("Event Added Successfully...", {
        onClose: () => {
          navigate("/manageevent");
        },
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error("Something went wrong", {
        onClose: () => {
          navigate("/addevent");
        },
      });
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
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h4>Add Event</h4>
                </div>
              </div>

              <div className="card shadow-sm">
                <div className="card-body">
                  <form onSubmit={handelSubmit} enctype="multipart/form-data">
                    <div className="row">
                      {/* EVENT NAME */}

                      <div className="col-md-4 mb-3">
                        <label>Category</label>
                        <select
                          name="category_id"
                          className="form-select"
                          value={formData.category_id}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Category</option>

                          {category?.map((value) => (
                            <option key={value._id} value={value._id}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label>Event Name</label>
                        <input
                          type="text"
                          name="event_name"
                          className="form-control"
                          value={formData.event_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* ARTIST NAME */}
                      <div className="col-md-4 mb-3">
                        <label>Artist Name</label>
                        <input
                          type="text"
                          name="artist_name"
                          className="form-control"
                          value={formData.artist_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* PRICE */}
                      <div className="col-md-4 mb-3">
                        <label>Price</label>
                        <input
                          type="number"
                          name="price_per_seat"
                          className="form-control"
                          value={formData.price_per_seat}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* TOTAL SEATS */}
                      <div className="col-md-4 mb-3">
                        <label>Total Seats</label>
                        <input
                          type="number"
                          name="total_seats"
                          className="form-control"
                          value={formData.total_seats}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* AVAILABLE SEATS */}
                      <div className="col-md-4 mb-3">
                        <label>Available Seats</label>
                        <input
                          type="number"
                          name="available_seats"
                          className="form-control"
                          value={formData.available_seats}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* ADDRESS */}
                      <div className="col-md-6 mb-3">
                        <label>Address</label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Date</label>
                        <input
                          type="datetime-local"
                          name="datetime"
                          className="form-control"
                          value={formData.datetime}
                          onChange={handleInputChange}
                          required
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
                          required
                        />
                        {preview && (
                          <img
                            src={preview}
                            height={"120px"}
                            width="150"
                            className="mt-5"
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
                          required
                        />
                        {previewArtist && (
                          <img
                            src={previewArtist}
                            height={"120px"}
                            width="150"
                            className="mt-5"
                          />
                        )}
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-primary px-4 py-2"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : " Add Event"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-light px-4 py-2"
                        style={{ borderRadius: "8px" }}
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                    </div>
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

export default AddEvent;
