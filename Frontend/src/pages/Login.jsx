import React, { useState } from "react";
import cookie from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  function handelInputChange(e) {
    let { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const login = async (user) => {
    let response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/signin`,
      user
    );
    return response.data;
  };


  

  
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.token) {
        cookie.set("token", response.token);
        cookie.set("role", response.role);

        setUser({
          email: "",
          password: "",
        });

        toast.success("Login Successfully..", {
          onClose: () => {
            window.location.href = "/";
          },
        });
      }
    },
    onError: () => {
      toast.error("Invalid Details...", {
        onClose: () => {
          window.location.href = "/login";
        },
      });
    },
  });

  async function handelSubmit(e) {
    e.preventDefault();

    mutation.mutate(user);
  }
  return (
    <>
      {/* Heading Section */}
      <div className="page-heading-shows-events">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>Welcome Back 👋</h2>
              <span>Login to continue your journey</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
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
                  <h4>Login</h4>
                </div>

                <form onSubmit={handelSubmit}>
                  <div className="row">
                    {/* Email */}
                    <div className="col-lg-12">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        onChange={handelInputChange}
                        value={user.email}
                      />
                    </div>

                    {/* Password */}
                    <div className="col-lg-12 position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        className="form-control pe-5"
                        onChange={handelInputChange}
                        value={user.password}
                      />

                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "25px",
                          top: "30%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#6c757d",
                          fontSize: "20px",
                        }}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </span>
                    </div>

                    {/* Forgot Password */}
                    <div className="col-lg-12 text-end mb-3">
                      <a href="/forgot-password" style={{ fontSize: "14px" }}>
                        Forgot Password?
                      </a>
                    </div>

                    {/* Button */}
                    <div className="col-lg-12">
                      <button
                        className="main-dark-button w-100"
                        type="submit"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Logining in..." : "Login Now"}
                      </button>
                    </div>

                    {/* Register Link */}
                    <div className="col-lg-12 text-center mt-4">
                      <p>
                        Don't have an account?{" "}
                        <a href="/register">
                          <b>Register</b>
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

export default Login;
