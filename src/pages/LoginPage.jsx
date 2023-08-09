import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showIsError, setShowIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { onLoginSuccessHandler } = useAuth();

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const onFormsubmit = async (event) => {
    event.preventDefault();
    const { username, password } = form;
    if (await onLoginSuccessHandler(username, password)) {
      console.log(username);
      navigate("/welcome/" + username);
    } else {
      setShowIsError(true);
    }
  };

  return (
    <div
      className="py-5"
      style={{ width: "50%", minWidth: "500px", margin: "150px 300px" }}
    >
      <div className="card">
        <div className="card-header">
          <h2>Login</h2>
        </div>
        <div className="card-body m-auto w-100">
          {showIsError && (
            <h6 className="text-danger">
              Authentication failed.
              <br /> Please check your credentials.
            </h6>
          )}
          <form className="px-5 py-4" style={{ width: "100%" }}>
            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                onChange={onFormChange}
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                name="password"
                className="form-control"
                onChange={onFormChange}
              />
            </div>
            <div>
              <button
                className="btn btn-primary form-control mt-5 "
                onClick={onFormsubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
