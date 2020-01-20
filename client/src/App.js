import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { Navbar } from "./components/Navbar";

function App() {
  const isAuthenticated = false;

  const routes = useRoutes(isAuthenticated);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div>{routes}</div>
    </Router>
  );
}

export default App;
