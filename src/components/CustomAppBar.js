import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material/";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "reactfire";
import { logout } from "../firebase";

function UserBloc() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Typography>{`${user?.isAdmin ? "Admin" : "Non admin"} ${
      user?.email
    }`}</Typography>
  );
}

function CustomAppBar() {
  const history = useHistory();
  const auth = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogoClick = () => {
    if (!user) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
  };

  const onLogoutClick = async () => {
    await logout(auth);
    localStorage.removeItem("user");
    history.push("/");
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

          {user ? (
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
