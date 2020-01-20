import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        <span className="navbar-brand">MERN Boilerplate 2020</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/user/1`}>
                My Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link text-salmon" href="/">
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
