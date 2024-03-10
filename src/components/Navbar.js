import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" || location.pathname === "/"
                      ? "active"
                      : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <div>
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Log-In
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Sign-Up
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Link
                  to="/userInfo"
                  style={{ color: "grey", fontSize: "30px" }}
                  className="mx-3"
                >
                  <i className="fa-solid fa-user"></i>
                </Link>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
