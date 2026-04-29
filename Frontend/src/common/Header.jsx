import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CheckRole from "../utills/CheckRole";
import Logout from "../utills/Logout";
import CheckToken from "../utills/CheckToken";

function Header() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // ✅ NEW STATE

  useEffect(() => {
    setToken(CheckToken());
    setRole(CheckRole());
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="header-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <Link to="/" className="logo">
                  Art<em>Xibition</em>
                </Link>

                {/* ✅ ADD active CLASS */}
                <ul className={`nav ${menuOpen ? "active" : ""}`}>
                  <li>
                    <Link to="/" onClick={closeMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={closeMenu}>
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link to="/showevent" onClick={closeMenu}>
                      Shows & Events
                    </Link>
                  </li>

                  {token ? (
                    <>
                      <li>
                        <Link to="/tickethistory" onClick={closeMenu}>
                          Tickets
                        </Link>
                      </li>

                      <li>
                        <Link to="/feedback" onClick={closeMenu}>
                          Feedback
                        </Link>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}

                  <li>
                    <Link to="/rentvenue" onClick={closeMenu}>
                      Contact Us
                    </Link>
                  </li>

                  {/* Auth Section */}
                  {token ? (
                    <>
                      <li>
                        <Link to="/profile" onClick={closeMenu}>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link onClick={Logout}>Logout</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" onClick={closeMenu}>
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/register" onClick={closeMenu}>
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>

                {/* ✅ CLICK EVENT ADDED */}
                <a className="menu-trigger" onClick={toggleMenu}>
                  <span>{menuOpen ? "Close" : "Menu"}</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <header
        className={`header-area sticky-header ${showSticky ? "show" : ""}`}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <Link to="/" className="logo">
                  Art<em>Xibition</em>
                </Link>

                <ul className={`nav ${menuOpen ? "active" : ""}`}>
                  <li>
                    <Link to="/" onClick={closeMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={closeMenu}>
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link to="/showevent" onClick={closeMenu}>
                      Shows & Events
                    </Link>
                  </li>

                  {token ? (
                    <>
                      <li>
                        <Link to="/tickethistory" onClick={closeMenu}>
                          Tickets
                        </Link>
                      </li>

                      <li>
                        <Link to="/feedback" onClick={closeMenu}>
                          Feedback
                        </Link>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  <li>
                    <Link to="/rentvenue" onClick={closeMenu}>
                      Contact Us
                    </Link>
                  </li>

                  {token ? (
                    <>
                      <li>
                        <Link to="/profile" onClick={closeMenu}>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link onClick={Logout}>Logout</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" onClick={closeMenu}>
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/register" onClick={closeMenu}>
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>

                <a className="menu-trigger" onClick={toggleMenu}>
                  <span>{menuOpen ? "Close" : "Menu"}</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
