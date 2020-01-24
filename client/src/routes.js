import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// import { LinksPage } from "./pages/LinksPage";
// import { CreatePage } from "./pages/CreatePage";
// import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";

// import { Signin } from "./components/auth/Signin";
// import { Signup } from "./components/auth/Signup";
import { Home } from "./components/Home";
// import { Profile } from "./components/Profile";
// import { Users } from "./components/Users";
// import { EditProfile } from "./components/EditProfile";

export const useRoutes = isAuthentificated => {
  if (isAuthentificated) {
    return (
      <Switch>
        <Route path="/home" exact>
          <Home />
          {/* </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/user/:userId" exact>
          <Profile />
        </Route>
        <Route path="/user/edit/:userId" exact>
          <EditProfile /> */}
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
