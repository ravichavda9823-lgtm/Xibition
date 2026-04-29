import React, { useState, useEffect } from "react";
import Aside from "../common/aside";
import Header from "../common/Header";
import Footer from "../common/Footer";
import api from "../utills/AxiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function EditCategory() {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  let category = useLocation().state;
  let [editcategory, setEditCategory] = useState(category);
  const navigate = useNavigate();

  console.log(editcategory);

  function handelInputChange(e) {
    const { name, value } = e.target;

    setEditCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  async function handelSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editcategory.name);
    formData.append("status", editcategory.status);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      setLoading(true);
      const response = await api.put(
        `/admin/category/update/${editcategory._id}`,
        formData,
      );

      toast.success("Category updated successfully..", {
        onClose: () => {
          navigate("/managecategory");
        },
      });
    } catch (e) {
      console.log(e);
      toast.error("Updated Failed...", {
        onClose: () => {
          navigate("/editcategory");
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
              {/* HEADER */}
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="fw-bold">Edit Category</h4>
                </div>
              </div>

              {/* FORM */}
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <form onSubmit={handelSubmit}>
                    <div className="row">
                      {/* NAME */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Category Name</label>
                        <input
                          type="text"
                          name="name"
                          defaultValue={editcategory.name}
                          onChange={handelInputChange}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* STATUS */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label>
                        <select name="status" className="form-select">
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>

                      {/* IMAGE */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Category Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          name="image"
                          onChange={handleImage}
                        />
                      </div>

                      {/* PREVIEW */}
                      {preview && (
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Preview</label>
                          <img
                            src={preview}
                            alt="preview"
                            width="80"
                            height="80"
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                      )}
                    </div>

                    {/* BUTTON */}
                    <div className="d-flex gap-2 mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update Category"}
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

export default EditCategory;
