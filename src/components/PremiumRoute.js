import { default as React } from "react";
import { Redirect, Route } from "react-router-dom";

// Only premium members can access these PremiumRoutes
const PremiumRoute = ({ component: Component, ...rest }) => {
  const isPremium = JSON.parse(localStorage.getItem("user"))?.isPremium;

  return !isPremium ? (
    <Redirect to="/not-found" />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
};

export default PremiumRoute;
