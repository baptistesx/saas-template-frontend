import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomAppBar from "../components/CustomAppBar";
import CustomBodyLayout from "../components/CustomBodyLayout";
import userContext from "../utils/userContext";

function Dashboard() {
  const history = useHistory();
  const { setIsLoggedIn, isAdmin, setIsAdmin } = useContext(userContext);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
      if (localStorage.getItem("isAdmin") === "true") {
        setIsAdmin(true);
      }
    }
  });

  return (
    <div>
      <CustomAppBar />

      <CustomBodyLayout>
        <Typography variant="h1">Bots list</Typography>

        {isAdmin ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              href="/workaway-messaging"
              variant="contained"
              sx={{ m: 1 }}
            >
              Workaway messaging
              <ArrowForwardIcon />
            </Button>

            <Button href="/admin-panel" variant="contained" sx={{ m: 1 }}>
              Admin panel
              <ArrowForwardIcon />
            </Button>
          </Box>
        ) : (
          <Button href="/admin-panel" variant="contained" sx={{ m: 1 }}>
            Get Premium Account to access bots !
            <ArrowForwardIcon />
          </Button>
        )}
      </CustomBodyLayout>
    </div>
  );
}

export default Dashboard;
