import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";
import api from "../utills/AxiosConfig";
import { toast } from "react-toastify";
import Aside from "../common/aside";

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(location.state);
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/admin/user/update/${user._id}`, user);

      toast.success("User Updated Successfully", {
        onClose: () => navigate("/manageuser"),
      });
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
      setLoading(false);
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
                  <h4>Edit User</h4>
                </div>
              </div>

              <div className="card shadow-sm">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Name</label>
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          value={user.username}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={user.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Phone</label>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          value={user.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Role</label>
                        <input
                          type="text"
                          name="role"
                          className="form-control"
                          value={user.role}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update User"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-light ms-2"
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

export default EditUser;
