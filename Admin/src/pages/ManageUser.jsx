import React from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUserCheck,
  FaUserSlash,
} from "react-icons/fa";
import Header from "../common/Header";
import Footer from "../common/Footer";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Aside from "../common/Aside";


function ManageUser() {
  let navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/login");
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
  });

  const ToggleBlockUser = async (id) => {
    try {
      const response = await api.put(`/auth/block/${id}`);

      if (response.data.status) {
        toast.success(response.data.message);

        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
                    <h4 className="fw-bold mb-1">Manage Users</h4>
                    <small className="text-muted">
                      Total {users?.length} users
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
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan="7" className="text-center py-4">
                              Loading Users...
                            </td>
                          </tr>
                        ) : isError ? (
                          <tr>
                            <td colSpan="7" className="text-center text-danger">
                              {error.message}
                            </td>
                          </tr>
                        ) : (
                          users?.map((user, index) => (
                            <tr key={user._id}>
                              <td className="ps-4">
                                <span className="badge bg-light text-dark">
                                  {index + 1}
                                </span>
                              </td>

                              <td className="fw-semibold">{user.username}</td>

                              <td>{user.email}</td>

                              <td>{user.phone}</td>

                              <td>
                                <span className="badge bg-info text-dark">
                                  {user.role}
                                </span>
                              </td>

                              <td>
                                <span
                                  className={`px-3 py-1 rounded-pill ${
                                    user.status === "Blocked"
                                      ? "bg-danger-subtle text-danger"
                                      : "bg-success-subtle text-success"
                                  }`}
                                >
                                  {user.status}
                                </span>
                              </td>

                              {/* ACTION */}

                              <td>
                                <button
                                  className={`btn btn-sm ${
                                    user.status === "Blocked"
                                      ? "btn-success"
                                      : "btn-danger"
                                  }`}
                                  onClick={() => ToggleBlockUser(user._id)}
                                >
                                  {user.status === "Blocked" ? (
                                    <FaUserCheck title="Unblock User" />
                                  ) : (
                                    <FaUserSlash title="Block User" />
                                  )}
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

export default ManageUser;
