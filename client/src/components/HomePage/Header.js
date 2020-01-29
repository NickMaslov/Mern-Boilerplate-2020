import React from "react";

export const Header = () => {
  return (
    <div className="section no-pad-bot red lighten-5" id="index-banner">
      <div className="container">
        <br />
        <br />
        <h1 className="header center  red-text text-darken-3">
          Mern Boilerplate 2020
        </h1>

        <div className="row center">
          <a
            href="https://github.com/"
            className="btn-large waves-effect waves-light red darken-3"
          >
            View Source Code
          </a>
        </div>

        <br />
        <br />
      </div>
    </div>
  );
};
