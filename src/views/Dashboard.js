import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { doc } from "firebase/firestore";
import React from "react";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import CenteredLayout from "../components/CenteredLayout";
import CustomAppBar from "../components/CustomAppBar";

function Dashboard() {
  const { data: userAuth } = useUser();

  const uid = JSON.parse(localStorage.getItem("user")).id;

  //TODO: find a way yo use userAuth.uid instead of the uid stored in localstorage
  const userRef = doc(useFirestore(), "users", uid);

  const { data: userProfile } = useFirestoreDocData(userRef);

  return (
    <div>
      <CustomAppBar />

      <CenteredLayout>
        <Typography variant="h1">Bots list</Typography>
        {userAuth && userProfile ? (
          userProfile?.isPremium ? (
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

        {userAuth && userProfile ? (
          userProfile?.isAdmin ? (
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

        {!userAuth?.emailVerified ? (
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
