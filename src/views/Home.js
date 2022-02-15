import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import CenteredLayout from "../components/layout/CenteredLayout";
import CustomAppBar from "../components/common/CustomAppBar";

function Home() {
  return (
    <div>
      <CustomAppBar />

      <CenteredLayout>
        <Typography variant="h1" >
          Home
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="body">
            Welcome on ImLazy.dev! You'll find here different ressources to save time in your life...
            </Typography>
          </CardContent>
        </Card>
      </CenteredLayout>
    </div>
  );
}

export default Home;
