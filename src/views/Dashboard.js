import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import { doc } from "firebase/firestore";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import CustomAppBar from "../components/CustomAppBar";
import CustomBodyLayout from "../components/CustomBodyLayout";
import userContext from "../utils/userContext";
function Dashboard() {
  const { status, data: user } = useUser();
  console.log("user", user);

  const uid = JSON.parse(localStorage.getItem("user")).id;
  console.log("uiiiiid", uid);
  const userRef = doc(useFirestore(), "users", uid);

  const { data: userProfile } = useFirestoreDocData(userRef);

  return (
    <div>
      <CustomAppBar />

      <CustomBodyLayout>
        <Typography variant="h1">Bots list</Typography>

        {userProfile?.isAdmin ? (
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
        {!user.emailVerified ? (
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
