import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material/";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../firebase";
import userContext from "../utils/userContext";

function CustomAppBar() {
  const { setIsLoggedIn, isLoggedIn, email, setEmail } =
    useContext(userContext);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
      setEmail(localStorage.getItem("email"));
    }
  });

  const handleLogoClick = () => {
    if (!isLoggedIn) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
  };

  const onLogoutClick = async () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");

    await logout();

    history.push("/");

    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleLogoClick} style={{ textDecoration: "none" }}>
            <Typography variant="h6" component="div" sx={{ color: "white" }}>
              Bots Dashboard
            </Typography>
          </Button>

          {isLoggedIn ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>{email}</Typography>

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
