import { Button, Typography } from "@mui/material";
import React from "react";
import CustomAppBar from "../components/common/CustomAppBar";
import CenteredLayout from "../components/layout/CenteredLayout";
import { useHistory } from "react-router-dom";

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
    <div>
      <CustomAppBar />

      <CenteredLayout>
        <Typography variant="h1">Error 404</Typography>

        <Button variant="contained" onClick={redirect}>
          Back home
        </Button>
      </CenteredLayout>
    </div>
  );
}

export default NotFound;
