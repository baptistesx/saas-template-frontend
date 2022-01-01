import { doc } from "firebase/firestore";
import { default as React } from "react";
import { Redirect, Route } from "react-router-dom";
import { useFirestore, useFirestoreDocData, useSigninCheck } from "reactfire";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { data: signInCheckResult } = useSigninCheck();

  const userRef = doc(useFirestore(), "users", signInCheckResult.user.uid);

  const { data: userProfile } = useFirestoreDocData(userRef);

  return signInCheckResult.isLoggedIn && userProfile.isAdmin ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to="/*" />
  );
};

export default AdminRoute;
