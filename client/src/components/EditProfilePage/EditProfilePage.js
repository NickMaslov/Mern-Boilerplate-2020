import React, { useState, useCallback, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../Loader";

export const EditProfilePage = () => {
  const history = useHistory();
  const message = useMessage();
  const { token, userId } = useContext(AuthContext);
  const { request, loading, error, clearError } = useHttp();
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
    message(error);
    clearError();
    getUser();
  }, [message, error]);

  const changeHandler = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const updateUser = async event => {
    try {
      await request(
        `/api/users/${userId}`,
        "PUT",
        { ...user },
        {
          Authorization: `Bearer ${token}`
        }
      );
      history.push("/profile");
    } catch (e) {}
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container" style={{ marginTop: 90 }}>
      <div className="card-panel z-depth-5">
        <div className="row">
          <div className="col s12 m6">
            <h4 className="center">Edit My Profile</h4>
            <div className="row">
              <div className="row">
                <div className="input-field col s12 m12">
                  <i className="material-icons prefix">face</i>
                  <input
                    id="username"
                    type="text"
                    className="profile-info"
                    name="username"
                    value={user.username}
                    onChange={changeHandler}
                    autoFocus
                  />
                  <label htmlFor="username " className="active">
                    Username
                  </label>
                </div>

                <div className="input-field col s12 m12">
                  <i className="material-icons prefix">email</i>
                  <input
                    id="email"
                    type="email"
                    className="profile-info"
                    name="email"
                    value={user.email}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email" className="active">
                    Your Email
                  </label>
                </div>

                <div className="input-field col s12 m12">
                  <i className="material-icons prefix">lock</i>
                  <input
                    id="password"
                    type="password"
                    className="profile-info"
                    name="password"
                    value={user.password}
                    onChange={changeHandler}
                  />
                  <label htmlFor="password" className="active">
                    Your Password
                  </label>
                </div>

                <div className="input-field col s12 m12">
                  <i className="material-icons prefix">image</i>
                  <input
                    id="img"
                    type="text"
                    className="profile-info"
                    value={user.img}
                    onChange={changeHandler}
                    name="img"
                  />
                  <label htmlFor="img" className="active">
                    Your Image Link
                  </label>
                </div>

                <div className="input-field col s12 m12">
                  <i className="material-icons prefix">book</i>
                  <textarea
                    id="bio"
                    className="materialize-textarea profile-info"
                    defaultValue={user.bio}
                    name="bio"
                    onChange={changeHandler}
                  />
                  <label htmlFor="bio" className="active">
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

        <button
          className="btn btn-profile waves-effect waves-light center teal lighten-1"
          onClick={updateUser}
        >
          Update Profile
          <i className="material-icons right">save</i>
        </button>
      </div>
    </div>
  );
};
