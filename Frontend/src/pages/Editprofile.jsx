import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../utills/AxiosConfig";

function EditProfile() {
  let profile = useLocation().state;
  let [profiledata, setProfiledata] = useState(profile);
   let navigate = useNavigate();



  function handelInputChange(e) {
    let { name, value } = e.target;

    setProfiledata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

   const editprofile = async (profiledata) => {
    const response = await api.put(
      `/user/update/${profiledata._id}`,
      profiledata,
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: editprofile,

    onSuccess: () => {
      toast.success("Profile Updated Successfully...", {
        onClose: () => {
          window.location.href = "/profile";
        },
      });
    },

    onError: () => {
      toast.error("Update Failed...");
    },
  });

  function handelSubmit(e) {
    e.preventDefault();
    mutation.mutate(profiledata);
  }

    const user = {
    name: profiledata.username,
    email: profiledata.email,
    phone: profiledata.phone,
  };

  return (
    <>
      {/* Heading */}
      <div className="page-heading-shows-events">
        <div className="container text-center">
          <h2>Edit Profile ✏️</h2>
          <span>Update your account details</span>
        </div>
      </div>

      {/* Form */}
      <div className="rent-venue-application">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div
                className="contact-form"
                style={{
                  padding: "30px",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                }}
              >
                <div className="heading-text text-center mb-4">
                  <h4>Edit Profile</h4>
                </div>

                <form onSubmit={handelSubmit}>
                  <div className="row">
                    {/* Name */}
                    <div className="col-lg-12">
                      <input
                        type="text"
                        name="username"
                        placeholder="Name"
                        className="form-control"
                        value={user.name}
                        onChange={handelInputChange}
                      />
                    </div>

                    {/* Email */}
                    <div className="col-lg-12">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        value={user.email}
                        onChange={handelInputChange}
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-lg-12">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        className="form-control"
                        value={user.phone}
                        onChange={handelInputChange}
                      />
                    </div>

                    {/* Button */}
                    <div className="col-lg-12">
                      <button
                        className="main-dark-button w-100"
                        type="submit"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Updating..." : "Update Profile"}
                      </button>
                    </div>

                    {/* Back */}
                    <div className="col-lg-12 text-center mt-3">
                      <Link to="/profile">⬅ Back to Profile</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
