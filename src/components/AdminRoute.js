import { default as React } from "react";
import { Redirect, Route } from "react-router-dom";

// AdminRoutes can only be accessed by admin members
const AdminRoute = ({ component: Component, ...rest }) => {
  const isAdmin= JSON.parse(localStorage.getItem("user"))?.isAdmin;

  return !isAdmin ? (
    <Redirect to="/not-found" />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
};

export default AdminRoute;
