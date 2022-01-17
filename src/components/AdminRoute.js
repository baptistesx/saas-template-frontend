import { default as React } from "react";
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  // const { data: signInCheckResult } = useSigninCheck();
  const user = JSON.parse(localStorage.getItem("user"));
  // const userRef = doc(useFirestore(), "users", user.id);

  console.log(user);
  return user?.isAdmin ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to="/*" />
  );
};

export default AdminRoute;
