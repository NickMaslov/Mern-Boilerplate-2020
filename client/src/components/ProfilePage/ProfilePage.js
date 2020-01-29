import React, { useState, useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../Loader";

export const ProfilePage = () => {
  const { token, userId, logout } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [user, setUser] = useState({});

  const getUser = useCallback(async () => {
    try {
      const fetched = await request(`/api/users/${userId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });

      setUser(fetched);
    } catch (e) {}
  }, [token, userId, request]);

  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = useCallback(async () => {
    try {
      await request(`/api/users/${userId}`, "DELETE", null, {
        Authorization: `Bearer ${token}`
      });
      logout();
    } catch (e) {}
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container" style={{ marginTop: 90 }}>
      <div className="card-panel z-depth-5">
        <div className="row">
          <div className="col s12 m6">
            <h4 className="center">My Profile</h4>
            <div className="row">
              <div className="row">
                <div className="input-field col s12 m12">
                  <i className="material-icons prefix">face</i>
                  <input
                    id="icon_prefix"
                    type="text"
                    className="profile-info"
                    name="username"
                    value={user.username}
                    disabled
                  />
                  <label htmlFor="icon_prefix " className="active">
                    Username
                  </label>
                </div>

                <div className="input-field col s12 m12">
                  <i className="material-icons prefix">email</i>
                  <input
                    id="icon_email"
                    type="email"
                    className="profile-info"
                    disabled
                    value={user.email}
                  />
                  <label htmlFor="icon_email" className="active">
                    Your Email
                  </label>
                </div>

                <div className="input-field col s12 m12">
                  <i className="material-icons prefix">book</i>
                  <textarea
                    id="icon_prefix2"
                    className="materialize-textarea profile-info"
                    disabled
                    defaultValue={user.bio}
                  />
                  <label htmlFor="icon_prefix2" className="active">
                    About Me
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col s12 m5 offset-m1">
            <br />
            <br />
            <img
              className="materialboxed"
              width="100%"
              height="inherit"
              src={user.img}
            />
          </div>
        </div>
        <Link to="/profile/edit">
          <button className="btn btn-profile waves-effect waves-light center orange accent-1">
            Edit Profile
            <i className="material-icons right">edit</i>
          </button>
        </Link>

        <button
          className="btn btn-profile waves-effect waves-light center red"
          onClick={deleteUser}
        >
          Delete Profile
          <i className="material-icons right">delete</i>
        </button>
      </div>
    </div>
  );
};
