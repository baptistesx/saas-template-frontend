import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import CustomAppBar from "../components/CustomAppBar";
import CustomBodyLayout from "../components/CustomBodyLayout";
import userContext from "../utils/userContext";

function Dashboard() {
  const history = useHistory();
  const { setIsLoggedIn } = useContext(userContext);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  });

  return (
    <div>
      <CustomAppBar />

      <CustomBodyLayout>
        <Typography variant="h1">Bots list</Typography>

        <Link to="/workaway-messaging">
          <Button variant="contained">
            Workaway messaging
            <ArrowForwardIcon />
          </Button>
        </Link>
      </CustomBodyLayout>
    </div>
  );
}

export default Dashboard;
