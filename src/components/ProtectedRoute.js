import React from "react";
import { Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return <Route {...restOfProps} render={(props) => isLoggedIn} />;
}

export default ProtectedRoute;
