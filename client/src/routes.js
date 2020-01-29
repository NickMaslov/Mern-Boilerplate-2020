import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { AuthPage } from "./components/AuthPage/AuthPage";
import { HomePage } from "./components/HomePage/HomePage";
import { ProfilePage } from "./components/ProfilePage/ProfilePage";
import { UsersPage } from "./components/UsersPage/UsersPage";
import { EditProfilePage } from "./components/EditProfilePage/EditProfilePage";

export const useRoutes = isAuthentificated => {
  if (isAuthentificated) {
    return (
      <Switch>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/users" exact>
          <UsersPage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/profile/edit" exact>
          <EditProfilePage />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
