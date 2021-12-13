import { Button, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomAppBar from "../components/CustomAppBar";
import CustomBodyLayout from "../components/CustomBodyLayout";
import userContext from "../utils/userContext";

function NotFound() {
  const history = useHistory();
  const { setIsLoggedIn, isLoggedIn, setEmail } = useContext(userContext);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  });

  return (
    <div>
      <CustomAppBar />

      <CustomBodyLayout>
        <Typography variant="h1">Error 404</Typography>

        <Button variant="contained" href="/">
          Back home
        </Button>
      </CustomBodyLayout>
    </div>
  );
}

export default NotFound;
