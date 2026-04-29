import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import Aside from "../common/aside";
import Header from "../common/Header";
import Footer from "../common/Footer";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageCategory() {
  // const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const DeleteCategory = async (id) => {
    try {
      const response = await api.delete(`/admin/category/delete/${id}`);
      toast.success("Hotel Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    } catch (e) {
      console.log(e);
    }
  };

  // const filteredData = category.filter((value) =>
  //   value.name.toLowerCase().includes(search.toLowerCase()),
  // );

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Aside />

          <div className="layout-page">
            <Header />

            <div className="content-wrapper">
              <div className="container-xxl container-p-y">
                <div
                  className="card mb-4 border-0 shadow-sm"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="card-body d-flex justify-content-between align-items-center">
                    {/* LEFT */}
                    <div>
                      <h4 className="fw-bold mb-1 text-dark">
                        Manage Category
                      </h4>
                      <small className="text-muted">
                        Total {category?.length} categories available
                      </small>
                    </div>

                    {/* RIGHT BUTTON */}
                    <button
                      onClick={() => navigate("/addcategory")}
                      className="btn d-flex align-items-center gap-2 px-4 py-2"
                      style={{
                        background: "#7367f0",
                        color: "#fff",
                        borderRadius: "8px",
                        fontWeight: "500",
                      }}
                    >
                      <FaPlus /> Add Category
                    </button>
                  </div>
                </div>

                {/* <div className="card mb-3 border-0 shadow-sm">
                  <div className="card-body d-flex align-items-center gap-3">
                    <FaSearch className="text-muted" />
                    <input
                      type="text"
                      placeholder="Search category..."
                      className="form-control border-0 shadow-none"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div> */}

                <div className="card border-0 shadow-sm">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table align-middle mb-0">
                        <thead style={{ background: "#f8f9fa" }}>
                          <tr>
                            <th className="ps-4">ID</th>
                            <th>Category</th>
                            <th>Image</th>
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
                              <h5 className="text-start">
                                Loading Category...
                              </h5>
                            </div>
                          ) : isError ? (
                            <h4 className="text-danger text-center">
                              {error.message}
                            </h4>
                          ) : (
                            category.map((value, index) => (
                              <tr
                                key={value._id}
                                style={{ transition: "0.2s" }}
                              >
                                <td className="ps-4">
                                  <span className="badge bg-light text-dark fw-semibold">
                                    {index + 1}
                                  </span>
                                </td>

                                {/* NAME */}
                                <td className="fw-semibold">{value.name}</td>

                                {/* IMAGE */}
                                <td>
                                  <img
                                    src={value.image}
                                    alt=""
                                    width="45"
                                    height="45"
                                    style={{
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      border: "2px solid #eee",
                                    }}
                                  />
                                </td>

                                {/* STATUS */}
                                <td>
                                  <span
                                    className={`px-3 py-1 rounded-pill fw-semibold ${
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
                                      navigate("/editcategory", {
                                        state: value,
                                      })
                                    }
                                  >
                                    <FaEdit className="text-primary" />
                                  </button>

                                  <button
                                    className="btn btn-sm btn-light"
                                    style={{ borderRadius: "8px" }}
                                    onClick={() => DeleteCategory(value._id)}
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

export default ManageCategory;
