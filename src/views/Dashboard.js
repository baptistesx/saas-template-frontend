import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import CenteredLayout from "../components/layout/CenteredLayout";
import CustomAppBar from "../components/common/CustomAppBar";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <CustomAppBar />

      <CenteredLayout>
        <Typography variant="h1">Bots list</Typography>
        {user ? (
          user?.is_premium ? (
            <Button
              href="/workaway-messaging"
              variant="contained"
              sx={{ m: 1 }}
            >
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

        {user ? (
          user?.is_admin ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button href="/admin-panel" variant="contained" sx={{ m: 1 }}>
                Admin panel
                <ArrowForwardIcon />
              </Button>
            </Box>
          ) : (
            <Box />
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
      </CenteredLayout>
    </div>
  );
}

export default Dashboard;
