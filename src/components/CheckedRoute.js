import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSigninCheck } from "reactfire";

function CheckedRoute({ component: Component, ...rest }) {
  const { status, data: signInCheckResult } = useSigninCheck();

  return signInCheckResult?.signedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
}

export default CheckedRoute;
