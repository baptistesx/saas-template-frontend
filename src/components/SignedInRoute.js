import React from "react";
import { Redirect, Route } from "react-router-dom";

// Only signed in members can access MemberRoutes
function SignedInRoute({ component: Component, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return !user ? (
    <Redirect to="/not-found" />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
}

export default SignedInRoute;
