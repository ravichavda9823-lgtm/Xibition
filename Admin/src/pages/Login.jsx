import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import cookie from "js-cookie";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  function handelInputChange(e) {
    let { name, value } = e.target;

    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const login = async (user) => {
    let response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      user,
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.token) {
        cookie.set("token", response.token);
        cookie.set("role", response.role);

        setAdmin({
          email: "",
          password: "",
        });

        toast.success("Login Successfully..", {
          onClose: () => {
            window.location.href = "/managecategory";
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

  function handelSubmit(e) {
    e.preventDefault();
    mutation.mutate(admin);
  }
  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{ minHeight: "100vh", background: "#f5f5f9" }}
    >
      <div className="authentication-wrapper authentication-basic w-100">
        <div className="authentication-inner d-flex justify-content-center">
          {/* Responsive Card */}
          <div
            className="card px-3 px-sm-5 py-4 w-100"
            style={{ maxWidth: "420px" }}
          >
            <div className="card-body">
              {/* Logo */}
              <div className="app-brand justify-content-center mb-3">
                <Link to="/" className="app-brand-link gap-2">
                  <span className="app-brand-logo demo text-primary">
                    <svg width={25} viewBox="0 0 25 42">
                      <path
                        fill="currentColor"
                        d="M13.79 0.35L3.39 7.44C0.56 9.69-0.37 12.47 0.55 15.79C0.68 16.23 1.09 17.78 3.12 19.22C3.81 19.72 5.32 20.38 7.65 21.21L7.59 21.25L2.63 24.54C0.44 26.3 0.08 28.5 1.56 31.17C2.83 32.81 5.2 33.26 7.09 32.53C8.34 32.05 11.45 30 16.41 26.37C18.03 24.49 18.69 22.45 18.4 20.23C17.96 17.53 16.17 15.57 13.04 14.37L10.91 13.47L18.61 7.98L13.79 0.35Z"
                      />
                    </svg>
                  </span>
                  <span className="fw-bold">Sneat Admin</span>
                </Link>
              </div>

              {/* Heading */}
              <h4 className="text-center mb-1">Welcome Admin 👋</h4>
              <p className="text-center mb-4 small">
                Please sign-in to your admin account
              </p>

              {/* Form */}
              <form onSubmit={handelSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={handelInputChange}
                    value={admin.email}
                  />
                </div>

                <div className="mb-3 position-relative">
                  <label className="form-label">Password</label>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handelInputChange}
                    value={admin.password}
                  />

                  {/* Eye Icon */}
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "33px",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3 small">
                  <div>
                    <input type="checkbox" /> Remember
                  </div>
                  <span style={{ cursor: "pointer" }}>Forgot Password?</span>
                </div>

                <button
                  className="btn btn-primary w-100"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
