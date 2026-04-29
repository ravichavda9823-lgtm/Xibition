import React, { useState } from "react";
import Aside from "../common/aside";
import Header from "../common/Header";
import Footer from "../common/Footer";
import api from "../utills/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddCategory() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    status: "Active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const category = new FormData();
      category.append("name", formData.name);
      if (selectedFile) {
        category.append("image", selectedFile);
      }

      const response = await api.post("/admin/category/addcategory", category);

      toast.success("Category Added Successfully...", {
        onClose: () => {
          navigate("/managecategory");
        },
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Something went wrong", {
        onClose: () => {
          navigate("/addcategory");
        },
      });
    } finally {
      setLoading(false);
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
              {/* HEADER CARD */}
              <div
                className="card mb-4 border-0 shadow-sm"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="fw-bold mb-1">Add Category</h4>
                    <small className="text-muted">
                      Create a new category for your resort
                    </small>
                  </div>
                </div>
              </div>

              {/* FORM CARD */}
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <div className="row">
                      {/* CATEGORY NAME */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          Category Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter category name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {/* IMAGE */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          Category Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleImage}
                          accept="image/*"
                          required
                        />
                      </div>

                      {/* PREVIEW */}
                      {preview && (
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">
                            Preview
                          </label>
                          <div>
                            <img
                              src={preview}
                              alt="preview"
                              width="80"
                              height="80"
                              style={{
                                borderRadius: "10px",
                                objectFit: "cover",
                                border: "2px solid #eee",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* BUTTONS */}
                    <div className="d-flex gap-2 mt-3">
                      <button
                        type="submit"
                        className="btn px-4 py-2"
                        style={{
                          background: "#7367f0",
                          color: "#fff",
                          borderRadius: "8px",
                        }}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Add Category"}
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

export default AddCategory;
