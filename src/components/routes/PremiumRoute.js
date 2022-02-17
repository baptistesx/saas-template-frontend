import { default as React } from "react";
import { Redirect, Route } from "react-router-dom";

// Only premium members can access PremiumRoutes
const PremiumRoute = ({ component: Component, ...rest }) => {
  const isPremium = JSON.parse(localStorage.getItem("user"))?.is_premium;

  return !isPremium ? (
    <Redirect to="/not-found" />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
};

export default PremiumRoute;
