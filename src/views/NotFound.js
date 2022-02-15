import { Button, Typography } from "@mui/material";
import React from "react";
import { useSigninCheck } from "reactfire";
import CustomAppBar from "../components/CustomAppBar";
import CenteredLayout from "../components/CenteredLayout";
import { useHistory } from "react-router-dom";

function NotFound() {
  const { data: signInCheckResult } = useSigninCheck();

  const history = useHistory();

  const redirect = () => {
    if (signInCheckResult?.signedIn) {
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
