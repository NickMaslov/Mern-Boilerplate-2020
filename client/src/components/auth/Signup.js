import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

export const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  });

  const onChange = event => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // loginUser(user);
    console.log(user);
  };

  const { errors, email, password, username } = user;
  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4 text-center">Sign up</h3>

                  <form onSubmit={onSubmit}>
                    <div className="form-label-group">
                      <input
                        type="username"
                        id="username"
                        className="form-control"
                        placeholder="Username"
                        required
                        autoFocus
                        onChange={onChange}
                        value={username}
                      />
                      <label htmlFor="username">Username</label>
                      <span className="text-danger">
                        {errors.username}
                        {errors.usernamenotfound && <br />}
                        {errors.usernamenotfound}
                      </span>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required
                        onChange={onChange}
                        value={email}
                        autoComplete="username"
                      />
                      <label htmlFor="email">Email address</label>
                      <span className="text-danger">
                        {errors.email}
                        {errors.emailnotfound && <br />}
                        {errors.emailnotfound}
                      </span>
                    </div>
                    <div className="form-label-group">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        required
                        onChange={onChange}
                        value={password}
                        autoComplete="new-password"
                      />
                      <label htmlFor="password">Password</label>
                      <span className="text-danger">{errors.password}</span>
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      // disabled={loading}
                      type="submit"
                    >
                      Submit
                    </button>
                    <div className="text-center">
                      <Link className="small" to="/">
                        Sign in
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
