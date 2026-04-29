import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    address: "",
  });
  let [errors, setErrors] = useState({
    usernameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    roleError: "",
    addressError: "",
  });

  function handelInputChange(e) {
    let { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function ValidateForm() {
    let isvalid = true;

    let emailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let phoneFormat = /^(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;

    let passwordFormat =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (!user.username) {
      errors.usernameError = "Username is required";
      isvalid = false;
    } else {
      errors.usernameError = "";
    }

    if (!user.email) {
      errors.emailError = "Email is required";
      isvalid = false;
    } else if (!emailFormat.test(user.email)) {
      errors.emailError = "Provide valid email";
      isvalid = false;
    } else {
      errors.emailError = "";
    }

    if (!user.phone) {
      errors.phoneError = "Phone is required";
      isvalid = false;
    } else if (!phoneFormat.test(user.phone)) {
      errors.phoneError = "Provide valid phone number";
      isvalid = false;
    } else {
      errors.phoneError = "";
    }

    if (!user.role) {
      errors.roleError = "Role is required";
      isvalid = false;
    } else {
      errors.roleError = "";
    }

    if (!user.password) {
      errors.passwordError = "Password is required";
      isvalid = false;
    } else if (!passwordFormat.test(user.password)) {
      errors.passwordError =
        "Password must contain uppercase, lowercase, special char & number";
      isvalid = false;
    } else {
      errors.passwordError = "";
    }

    if (!user.address) {
      errors.addressError = "address is required";
      isvalid = false;
    } else {
      errors.addressError = "";
    }

    setErrors((prev) => ({ ...prev }));

    return isvalid;
  }

  const registartion = async (user) => {
    const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/signup`,
      user,
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: registartion,

    onSuccess: () => {
      toast.success("Registration Successfully...", {
        onClose: () => {
          window.location.href = "/login";
        },
      });
    },
    onError: () => {
      toast.error("Invalid Details", {
        onClose: () => {
          window.location.href = "/register";
        },
      });

      return;
    },
  });

  async function handelSubmit(e) {
    e.preventDefault();

    console.log(user);

    if (!ValidateForm()) return;

    mutation.mutate(user);
  }

  console.log(user);

  return (
    <>
      {/* Heading Section */}
      <div className="page-heading-shows-events">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>Create Account 🚀</h2>
              <span>Register to get started</span>
            </div>
          </div>
        </div>
      </div>

      {/* Register Form */}
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
                  <h4>Register</h4>
                </div>

                <form onSubmit={handelSubmit}>
                  <div className="row">
                    {/* Name */}
                    <div className="col-lg-12">
                      <input
                        type="text"
                        name="username"
                        placeholder="Full Name"
                        className="form-control"
                        onChange={handelInputChange}
                        value={user.username}
                      />
                      <p style={{ color: "red" }}>{errors.usernameError}</p>
                    </div>

                    {/* Email */}
                    <div className="col-lg-12 ">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        onChange={handelInputChange}
                        value={user.email}
                      />
                      <p style={{ color: "red" }}>{errors.emailError}</p>
                    </div>

                    {/* Phone */}
                    <div className="col-lg-12">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        className="form-control"
                        onChange={handelInputChange}
                        value={user.phone}
                      />{" "}
                      <p style={{ color: "red" }}>{errors.phoneError}</p>
                    </div>

                    {/* Role Dropdown */}
                    <div className="col-lg-12 mb-4">
                      <select
                        className="form-control"
                        name="role"
                        value={user.role}
                        onChange={handelInputChange}
                      >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="organizer">Organizer</option>
                      </select>
                      <p style={{ color: "red" }}>{errors.roleError}</p>
                    </div>

                    {/* Password */}
                    <div className="col-lg-12 ">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={handelInputChange}
                        value={user.password}
                      />
                      <p style={{ color: "red" }}>{errors.passwordError}</p>
                    </div>

                    {/* Address */}
                    <div className="col-lg-12 ">
                      <textarea
                        style={{ height: "100px" }}
                        placeholder="Address"
                        name="address"
                        className="form-control"
                        rows="2"
                        onChange={handelInputChange}
                        value={user.address}
                      ></textarea>
                      <p style={{ color: "red" }}>{errors.addressError}</p>
                    </div>

                    {/* Button */}
                    <div className="col-lg-12">
                      <button
                        className="main-dark-button w-100"
                        type="submit"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Signing up..." : "Register Now"}
                      </button>
                    </div>

                    {/* Login Link */}
                    <div className="col-lg-12 text-center mt-4">
                      <p>
                        Already have an account?{" "}
                        <a href="/login">
                          <b>Login</b>
                        </a>
                      </p>
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

export default Register;
