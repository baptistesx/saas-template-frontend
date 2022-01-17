import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSigninCheck } from "reactfire";

function MemberRoute({ component: Component, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  console.log(user == null);

  return user == null ? (
    <Redirect to="/not-found" />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
}

export default MemberRoute;
