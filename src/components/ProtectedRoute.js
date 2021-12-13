import { default as React } from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
