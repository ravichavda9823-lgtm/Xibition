import React, { useState } from "react";
import { FaEdit, FaReply, FaTrash } from "react-icons/fa";
import Aside from "../common/aside";
import Header from "../common/Header";
import Footer from "../common/Footer";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageFeedback() {
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reply, setReply] = useState("");

  const fetchFeedback = async () => {
    const response = await api.get("/admin/review/");
    return response.data.data;
  };

  const {
    data: feedback,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: fetchFeedback,
  });

  const DeleteFeedback = async (id) => {
    try {
      await api.delete(`/admin/review/delete/${id}`);
      toast.success("Deleted Successfully...");
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendReply = async () => {
    try {
      await api.put(`/admin/review/reply/${selectedItem._id}`, {
        reply: reply,
      });

      toast.success("Reply Sent Successfully...");

      setShowModal(false);
      setReply("");
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    } catch (err) {
      console.log(err);
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
              <div className="card mb-4 shadow-sm border-0">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="fw-bold">Manage Feedback</h4>
                    <small>Total {feedback?.length} feedbacks</small>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead style={{ background: "#f8f9fa" }}>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Message</th>
                          <th>Reply</th>
                          <th>Rating</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan="8" className="text-center">
                              Loading...
                            </td>
                          </tr>
                        ) : isError ? (
                          <tr>
                            <td colSpan="8" className="text-center text-danger">
                              Error loading data
                            </td>
                          </tr>
                        ) : (
                          feedback?.map((item, index) => (
                            <tr key={item._id}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>

                              <td>
                                <div
                                  style={{
                                    maxWidth: "300px",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    padding: "8px 12px",
                                    borderRadius: "8px",
                                    fontSize: "13px",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  {item.message}
                                </div>
                              </td>

                              <td>
                                <div
                                  style={{
                                    maxWidth: "130px",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    padding: "8px 12px",
                                    borderRadius: "8px",
                                    fontSize: "13px",
                                  }}
                                >
                                  {item.reply ? (
                                    <div className="bg-light p-2 rounded">
                                      {item.reply}
                                    </div>
                                  ) : (
                                    <span className="badge bg-warning text-dark">
                                      Not Replied
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td>⭐ {item.rating}</td>

                              <td>
                                <span
                                  className={`px-2 py-1 rounded ${
                                    item.status === "Active"
                                      ? "bg-success text-white"
                                      : "bg-secondary text-white"
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>

                              <td>
                                {new Date(item.createdAt).toLocaleDateString()}
                              </td>

                              <td className="text-center">
                                <button
                                  className="btn btn-sm btn-light me-2"
                                  style={{ borderRadius: "8px" }}
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setShowModal(true);
                                  }}
                                >
                                  <FaReply className="text-success" />
                                </button>

                                <button
                                  className="btn btn-sm btn-light"
                                  onClick={() => DeleteFeedback(item._id)}
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

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "12px" }}>
              <div className="modal-header">
                <h5 className="modal-title">Reply to User</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {selectedItem?.name}
                </p>
                <p>
                  <strong>Message:</strong> {selectedItem?.message}
                </p>

                <textarea
                  className="form-control mt-3"
                  rows="4"
                  placeholder="Write your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-success" onClick={handleSendReply}>
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageFeedback;
