import { default as React } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSigninCheck } from "reactfire";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { status, data: signInCheckResult } = useSigninCheck();

  return signInCheckResult?.signedIn ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
