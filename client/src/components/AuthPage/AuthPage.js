import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { AuthContext } from "../../context/AuthContext";

import { Header } from "./Header";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, error, request, clearError } = useHttp();
  const message = useMessage();
  const [registered, setRegistered] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: ""
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/users", "POST", {
        ...form
      });

      message(data.message);
      setRegistered(!registered);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/signin ", "POST", {
        ...form
      });

      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <>
      <Header />

      <div className="row" style={{ marginTop: "10%" }}>
        <div className="col s12 m6 offset-m3">
          <div className="card login-wrapper">
            <div className="card-content">
              <h4 className="center">Authorization</h4>

              {!registered && (
                <div className="input-field">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    autoFocus={!registered}
                    value={form.username}
                    onChange={changeHandler}
                  />
                </div>
              )}

              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  autoFocus={registered}
                  value={form.email}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
              </div>
              {/* <div className="login-buttons"> */}
              {registered ? (
                <button
                  className="btn-large yellow darken-4 waves-effect waves-red "
                  disabled={loading}
                  onClick={loginHandler}
                >
                  Login
                </button>
              ) : (
                <button
                  className="btn-large grey lighten-1 black-text waves-effect waves-red"
                  onClick={registerHandler}
                  disabled={loading}
                >
                  Signup
                </button>
              )}
              {/* </div> */}
              <p
                className="center blue-text"
                onClick={() => setRegistered(!registered)}
              >
                {registered ? (
                  <span>Don't have an account? Sign up</span>
                ) : (
                  <span>Already have an account? Log in</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
