import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material/";
import { doc } from "firebase/firestore";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  useFirestore,
  useFirestoreDocData,
  useSigninCheck,
  useUser,
  useAuth,
} from "reactfire";
import { logout } from "../firebase";

function UserBloc() {
  const { status, data: user } = useUser();
  const burritoRef = doc(useFirestore(), "users", user.uid);
  const { status: stat, data: userEl } = useFirestoreDocData(burritoRef);
  return (
    <Typography>{`${userEl?.isAdmin ? "Admin" : "Non admin"} ${
      userEl?.email
    }`}</Typography>
  );
}

function CustomAppBar() {
  const history = useHistory();
  const auth = useAuth();
  const { data: signInCheckResult } = useSigninCheck();

  // const userRef = doc(useFirestore(), "users", signInCheckResult.user.uid);

  // const { data: userProfile } = useFirestoreDocData(userRef);

  const handleLogoClick = () => {
    history.push("/");
  };

  const onLogoutClick = async () => {
    await logout(auth);

    history.push("/");

    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleLogoClick} style={{ textDecoration: "none" }}>
            <Typography variant="h6" component="div" sx={{ color: "white" }}>
              Im-Lazy
            </Typography>
          </Button>

          {signInCheckResult?.signedIn ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <UserBloc />

              <Typography>|</Typography>

              <Button sx={{ color: "white" }} onClick={onLogoutClick}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button sx={{ color: "white" }} href="/signin">
                Sign In
              </Button>

              <Typography>|</Typography>

              <Button sx={{ color: "white" }} href="/signup">
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CustomAppBar;
