import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const Header = () => {
  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { isLoggedIn, onLogoutSuccessHandler } = useAuth();
  const navigation = useNavigate();

  // Bu kodu da istersek AuthContext içerisine taşıyabilmekteyiz.
  const onLogoutSuccess = () => {
    onLogoutSuccessHandler();
    navigation("/login");
  };

  return (
    <div className="border-bottom border-primary py-3">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {isLoggedIn && (
              <div className="navbar-nav">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={`/welcome/resul`}
                >
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/todos">
                  Todos
                </NavLink>
              </div>
            )}
            <div className="navbar-nav ms-auto ">
              {!isLoggedIn && (
                <NavLink to="/login" className="nav-link " aria-disabled="true">
                  Login
                </NavLink>
              )}
              {isLoggedIn && (
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={onLogoutSuccess}
                >
                  Logout
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
