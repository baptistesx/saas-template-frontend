import React from "react";
import { Redirect, Route } from "react-router-dom";

function CheckedRoute({ component: Component, ...restOfProps }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isLoggedIn ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
}

export default CheckedRoute;
