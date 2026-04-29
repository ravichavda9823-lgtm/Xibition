import React, { useEffect, useState } from "react";
import api from "../utills/AxiosConfig";

function Header() {
  let [admin, setAdmin] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1200;
      setIsMobile(mobile);

      const body = document.body;

      if (mobile) {
        if (menuOpen) {
          body.classList.add("layout-menu-expanded");
          body.classList.remove("layout-menu-collapsed");
        } else {
          body.classList.add("layout-menu-collapsed");
          body.classList.remove("layout-menu-expanded");
        }
      } else {
        body.classList.add("layout-menu-expanded");
        body.classList.remove("layout-menu-collapsed");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  async function FetchAdmin() {
    try {
      let response = await api.get("/admin/dashborad");
      console.log(response.data);
      setAdmin(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    FetchAdmin();
  }, []);

  return (
    <>
      <nav
        className="layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        {isMobile && (
          <div className="layout-menu-toggle navbar-nav">
            <button
              onClick={toggleMenu}
              style={{ border: "none", background: "none" }}
            >
              <i className="icon-base bx bx-menu icon-md" />
            </button>
          </div>
        )}
        <div
          className="navbar-nav-right d-flex align-items-center justify-content-end"
          id="navbar-collapse"
        >
          {/* Search */}
          <div className="navbar-nav align-items-center">
            <div className="nav-item navbar-search-wrapper mb-0">
              <a
                className="nav-item nav-link search-toggler px-0"
                href="javascript:void(0);"
              >
                <span
                  className="d-inline-block text-body-secondary fw-normal"
                  id="autocomplete"
                />
              </a>
            </div>
          </div>
          {/* /Search */}
          <ul className="navbar-nav flex-row align-items-center ms-md-auto">
            <h3 className="welcome-text">
              Welcome, <span className="admin-name">{admin.name}</span>
            </h3>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
