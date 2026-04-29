import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import CheckRole from "../utills/CheckRole";
import api from "../utills/AxiosConfig";
import Logout from "../utills/Logout";

function Profile() {
  let [userProfile, SetUserProfile] = useState({});
  const navigate = useNavigate();
  const role = CheckRole();

  async function FethchUserProfile() {
    if (CheckRole() === "user") {
      try {
        let response = await api.get("/user/profile");
        console.log(response);
        SetUserProfile(response.data.users);
      } catch (e) {
        if (e.response.status == 401 && e.response.status == 403) {
          LogoutwithoutNotification();
        }
      }
    } else {
      LogoutwithoutNotification();
    }
  }
  useEffect(() => {
    FethchUserProfile();
  }, []);

  console.log(userProfile);
  return (
    <>
      {/* Heading */}
      <div className="page-heading-shows-events">
        <div className="container text-center">
          <h2>My Profile 👤</h2>
          <span>Your account details</span>
        </div>
      </div>

      {/* Profile Section */}
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
                  <h4>Profile Info</h4>
                </div>

                <div className="row">
                  {/* Name */}
                  <div className="col-lg-12 mb-3">
                    <label>
                      <b>Name</b>
                    </label>
                    <div className="form-control">{userProfile.username}</div>
                  </div>

                  {/* Email */}
                  <div className="col-lg-12 mb-3">
                    <label>
                      <b>Email</b>
                    </label>
                    <div className="form-control">{userProfile.email}</div>
                  </div>

                  {/* Role */}
                  <div className="col-lg-12 mb-4">
                    <label>
                      <b>Phone</b>
                    </label>
                    <div className="form-control">{userProfile.phone}</div>
                  </div>

                  {/* Buttons */}
                  <div className="col-lg-12 text-center">
                    <button
                      className="purchase-btn me-2"
                      onClick={() =>
                        navigate("/editprofile", { state: userProfile })
                      }
                    >
                      Edit Profile
                    </button>

                    <button
                      className=" purchase-btn  main-dark-button"
                      style={{ backgroundColor: "red" }}
                      onClick={Logout}
                    >
                      Logout
                    </button>
                  </div>

                  {/* Optional */}
                  <div className="col-lg-12 text-center mt-3">
                    <small style={{ color: "#888" }}>
                      Edit functionality can be added later
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
