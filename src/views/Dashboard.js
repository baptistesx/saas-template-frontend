import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import GlobalLayout from "../components/layout/GlobalLayout";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <GlobalLayout>
      <Typography variant="h1">Home</Typography>
      {user ? (
        user?.is_premium ? (
          <Button href="/workaway-bot" variant="contained" sx={{ m: 1 }}>
            Workaway messaging
            <ArrowForwardIcon />
          </Button>
        ) : (
          <Button href="/get-licence" variant="contained" sx={{ m: 1 }}>
            Get Premium Account to access bots !
            <ArrowForwardIcon />
          </Button>
        )
      ) : (
        <CircularProgress />
      )}

      {!user?.is_email_verified ? (
        <Typography>
          Remember to check the confirmation email we sent you.
        </Typography>
      ) : (
        ""
      )}
    </GlobalLayout>
  );
}

export default Dashboard;
