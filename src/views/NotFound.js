import { Button, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import GlobalLayout from "../components/layout/GlobalLayout";

function NotFound() {
  const history = useHistory();

  const redirect = () => {
    if (localStorage.getItem("token")) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  };

  return (
    <GlobalLayout>
      <Typography variant="h1">Error 404</Typography>

      <Button variant="contained" onClick={redirect}>
        Back home
      </Button>
    </GlobalLayout>
  );
}

export default NotFound;
