import React from "react";
import { Redirect, Route } from "react-router-dom";

// NotSignedInRoutes cannot be accessed when signed in
function NotSignedInRoute({ component: Component, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? (
    <Redirect to="/not-found" />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
}

export default NotSignedInRoute;
