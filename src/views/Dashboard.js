import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import { doc } from "firebase/firestore";
import React from "react";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import CustomAppBar from "../components/CustomAppBar";
import CustomBodyLayout from "../components/CustomBodyLayout";

function Dashboard() {
  const { data: user } = useUser();

  const uid = JSON.parse(localStorage.getItem("user")).id;

  const userRef = doc(useFirestore(), "users", uid);

  const { data: userProfile } = useFirestoreDocData(userRef);

  return (
    <div>
      <CustomAppBar />

      <CustomBodyLayout>
        <Typography variant="h1">Bots list</Typography>

        {userProfile?.isPremium ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              href="/workaway-messaging"
              variant="contained"
              sx={{ m: 1 }}
            >
              Workaway messaging
              <ArrowForwardIcon />
            </Button>
          </Box>
        ) : (
          <Button href="/get-licence" variant="contained" sx={{ m: 1 }}>
            Get Premium Account to access bots !
            <ArrowForwardIcon />
          </Button>
        )}
        {userProfile?.isAdmin ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button href="/admin-panel" variant="contained" sx={{ m: 1 }}>
              Admin panel
              <ArrowForwardIcon />
            </Button>
          </Box>
        ) : (<Box />
        )}
        {!user?.emailVerified ? (
          <Typography>
            Pense à vérifier ton compte via le lien dans l'email de confirmation
          </Typography>
        ) : (
          ""
        )}
      </CustomBodyLayout>
    </div>
  );
}

export default Dashboard;
